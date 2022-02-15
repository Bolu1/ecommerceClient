import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Link from "next/link";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../utils/Store";
import FileBase from "react-file-base64";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [price, setPrice] = useState();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [colors, setColors] = useState([]);
  const [sizes, setSize] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [imagesrc, setImage] = useState("");
  const [countInStock, setCount] = useState();
  const [details, setDetails] = useState("");
  const [description, setDescription] = useState("");

  const getError = (err) => {
    err.response && err.response.data && err.response.data.message
      ? err.response.data.message
      : err.message;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const imageSrc = imagesrc.base64;
      const { data } = await axios.post(
        "/api/products/add",
        {
          name,
          price,
          category,
          colors,
          sizes,
          highlights,
          imageSrc,
          countInStock,
          details,
          description,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setError("successful");
    } catch (err) {
      console.log(err);
      setError(getError(err) ? getError(err) : "Something went wrong");
    }
  };

  // if user does not have this permission
  useEffect(() => {
    if (!userInfo) {
      router.push("/");
    }
    if (userInfo) {
      if (!userInfo.isAdmin) {
        router.push("/");
      }
    }
  }, []);
  return (
    <div>
      {error == "successful" && (
        <div className="w-full text-white bg-emerald-500">
          <div className="container flex items-center justify-between px-6 py-4 mx-auto">
            <div className="flex">
              <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
                <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"></path>
              </svg>

              <p className="mx-3">Created Successfully</p>
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
      {error != "" && error != "successful" && (
        <div className="w-full text-white bg-red-500">
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

      <div className="bg-white">
        <section className="max-w-4xl mt-5 p-6 mx-auto bg-white rounded-md shadow-md :bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-700 capitalize :text-white">
            Edit Product
          </h2>

          <form>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-gray-700 :text-gray-200" for="username">
                  Name
                </label>
                <input
                  required
                  id="username"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label
                  className="text-gray-700 :text-gray-200"
                  for="emailAddress"
                >
                  Price
                </label>
                <input
                  required
                  id="emailAddress"
                  type="number"
                  step=".01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label className="text-gray-700 :text-gray-200" for="text">
                  Category
                </label>
                <input
                  required
                  id="text"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label
                  className="text-gray-700 :text-gray-200"
                  for="textConfirmation"
                >
                  Colors(seprate with commas)
                </label>
                <input
                  required
                  id="textConfirmation"
                  type="text"
                  value={colors}
                  onChange={(e) => setColors(e.target.value.split(","))}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label
                  className="text-gray-700 :text-gray-200"
                  for="textConfirmation"
                >
                  sizes(seprate with commas)
                </label>
                <input
                  required
                  id="textConfirmation"
                  type="text"
                  value={sizes}
                  onChange={(e) => setSize(e.target.value.split(","))}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label
                  className="text-gray-700 :text-gray-200"
                  for="textConfirmation"
                >
                  Count
                </label>
                <input
                  required
                  id="textConfirmation"
                  type="number"
                  value={countInStock}
                  onChange={(e) => setCount(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div className="flex ">
                <div className="mb-3 xl:w-96">
                  <label
                    for="exampleFormControlTextarea1"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Highlights
                  </label>
                  <textarea
                    required
                    className="
                      form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={highlights}
                    onChange={(e) => setHighlights(e.target.value.split(","))}
                    placeholder="Your message"
                  ></textarea>
                </div>
              </div>

              <div className="flex ">
                <div className="mb-3 xl:w-96">
                  <label
                    for="exampleFormControlTextarea1"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Details
                  </label>
                  <textarea
                    required
                    className="
                      form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Your message"
                  ></textarea>
                </div>
              </div>

              <div className="flex ">
                <div className="mb-3 xl:w-96">
                  <label
                    for="exampleFormControlTextarea1"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    required
                    className="
                      form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                    id="exampleFormControlTextarea1"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    placeholder="Your message"
                  ></textarea>
                </div>
              </div>

              <fieldset className="w-full space-y-1 pt-4 dark:text-coolGray-100">
                <label for="files" className="block text-sm font-medium">
                  Upload Profile Photo
                </label>
                <div className="flex  px-8 py-12 border-2 border-dashed rounded-md dark:border-coolGray-700 dark:text-coolGray-400 dark:bg-coolGray-800">
                  {/* <input
                      required type="file" name="files" id="files" className="px-8 py-12 border-2 border-dashed rounded-md dark:border-coolGray-700 dark:text-coolGray-400 dark:bg-coolGray-800"/> */}
                  <FileBase
                    type="file"
                    multiple={false}
                    value={imagesrc}
                    onDone={({ base64 }) => setImage({ base64 })}
                  />
                </div>
              </fieldset>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={submitHandler}
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
