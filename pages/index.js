import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import data from "../utils/data";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import db from "../utils/db";
import { useContext } from "react";
import { Store } from "../utils/Store";
import Product from "../models/Product";
import Carousel from "../components/carousel/carousel";

export default function Home(props) {
  const { products } = props;
  const { dispatch, state } = useContext(Store);
  const { cart, userInfo } = state;

  // console.log(props.props)
  // const products = [1,2,3]
  return (
    <Layout title="Ecommerce Stuff">
      {/* <Carousel/> */}
      {/* //hero section */}
      {!userInfo && (
        <main className="mt-10 py-0 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">
                Buy and sell products with
              </span>{" "}
              <br />
              <span className="block text-indigo-600 xl:inline">
                Ecommerce stuff
              </span>
            </h1>
            <p className="mt-3 py-5 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Link href="/register">
                  <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                    Signup
                  </a>
                </Link>
              </div>
              {/* <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  >
                    Live demo
                  </a>
                </div> */}
            </div>
          </div>

          <section className="p-6 my-6 :bg-coolGray-800 :text-coolGray-100">
            <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
              <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 :bg-coolGray-900 :text-coolGray-100">
                <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 :bg-violet-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    className="h-9 w-9 :text-coolGray-800"
                  >
                    <polygon points="160 96.039 160 128.039 464 128.039 464 191.384 428.5 304.039 149.932 304.039 109.932 16 16 16 16 48 82.068 48 122.068 336.039 451.968 336.039 496 196.306 496 96.039 160 96.039"></polygon>
                    <path d="M176.984,368.344a64.073,64.073,0,0,0-64,64h0a64,64,0,0,0,128,0h0A64.072,64.072,0,0,0,176.984,368.344Zm0,96a32,32,0,1,1,32-32A32.038,32.038,0,0,1,176.984,464.344Z"></path>
                    <path d="M400.984,368.344a64.073,64.073,0,0,0-64,64h0a64,64,0,0,0,128,0h0A64.072,64.072,0,0,0,400.984,368.344Zm0,96a32,32,0,1,1,32-32A32.038,32.038,0,0,1,400.984,464.344Z"></path>
                  </svg>
                </div>
                <div className="flex flex-col justify-center align-middle">
                  <p className="text-3xl font-semibold leading-none">200</p>
                  <p className="capitalize">Orders</p>
                </div>
              </div>
              <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 :bg-coolGray-900 :text-coolGray-100">
                <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 :bg-violet-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    className="h-9 w-9 :text-coolGray-800"
                  >
                    <path d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
                    <path d="M256,384A104,104,0,0,0,360,280H152A104,104,0,0,0,256,384Z"></path>
                    <polygon points="205.757 228.292 226.243 203.708 168 155.173 109.757 203.708 130.243 228.292 168 196.827 205.757 228.292"></polygon>
                    <polygon points="285.757 203.708 306.243 228.292 344 196.827 381.757 228.292 402.243 203.708 344 155.173 285.757 203.708"></polygon>
                  </svg>
                </div>
                <div className="flex flex-col justify-center align-middle">
                  <p className="text-3xl font-semibold leading-none">7500</p>
                  <p className="capitalize">New customers</p>
                </div>
              </div>
              <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 :bg-coolGray-900 :text-coolGray-100">
                <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 :bg-violet-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    className="h-9 w-9 :text-coolGray-800"
                  >
                    <path d="M425.706,142.294A240,240,0,0,0,16,312v88H160V368H48V312c0-114.691,93.309-208,208-208s208,93.309,208,208v56H352v32H496V312A238.432,238.432,0,0,0,425.706,142.294Z"></path>
                    <rect width="32" height="32" x="80" y="264"></rect>
                    <rect width="32" height="32" x="240" y="128"></rect>
                    <rect width="32" height="32" x="136" y="168"></rect>
                    <rect width="32" height="32" x="400" y="264"></rect>
                    <path d="M297.222,335.1l69.2-144.173-28.85-13.848L268.389,321.214A64.141,64.141,0,1,0,297.222,335.1ZM256,416a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,416Z"></path>
                  </svg>
                </div>
                <div className="flex flex-col justify-center align-middle">
                  <p className="text-3xl font-semibold leading-none">172%</p>
                  <p className="capitalize">Growth</p>
                </div>
              </div>
              <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 :bg-coolGray-900 :text-coolGray-100">
                <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 :bg-violet-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    className="h-9 w-9 :text-coolGray-800"
                  >
                    <path d="M454.423,278.957,328,243.839v-8.185a116,116,0,1,0-104,0V312H199.582l-18.494-22.6a90.414,90.414,0,0,0-126.43-13.367,20.862,20.862,0,0,0-8.026,33.47L215.084,496H472V302.08A24.067,24.067,0,0,0,454.423,278.957ZM192,132a84,84,0,1,1,136,65.9V132a52,52,0,0,0-104,0v65.9A83.866,83.866,0,0,1,192,132ZM440,464H229.3L79.141,297.75a58.438,58.438,0,0,1,77.181,11.91l28.1,34.34H256V132a20,20,0,0,1,40,0V268.161l144,40Z"></path>
                  </svg>
                </div>
                <div className="flex flex-col justify-center align-middle">
                  <p className="text-3xl font-semibold leading-none">17%</p>
                  <p className="capitalize">Bounce rate</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16  sm:py-2 sm:px-2 lg:max-w-7xl lg:px-2">
          <h1 className=" my-10  text-4xl text-center ">Products</h1>

          <div className="grid grid-cols-2 px-3 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {props.props.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product._id}`}
                className="group "
              >
                <a>
                  <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="w-80 h-80 object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    ${product.price}
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16  sm:py-2 sm:px-2 lg:max-w-7xl lg:px-2">
          <h1 className=" my-10  text-4xl text-center ">Best Selling</h1>

          <div className="grid grid-cols-2 px-3 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {props.props.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product._id}`}
                className="group "
              >
                <a>
                  <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="w-80 h-80 object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    ${product.price}
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {!userInfo && (
        <section className="p-4 lg:p-8 :bg-coolGray-800 :text-coolGray-100">
          <div className="container mx-auto space-y-12">
            <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
              <img
                src="https://source.unsplash.com/640x480/?1"
                alt=""
                className="h-80 :bg-coolGray-500 aspect-video"
              />
              <div className="flex flex-col justify-center flex-1 p-6 :bg-coolGray-900">
                <span className="text-xs uppercase :text-coolGray-400">
                  We The Best{" "}
                </span>
                <h3 className="text-3xl font-bold">
                  Get The Best From The Best
                </h3>
                <p className="my-6 :text-coolGray-400">
                  Ecommerce Stuff Has The Best Products In The World, Get The
                  Best From The Best
                </p>
                <button type="button" className="self-start">
                  Action
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16  sm:py-2 sm:px-2 lg:max-w-7xl lg:px-2">
          <h1 className=" my-10  text-4xl text-center ">Popular</h1>

          <div className="grid grid-cols-2 px-3 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {props.props.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product._id}`}
                className="group "
              >
                <a>
                  <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="w-80 h-80 object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    ${product.price}
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16  sm:py-2 sm:px-2 lg:max-w-7xl lg:px-2">
          <h1 className=" my-10  text-4xl text-center ">New</h1>

          <div className="grid grid-cols-2 px-3 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {props.props.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product._id}`}
                className="group "
              >
                <a>
                  <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="w-80 h-80 object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    ${product.price}
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {!userInfo && (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 :bg-coolGray-800 :text-coolGray-100">
          <h2 className="mb-8 text-4xl font-bold leading-none text-center">
            What do we have to offer?
          </h2>
          <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <li className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5 fillCurrent :text-violet-400"
              >
                <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
              </svg>
              <span>Quality Products</span>
            </li>
            <li className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5 fillCurrent :text-violet-400"
              >
                <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
              </svg>
              <span>Quick Delivery</span>
            </li>
            <li className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5 fillCurrent :text-violet-400"
              >
                <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
              </svg>
              <span>Great Refund Policy</span>
            </li>
            <li className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5 fillCurrent :text-violet-400"
              >
                <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
              </svg>
              <span>Good Products</span>
            </li>
            <li className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5 fillCurrent :text-violet-400"
              >
                <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
              </svg>
              <span>Cheap Prices</span>
            </li>
            <li className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5 fillCurrent :text-violet-400"
              >
                <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
              </svg>
              <span>24/7 Customer Service</span>
            </li>
          </ul>
        </div>
      )}
      {!userInfo && (
        <section className="my-8">
          <div className="container mx-auto flex flex-col items-center pb-6 mb-4 md:p-10 md:px-12">
            <h1 className="text-4xl font-semibold leading-none text-center">
              What our customers are saying about us
            </h1>
          </div>
          <div className="container mx-auto grid grid-cols-1 gap-8 lg:gap-20 md:px-10 md:pb-10 lg:grid-cols-2">
            <div className="flex flex-col items-center mx-12 lg:mx-0">
              <div className="relative text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="absolute top-0 left-0 w-8 h-8 :text-coolGray-700"
                >
                  <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                  <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                </svg>
                <p className="px-6 py-1 text-lg italic">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Voluptatibus quibusdam, eligendi exercitationem molestias
                  possimus facere.
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="absolute bottom-0 right-0 w-8 h-8 :text-coolGray-700"
                >
                  <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                  <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                </svg>
              </div>
              <span className="w-12 h-1 my-2 rounded-lg :bg-violet-400"></span>
              <p>Leroy Jenkins</p>
            </div>
            <div className="flex flex-col items-center max-w-lg mx-12 lg:mx-0">
              <div className="relative text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="absolute top-0 left-0 w-8 h-8 :text-coolGray-700"
                >
                  <path
                    fill="currentColor"
                    d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"
                  ></path>
                </svg>
                <p className="px-6 py-1 text-lg italic">
                  Accusantium illum cupiditate harum asperiores iusto quos quasi
                  quis quae! Fugit doloribus, voluptatum quidem magnam velit
                  excepturi nobis, reprehenderit ducimus incidunt quisquam quae
                  veritatis, quos iure harum.
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="absolute bottom-0 right-0 w-8 h-8 :text-coolGray-700"
                >
                  <path
                    fill="currentColor"
                    d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"
                  ></path>
                </svg>
              </div>
              <span className="w-12 h-1 my-2 rounded-lg :bg-violet-400"></span>
              <p>Leroy Jenkins</p>
            </div>
          </div>
        </section>
      )}
    </Layout>
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
