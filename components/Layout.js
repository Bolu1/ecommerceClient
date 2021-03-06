/* This example requires Tailwind CSS v2.0+ */
import Head from "next/head";
import { Fragment,useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useContext } from "react";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

// the contents of the mobile nav
const solutions = [
  {
    
    name: "Home",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "/",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>,
  },
  {
    name: "Search",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "/search",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>,
  },
  {
    name: "Shipping",
    description: "Your customers' data will be safe and secure.",
    href: "/shipping",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>,
  },

  {
    name: "About",
    description: "Your customers' data will be safe and secure.",
    href: "/aboutus",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>,
  },

  {
    name: "Bag",
    description:
      "Build strategic funnels that will drive your customers to convert",
    href: "/cart",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>,
  },
];
const callsToAction = [
  { name: "Watch Demo", href: "#", icon: PlayIcon },
  { name: "Contact Sales", href: "#", icon: PhoneIcon },
];

// contents of the dropdown for the profile
const resources = [
  {
    name: "Profile",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "/profile",
    icon: SupportIcon,
  },
  {
    name: "Orders",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "/order-history",
    icon: BookmarkAltIcon,
  },
  {
    name: "Logout",
    description: "Understand how we take your privacy seriously.",
    href: "#",
    icon: ShieldCheckIcon,
  },
];
const recentPosts = [
  { id: 1, name: "Boost your conversion rate", href: "#" },
  {
    id: 2,
    name: "How to use search engine optimization to drive traffic to your site",
    href: "#",
  },
  { id: 3, name: "Improve your customer experience", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


export default function Layout({ title, children }) {
  const router = useRouter();
  const { dispatch, state } = useContext(Store);
  const { cart, userInfo } = state;
  const [profile, setProfile] = useState()
  const [name, setName] = useState()

  //go to cart
  const goToCart = () => {
    router.push("/cart");
  };

  // logout handler
  const logoutHandler = ()=>{
    dispatch({ type: "USER_LOGOUT"})
    
    Cookies.remove('userInfo')
    Cookies.remove('cartItems')
    router.push('/')
  }

  useEffect(() => {
    setProfile(localStorage.getItem('myCat'))
    if(userInfo){
      var n = userInfo.name.split(" ")
      setName(n[0])
    }
    
    // console.log(name)
  }, []);
  
  return (
    <div>
      <Head>
        <title>{title} Ecommerce Stuff</title>
      </Head>

      <Popover className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between  items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <span className="sr-only">Workflow</span>
              <Link href="/">
                <img
                  style={{ cursor: "pointer" }}
                  className="h-8 w-auto sm:h-10"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt=""
                />
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden md:flex space-x-10">
              
            <a
                href="/"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Home
              </a>

              <a
                href="/search"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Search
              </a>

              <a
                href="/shipping"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Shipping
              </a>

              <a
                href="/aboutus"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                About
              </a>

            </Popover.Group>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              {cart.cartItems.length != 0 ? (
                <a
                  style={{ cursor: "pointer" }}
                  onClick={goToCart}
                  className="whitespace-nowrap  text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Bag{" "}
                  <span
                    style={{ color: "white", marginLeft: "5px" }}
                    className="bg-indigo-600 px-2  h-8 w-8  mx-4 px-2  rounded-lg"
                  >
                    {cart.cartItems.length}
                  </span>
                </a>
              ) : (
                <a
                  style={{ cursor: "pointer" }}
                  onClick={goToCart}
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Bag{" "}
                  <span
                    style={{ color: "white" }}
                    className={`bg-grey-500 text-red-400 hidden h-8 w-8  mx-4 px-2  rounded-lg`}
                  ></span>
                </a>
              )}
              {/* //checks if userinfo is present if present, show user's name */}
              {!userInfo ? (
                <a
                  onClick={() => router.push("/login")}
                  className="ml-8 cursor-pointer whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Login
                </a>
              ) : (
              //  mapping the contents of the drop down on the name componets
                <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "" : "",
                        "group  rounded-md inline-flex items-center text-base font-medium  ",
                        "ml-8 whitespace-nowrap cursor-pointer inline-flex items-center justify-center px-4 py-2   rounded-md  text-base font-bold "
                      )}
                    >
                      
                      <div className="relative flex-shrink-0 px-2">
                        <img src={profile} alt="" className="w-12 h-12 border rounded-full dark:bg-coolGray-500 dark:border-coolGray-700"/>
                      </div>
                     
                      <span>{name}</span>
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3  px-2 w-40 max-w-md sm:px-0">
                        <div className="rounded-lg text-center shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative text-center grid gap-2 bg-white py-1 sm:gap-8 sm:p-8">
                              <a 
                              href='/profile'
                                className="-m-3 cursor-pointer text-center  items-start rounded-lg hover:bg-gray-50"
                              >
                                      <p href='/profile' className="text-base text-center ">
                                      profile
                                   </p>
                              </a>
                              <a 
                              href='/order-history'
                                className="-m-3 cursor-pointer text-center  items-start rounded-lg hover:bg-gray-50"
                              >
                                      <p href='/order-history' className="text-base text-center ">
                                      orders
                                   </p>
                              </a>
                              <a
                                className="-m-3 cursor-pointer text-center  items-start rounded-lg hover:bg-gray-50"
                              >
                                      <p style={{color:"red"}} onClick={logoutHandler} className="text-base text-center text-red-500">
                                      logout
                                   </p>
                              </a>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              )}
            </div>
          </div>
        </div>

        

        {/* responsive mobile nav view         */}

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="relative  top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {solutions.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                      >
                        <div className="flex-shrink-0 h-6 w-6 text-indigo-600"
                          aria-hidden="true">
                            {item.icon}
                        </div>
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                        {item.name == "Bag" ? (
                          <span
                            style={{ marginLeft: "5px" }}
                            className="text-indigo-600 px-2 font-bold  h-8 w-8  mx-4 px-2  rounded-lg"
                          >
                            {cart.cartItems.length}
                          </span>
                        ) : (
                          <></>
                        )}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
              {!userInfo ? (
              <div className="py-6 px-5 space-y-6">
                <div>
                  <a
                    href="/register"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Sign up
                  </a>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Existing customer?{" "}
                    <a
                      href="/login"
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      Sign in
                    </a>
                  </p>
                </div>
              </div>): 
                  <div className="py-4 px-4 space-x-4 flex">
                      
                      <div className="relative flex-shrink-0 px-2">
                      <img src={profile} alt="" className="w-12 h-12 border rounded-full dark:bg-coolGray-500 dark:border-coolGray-700"/>
                   </div> 

                      <Link href="/profile" >
                        <h1 className="font-medium py-3 px-4 cursor-pointer">Profile</h1>
                      </Link>

                      <Link href="/order-history" >
                        <h1 className="font-medium py-3 px-4 cursor-pointer">Orders</h1>
                      </Link>

                      <div onClick={logoutHandler}>
                        <h1 className="font-medium py-3 px-4 cursor-pointer" style={{color: "red"}}>Logout</h1>
                      </div>

                  </div>
              }
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      
     {/* back to top */}
         
      <div style={{top: "90vh", right:"10vh"}} onClick={()=>router.push('#')} className="flex-shrink-0 cursor-pointer fixed h-6 w-6 bg-white rounded-md text-indigo-600" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
        </svg>
      </div>
      <div style={{ minHeight: "60vh" }}>{children}</div>
     
      
      {/* //fotter */}

      <footer className="flex flex-col items-center justify-between px-6 py-10 bg-white bg-indigo-600 sm:flex-row">
            <a href="#" className="text-xl font-bold text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">Ecommerce Stuff</a>
            
            <p className="py-2 text-gray-800 dark:text-white sm:py-0">All rights reserved</p>

            <div className="flex -mx-2">
                <a href="#" className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Reddit">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM6.807 10.543C6.20862 10.5433 5.67102 10.9088 5.45054 11.465C5.23006 12.0213 5.37133 12.6558 5.807 13.066C5.92217 13.1751 6.05463 13.2643 6.199 13.33C6.18644 13.4761 6.18644 13.6229 6.199 13.769C6.199 16.009 8.814 17.831 12.028 17.831C15.242 17.831 17.858 16.009 17.858 13.769C17.8696 13.6229 17.8696 13.4761 17.858 13.33C18.4649 13.0351 18.786 12.3585 18.6305 11.7019C18.475 11.0453 17.8847 10.5844 17.21 10.593H17.157C16.7988 10.6062 16.458 10.7512 16.2 11C15.0625 10.2265 13.7252 9.79927 12.35 9.77L13 6.65L15.138 7.1C15.1931 7.60706 15.621 7.99141 16.131 7.992C16.1674 7.99196 16.2038 7.98995 16.24 7.986C16.7702 7.93278 17.1655 7.47314 17.1389 6.94094C17.1122 6.40873 16.6729 5.991 16.14 5.991C16.1022 5.99191 16.0645 5.99491 16.027 6C15.71 6.03367 15.4281 6.21641 15.268 6.492L12.82 6C12.7983 5.99535 12.7762 5.993 12.754 5.993C12.6094 5.99472 12.4851 6.09583 12.454 6.237L11.706 9.71C10.3138 9.7297 8.95795 10.157 7.806 10.939C7.53601 10.6839 7.17843 10.5422 6.807 10.543ZM12.18 16.524C12.124 16.524 12.067 16.524 12.011 16.524C11.955 16.524 11.898 16.524 11.842 16.524C11.0121 16.5208 10.2054 16.2497 9.542 15.751C9.49626 15.6958 9.47445 15.6246 9.4814 15.5533C9.48834 15.482 9.52348 15.4163 9.579 15.371C9.62737 15.3318 9.68771 15.3102 9.75 15.31C9.81233 15.31 9.87275 15.3315 9.921 15.371C10.4816 15.7818 11.159 16.0022 11.854 16C11.9027 16 11.9513 16 12 16C12.059 16 12.119 16 12.178 16C12.864 16.0011 13.5329 15.7863 14.09 15.386C14.1427 15.3322 14.2147 15.302 14.29 15.302C14.3653 15.302 14.4373 15.3322 14.49 15.386C14.5985 15.4981 14.5962 15.6767 14.485 15.786V15.746C13.8213 16.2481 13.0123 16.5208 12.18 16.523V16.524ZM14.307 14.08H14.291L14.299 14.041C13.8591 14.011 13.4994 13.6789 13.4343 13.2429C13.3691 12.8068 13.6162 12.3842 14.028 12.2269C14.4399 12.0697 14.9058 12.2202 15.1478 12.5887C15.3899 12.9572 15.3429 13.4445 15.035 13.76C14.856 13.9554 14.6059 14.0707 14.341 14.08H14.306H14.307ZM9.67 14C9.11772 14 8.67 13.5523 8.67 13C8.67 12.4477 9.11772 12 9.67 12C10.2223 12 10.67 12.4477 10.67 13C10.67 13.5523 10.2223 14 9.67 14Z">
                        </path>
                    </svg>
                </a>

                <a href="#" className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300"
                    aria-label="Facebook">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2.00195 12.002C2.00312 16.9214 5.58036 21.1101 10.439 21.881V14.892H7.90195V12.002H10.442V9.80204C10.3284 8.75958 10.6845 7.72064 11.4136 6.96698C12.1427 6.21332 13.1693 5.82306 14.215 5.90204C14.9655 5.91417 15.7141 5.98101 16.455 6.10205V8.56104H15.191C14.7558 8.50405 14.3183 8.64777 14.0017 8.95171C13.6851 9.25566 13.5237 9.68693 13.563 10.124V12.002H16.334L15.891 14.893H13.563V21.881C18.8174 21.0506 22.502 16.2518 21.9475 10.9611C21.3929 5.67041 16.7932 1.73997 11.4808 2.01722C6.16831 2.29447 2.0028 6.68235 2.00195 12.002Z">
                        </path>
                    </svg>
                </a>

                <a href="#" className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Github">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z">
                        </path>
                    </svg>
                </a>
            </div>
        </footer>
    </div>
  );
}
