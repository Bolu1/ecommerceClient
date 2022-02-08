import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import data from "../utils/data";
import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import db from "../utils/db";
import { useContext, useEffect } from "react";
import { Store } from "../utils/Store";
import Product from "../models/Product";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";

export default function Dashboard(props) {
  const router = useRouter();
  const { dispatch, state } = useContext(Store);
  const { cart, userInfo } = state;
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const submitHandlder = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/products/search", { search });
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const pagSearch = async (page) => {
    try {
      const { data } = await axios.post(`/api/products/search?page=${page}`, {
        search,
      });
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = async (id) => {
    try {
      console.log("herer " + id);
      const { data } = await axios.post(
        `/api/products/delete`,
        { id },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageClick = (data) => {
    console.log(data.selected);
    pagSearch(data.selected);
  };

  useEffect(() => {
    if (!userInfo.isAdmin) {
      router.push("/");
    }

    try {
      const fetchProducts = async () => {
        const { data } = await axios.post("/api/products/search", { search });
        setProducts(data);
      };
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <div className="lg:flex">
        <div
          // style={{ borderRight: "0.2px solid #e6e6e6" }}
          class="flex flex-col  lg:w-64 h-screen lg:h-half bg-slate-800 px-8 py-8  product-r :bg-gray-800 :bproduct-gray-600"
        >
          <h2 class="text-3xl font-semibold text-center text-white">
            Products
          </h2>

          <div class="relative mt-6">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                class="w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </span>
            <form onSubmit={submitHandlder}>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                class="w-full py-2 pl-10 pr-4 text-gray-700 bg-white bproduct rounded-md :bg-gray-800 :text-gray-300 :bproduct-gray-600 focus:bproduct-blue-400 :focus:bproduct-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                placeholder="Search"
              />
            </form>
          </div>

          <div class="flex flex-col justify-between flex-1 mt-6">
            <nav>
              <a
                href="/dashboard"
                class="flex items-center px-4 py-2 cursor-pointer mt-5 text-gray-600 transition-colors duration-200 transform rounded-md :text-gray-400 hover:bg-gray-200 :hover:bg-gray-700 :hover:text-gray-200 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>

                <span class="mx-4 font-medium">Products</span>
              </a>

              <a
                href="/adminorder"
                class="flex items-center px-4 py-2 cursor-pointer mt-5 text-gray-600 transition-colors duration-200 transform rounded-md :text-gray-400 hover:bg-gray-200 :hover:bg-gray-700 :hover:text-gray-200 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>

                <span class="mx-4 font-medium">Orders</span>
              </a>

              <a
                href="/adminuser"
                class="flex items-center px-4 py-2 cursor-pointer mt-5 text-gray-600 transition-colors duration-200 transform rounded-md :text-gray-400 hover:bg-gray-200 :hover:bg-gray-700 :hover:text-gray-200 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>

                <span class="mx-4 font-medium">Users</span>
              </a>
            </nav>
          </div>
        </div>

        {/* products */}
        <>
          {products.length > 0 ? (
            <div
              style={{ minHeight: "100vh" }}
              className="container p-6 mx-auto :bg-coolGray-800 :text-coolGray-100"
            >
              <Link href={`/addproduct`} className="py-5">
                <a className="px-5 py-2 font-semibold rounded bg-indigo-600 text-white">
                  Add
                </a>
              </Link>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-xs font-semibold tracking-wider text-left uppercase bproduct-b-2 :bg-coolGray-700 :text-coolGray-50 :bproduct-coolGray-700">
                      <th className="px-3 py-4 md:p-5">ID</th>
                      <th className="px-3 py-4 md:p-5">Name</th>
                      <th className="px-3 py-4 md:p-5">Price</th>
                      <th className="px-3 py-4 md:p-5">Created at</th>
                      <th className="px-3 py-4 md:p-5">Delete</th>
                      <th className="px-3 py-4 md:p-5">Details</th>
                    </tr>
                  </thead>
                  {products.length > 0 ? (
                    <tbody className="divide-y divide-coolGray-700">
                      {products.map((product) => (
                        <>
                          <tr className="space-x-5 text-sm">
                            <td className="p-3 md:p-5">
                              <div className="flex space-x-3">
                                <div>
                                  <p>{product._id.substring(20, 24)}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 md:p-5">
                              <p className=":text-coolGray-400">
                                {product.name}
                              </p>
                            </td>
                            <td className="p-3 md:p-5">
                              <p className=":text-coolGray-400">
                                ${product.price}
                              </p>
                            </td>
                            <td className="p-3 md:p-5">
                              <p className=":text-coolGray-400">
                                ${product.createdAt}
                              </p>
                            </td>
                            <td className="p-3 md:p-5">
                              <Link href={`/adminproducts/${product._id}`}>
                                <a className="px-5 py-2 font-semibold rounded bg-indigo-600 text-white">
                                  Details
                                </a>
                              </Link>
                            </td>
                            <td className="p-3 md:p-5">
                              <a
                                onClick={() => deleteHandler(product._id)}
                                className=" py-2 font-semibold cursor-pointer rounded text-red-500"
                              >
                                Delete
                              </a>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  ) : (
                    // <h1  className='text-center self-center lg:ml-80 md:ml-60 sm:ml-20 my-20 text-4xl '>No product Found</h1>
                    <div></div>
                  )}
                </table>
              </div>
            </div>
          ) : (
            <h1 className="text-center self-center lg:ml-80 md:ml-60 sm:ml-20  text-4xl ">
              No Item Found
            </h1>
          )}
        </>
      </div>
      <div className="flex justify-center py-5 ">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={25}
          marginPageDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"flex"}
          pageLinkClassName={
            "items-center hidden px-4 py-2 mx-1 transition-colors duration-200 transform bg-white rounded-md sm:flex :bg-gray-900 :text-gray-200 hover:bg-blue-600 :hover:bg-blue-500 hover:text-white :hover:text-gray-200"
          }
          previousClassName={
            "flex items-center font-bold px-4 py-2 mx-1 text-gray-500 bg-white rounded-md cursor-not-allowed :bg-gray-900 :text-gray-600"
          }
          nextClassName={
            "flex items-center px-4 font-bold py-2 mx-1 text-gray-500 bg-white rounded-md cursor-not-allowed :bg-gray-900 :text-gray-600"
          }
          // breakClassName={'hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline :bg-gray-900 :text-gray-200 hover:bg-blue-500 :hover:bg-blue-500 hover:text-white :hover:text-gray-200'}
          // breakLinkClassName={'hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline :bg-gray-900 :text-gray-200 hover:bg-blue-500 :hover:bg-blue-500 hover:text-white :hover:text-gray-200'}
          activeClassName={"text-indigo-600 "}
        />

        <p1 className="pt-2 pl-5"></p1>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  await db.disconnect();
  // console.log(products)
  return {
    props: {
      props: JSON.parse(JSON.stringify(products)),
      // props: {
      //   products: products.products.map(db.convertDocToObj)
      // }
    },
  };
}
