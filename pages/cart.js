import React, { useContext } from "react";
import { Store } from "../utils/Store";
import Layout from "../components/Layout";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import axios from "axios";


function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [open, setOpen] = useState(true);
  const [qty, setQty] = useState(cart.cartItems.countInStock);
  const [amount, setAmount] = useState(cart.cartItems.quantity);
  const [error, setError] = useState("dd");


  //closes the cart and routes to the home page
  const close = () => {
    router.push("/");
  };

  //To update the quantity of order
  const updateCart = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock <= 0) {
      // console.log("sorry")
      setError("Sorry. Product is out of stock");
      return;
    }
    if (data.countInStock < quantity) {
      setError("Sorry, you have selected more than we have in stock");
      return;
    }
    const order = { ...item, quantity };
    // console.log(order._id)
    dispatch({ type: "DARK_MODE", payload: { order } });
  };

  const removeItem = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  return (

        <>        
          
    <Layout title="My cart">

      {/* <h1 className="text-center p-10 font-bold text-4xl"></h1> */}
      {cart.cartItems.length === 0 ? (
        <div
          className=" text-center p-10  text-2xl "
          style={{ marginTop: "25vh" }}
        >
          WOW!! Your bag is empty lets{" "}
          <Link href="/" className="text-indigo-600">
            <p className="text-indigo-600 cursor-pointer">go shopping</p>
          </Link>
        </div>
      ) : (

          <>

            {error != "" && (
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

        //check if there are any items in the cart/bag

        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 overflow-hidden"
            onClose={setOpen}
          >
            <div className="absolute inset-0 overflow-hidden ">
              {/* <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child> */}

              <div className="fixed inset-0 max-w-full justify-center flex">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <div className="w-screen max-w-full">
                    <div className="h-full w-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                      <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 h-7 flex items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={close}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cart.cartItems.map((product) => (
                                //using next router to go to the product's page
                                <li key={product.id} className="py-6 flex ">
                                  <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                    <Link href={`/products/${product._id}`}>
                                      <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="w-full h-full object-center object-cover"
                                      />
                                    </Link>
                                  </div>

                                  <div className="ml-4 flex-1 flex flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={product.href}>
                                            {product.name}
                                          </a>
                                        </h3>
                                        <p className="ml-4">${product.price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        Color: {product.selectedColor}
                                      </p>
                                      <p className="mt-1 text-sm text-gray-500">
                                        Size: {product.selectedSize}
                                      </p>
                                    </div>
                                    <div className="flex-1 flex items-end justify-between text-sm">
                                      <div className="flex">
                                        <p>Qty </p>
                                        {/* {console.log(amount)} */}
                                        <input
                                          className="text-gray-500 ml-1 border rounded-sm text-center w-10"
                                          id="quantity"
                                          name="quantity"
                                          type="number"
                                          min="1"
                                          max={qty}
                                          value={product.quantity}
                                          onChange={(e) =>
                                            updateCart(product, e.target.value)
                                          }
                                        />
                                      </div>
                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() => removeItem(product)}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          {console.log(cart.cartItems[0].quantity)}
                          <p>
                            Subtotal (
                            {cart.cartItems.reduce(
                              (a, c) => a + c.quantity ,
                              0
                            )}{" "}
                            item(s))
                          </p>
                          <p>
                            $
                            {cart.cartItems.reduce(
                              (a, c) => a + c.quantity * c.price,
                              0
                            )}
                          </p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <a
                            className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                            onClick={() => {
                              router.push("/shipping");
                            }}
                          >
                            Checkout
                          </a>
                        </div>
                        <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                          <p>
                            or{" "}
                            <button
                              type="button"
                              className="text-indigo-600 font-medium hover:text-indigo-500"
                              onClick={close}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        </>
      )}
    </Layout>
    </>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
