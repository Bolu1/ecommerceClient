import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { RadioGroup } from "@headlessui/react";
import Layout from "../../components/Layout";
import data from "../../utils/data";
import db from "../../utils/db";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../../utils/Store";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example(props) {
  const [data, setData] = useState();
  const router = useRouter();
  const { dispatch, state } = useContext(Store);
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [sSize, setSsize] = useState([]);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/${props.id}`);
        setData(data);
        setSelectedColor(data.colors[0]);
        setSelectedSize(data.sizes[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);


  const addToCart = async () => {
    // console.log( data);
    const { data } = await axios.get(`/api/products/${props.id}`);
    if (data.countInStock <= 0) {
      window.alert("Sorry. Product is out of stock");
      return;
    }

    const existItem = state.cart.cartItems.find((x) => x._id === props.id);
    //array that holds sizes
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (data.countInStock < quantity) {
      setError("Sorry, you have selected more than we have in stock");
      return;
    }

    const order = { ...data, selectedColor, selectedSize, quantity };
    dispatch({ type: "DARK_MODE", payload: { order, quantity: 1 } });
    setError("successful")
  };

  const click = (e) => {
    e.preventDefault();
    addToCart();
  };

  const setColor = (c) =>{
    setSelectedColor(c)
    console.log("here ",c)
  }
  // when no item is found
  if (!data) {
    return <div>
       <section className="flex items-center h-full sm:p-16 dark:bg-coolGray-900 dark:text-coolGray-100">
            <div style={{marginTop:"25vh"}} className="container flex flex-col items-center justify-center px-5 mx-auto  space-y-8 text-center sm:max-w-md">
                
                <p className="text-3xl"></p>
            </div>
        </section>
    </div>;
  }

  return (
    <>        
          {error != "" && error != "successful" && (
            <div className="w-full fixed text-white bg-red-500">
              <div className="container flex items-center justify-between px-6 py-4 mx-auto">
                <div className="flex">
                  <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
                    <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"></path>
                  </svg>

                  <p className="mx-3">Sorry, you have selected more than we have in stock</p>
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

                  <p className="mx-3">Product added to bag</p>
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

    <Layout title={data.name}>
  

      <div className="bg-white">
        <div className="pt-6">
          {/* Image gallery */}
          <div className="mt-6 max-w-2xl mx-auto px-14 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
            <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
              <img
                src={data.imageSrc}
                alt={data.imageAlt}
                className="w-96 h-96 object-center object-cover"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                {data.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:mt-0 lg:row-span-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">${data.price}</p>


              <form className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-sm text-gray-900 font-medium">Colors</h3>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex datas-center space-x-3">
                      {data.colors.map((color) => (
                        <RadioGroup.Option
                          key={color}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              `ring-${color}-400`,
                              active && checked ? "ring ring-offset-1" : "",
                              !active && checked ? "ring-2" : "",
                              "-m-0.5 relative p-0.5 rounded-full flex datas-center justify-center cursor-pointer focus:outline-none"
                            )
                          }
                        >
                          <RadioGroup.Label as="p" className="sr-only">
                            {color}
                          </RadioGroup.Label>
                          <span
                          onClick={()=>setColor(color)}
                          style={{background:`${color}`, opacity:"0.7"}}
                            aria-hidden="true"
                            className={classNames(
                              `bg-${color}-500`,
                              "h-8 w-8 border border-black border-opacity-10 rounded-full"
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex datas-center justify-between">
                    <h3 className="text-sm text-gray-900 font-medium">Sizes</h3>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {data.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size}
                          value={size}
                          className={({ active }) =>
                            classNames(
                              active ? "ring-2 ring-indigo-500" : "",
                              "group relative border rounded-md py-3 px-4 flex datas-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="p">{size}</RadioGroup.Label>
                              <div
                                onClick={()=>setSelectedSize(color)}
                                className={classNames(
                                  active ? "border" : "border-2",
                                  checked
                                    ? "border-indigo-500"
                                    : "border-transparent",
                                  "absolute -inset-px rounded-md pointer-events-none"
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </form>
              <button
                // type="submit"
                className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex datas-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={click}
              >
                Add to bag
              </button>
            </div>

            <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">{data.description}</p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                    {data.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{data.details}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  const val = {
    id: params.id,
  };
  return {
    props: params,
  };
}
