import React, { useEffect } from "react";
import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/solid";
import Layout from "../components/Layout";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Store } from "../utils/Store";

function Login() {
  const router = useRouter();
  const { redirect } = router.query;
  const { dispatch, state } = useContext(Store);
  const { userInfo } = state;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState("");

  //function that handles submit

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      setError("Passwords don't match");
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      const value = JSON.stringify(data.data);
      if (data == "This email is already in use") {
        setError(data ? data : "successful");
        return;
      }
      dispatch({ type: "USER_LOGIN", payload: data.data });
      Cookies.set("userInfo", value);
      localStorage.setItem("myCat", data.image);
      router.push(redirect || "/");
      setError("successful");
    } catch (err) {
      setError(
        err.response.data ? err.response.data.message : "An error occured"
      );
    }
  };

  return (
    <Layout title="Register">
      {/* //error alert */}

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

      {/* sucess alert */}

      {error == "successful" && (
        <div className="w-full text-white bg-emerald-500">
          <div className="container flex items-center justify-between px-6 py-4 mx-auto">
            <div className="flex">
              <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
                <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"></path>
              </svg>

              <p className="mx-3">Authentication Successful</p>
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

      <div style={{ minHeight: "100vh" }} className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create an account
            </h2>
            {/* <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </a>
            </p> */}
          </div>

          <form className="mt-8 space-y-6" onSubmit={submitHandler}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label htmlFor="email-address" className="font-medium">
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />
              </div>
              <br />
              <div>
                <label htmlFor="password" className="font-medium">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  minlength="8"
                  autoComplete="current-password"
                  required
                  value={password}
                  className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />
              </div>
              <br />
              {/* confirm password */}
              <div>
                <label htmlFor="password" className="font-medium">
                  Confirm Password
                </label>
                <input
                  id="cpassword"
                  name="cpassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={cpassword}
                  className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    setCpassword(e.target.value);
                    setError("");
                  }}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign up
              </button>
            </div>
          </form>
          <br />
          <p className=" text-center">
            Already have an account?{" "}
            <a
              href={`/login?redirect=${redirect || "/"}`}
              className="text-indigo-600"
            >
              sign in
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
