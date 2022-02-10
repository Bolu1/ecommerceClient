import React, { useEffect, useContext, useState } from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import FileBase from "react-file-base64";

function Profile() {
  const { state, dispatch } = useContext(Store);
  const [order, setOrder] = useState([]);
  const [error, setError] = useState("");
  const { userInfo } = state;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [image, setImage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(null);

  const router = useRouter();

  //function to get the type of error, i couldnt get it to work in  autils folder
  const getError = (err) => {
    err.response && err.response.data && err.response.data.message
      ? err.response.data.message
      : err.message;
  };
  useEffect(() => {
    var val;
    if (!userInfo) {
      router.push("/login");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      console.log(name);
      const { data } = await axios.put(
        "/api/users/profile",
        { name, email, password, image },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      const value = JSON.stringify(data.data);
      dispatch({ type: "USER_LOGIN", payload: data.data });
      Cookies.set("userInfo", value);
      localStorage.setItem("myCat", data.image);
      setError("successful");
    } catch (err) {
      console.log(err);
      setError(
        getError(err)
          ? getError(err)
          : "Something went wrong, your file should not be more than 1mb"
      );
    }
  };

  return (
    <>
    {error != "" && error != "successful" && (
            <div className="w-full fixed text-white bg-red-500">
              <div className="container flex items-center justify-between px-6 py-4 mx-auto">
                <div className="flex">
                  <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
                    <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"></path>
                  </svg>

                  <p className="mx-3">{error}</p>
                </div>

                <button
                  onClick={() => setError("")}
                  className="p-1 transition-colors duration-200 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 18L18 6M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {error == "successful" && (
            <div className="w-full fixed text-white bg-emerald-500">
              <div className="container flex items-center justify-between px-6 py-4 mx-auto">
                <div className="flex">
                  <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
                    <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"></path>
                  </svg>

                  <p className="mx-3">Profile update Successful</p>
                </div>

                <button
                  onClick={() => setError("")}
                  className="p-1 transition-colors duration-200 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 18L18 6M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
      {order && (
        <Layout title="Profile">
          

          <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md :bg-gray-800 my-20">
            <h2 class="text-lg font-semibold text-gray-700 capitalize :text-white">
              Account settings
            </h2>

            <form className="py-5 ">
              <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label class="text-gray-700 :text-gray-200" for="username">
                    Username
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    id="username"
                    type="text"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>

                <div>
                  <label
                    class="text-gray-700 :text-gray-200"
                    for="emailAddress"
                  >
                    Email Address
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    id="emailAddress"
                    type="email"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>

                <div>
                  <label class="text-gray-700 :text-gray-200" for="password">
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type="password"
                    minlength="8"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>

                <div>
                  <label
                    class="text-gray-700 :text-gray-200"
                    for="passwordConfirmation"
                  >
                    Password Confirmation
                  </label>
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="passwordConfirmation"
                    type="password"
                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
              </div>

              <fieldset className="w-full space-y-1 pt-4 dark:text-coolGray-100">
                <label for="files" className="block text-sm font-medium">
                  Upload Profile Photo
                </label>
                <div className="flex  px-8 py-12 border-2 border-dashed rounded-md dark:border-coolGray-700 dark:text-coolGray-400 dark:bg-coolGray-800">
                  {/* <input type="file" name="files" id="files" className="px-8 py-12 border-2 border-dashed rounded-md dark:border-coolGray-700 dark:text-coolGray-400 dark:bg-coolGray-800"/> */}
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setImage({ base64 })}
                  />
                </div>
              </fieldset>

              <div class="flex justify-end mt-6">
                <button
                  onClick={submitHandler}
                  type="submit"
                  class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                >
                  Update
                </button>
              </div>
            </form>
          </section>
        </Layout>
      )}
    </>
  );
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false });
