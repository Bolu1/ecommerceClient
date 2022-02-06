import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Link from 'next/link'
import { RadioGroup } from "@headlessui/react";
import Layout from "../../componets/Layout";
import data from "../../utils/data";
import db from '../../utils/db'
import Product from '../../models/Product'
import axios from 'axios'
import {useContext} from 'react' 
import {Store} from '../../utils/Store'


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}



export default function Example(props) {
  const router = useRouter( )
  const {dispatch, state} = useContext(Store)
  const [selectedColor, setSelectedColor] = useState(props.colors[0]);
  const [selectedSize, setSelectedSize] = useState(props.sizes[2]);
  const [sSize, setSsize] = useState([])
  const [quantity, setQuantity] = useState(1);

  const addToCart = async() =>{
    console.log("chehehe "+props._id)
    const {data} = await axios.get(`/api/products/${props._id}`)
    if(data.countInStock <=0){
      window.alert('Sorry. Product is out of stock')
      return
    }
    
    const existItem = state.cart.cartItems.find(x=>x._id === props._id)
    //array that holds sizes
    const quantity = existItem? existItem.quantity + 1: 1
    if(data.countInStock <quantity){
      window.alert('Sorry, you have selected more than we have in stock')
      return
    }
    
    const order = {...props, selectedColor, selectedSize, quantity}
    // console.log(order)
    dispatch({type:'DARK_MODE', payload:{order, quantity: 1 }})
    // router.push('/cart')
  }

  const click = (e) =>{
    e.preventDefault()
    addToCart()
  }


  // console.log(props)


  // const props = data.find((a) => a.id == id);
  if (!props) {
    return <div>Not found</div>;
  }
    // return
    // comp 
    // slap 

  return (
    <Layout title={props.name}>
      <div className="bg-white">
        <div className="pt-6">
          

          {/* Image gallery */}
          <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                      <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
              <img
                src={props.imageSrc}
                alt={props.imageAlt}
                className="w-96 h-96 object-center object-cover"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                {props.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:mt-0 lg:row-span-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">${props.price}</p>

              {/* Reviews
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex propss-center">
                  <div className="flex propss-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          props.reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{props.reviews.average} out of 5 stars</p>
                  <a
                    href={props.reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {props.reviews.totalCount} reviews
                  </a>
                </div>
              </div> */}

              <form className="mt-10" >
                {/* Colors */}
                <div>
                  <h3 className="text-sm text-gray-900 font-medium">Color</h3>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex propss-center space-x-3">
                      {props.colors.map((color) => (
                        <RadioGroup.Option
                          key={color}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              `ring-${color}-400`,
                              active && checked ? "ring ring-offset-1" : "",
                              !active && checked ? "ring-2" : "",
                              "-m-0.5 relative p-0.5 rounded-full flex propss-center justify-center cursor-pointer focus:outline-none"
                            )
                          }
                        >
                          <RadioGroup.Label as="p" className="sr-only">
                            {color}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              `bg-${color}-600`,
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
                  <div className="flex propss-center justify-between">
                    <h3 className="text-sm text-gray-900 font-medium">Size</h3>
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
                      {props.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size}
                          value={size}
                          className={({ active }) =>
                            classNames(
                              active ? "ring-2 ring-indigo-500" : "",
                              "group relative border rounded-md py-3 px-4 flex propss-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="p">
                                {size}
                              </RadioGroup.Label>
                                <div
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
                  className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex propss-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                  <p className="text-base text-gray-900">
                    {props.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                    {props.highlights.map((highlight) => (
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
                  <p className="text-sm text-gray-600">{props.details}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context){
  const {params} = context
  const {id} = params

  await db.connect()
  
  const products = await Product.findOne({id : id})
  console.log("hehe "+id)
  console.log(products)
  await db.disconnect()
  return{
     props:JSON.parse(JSON.stringify(products)),

  }
}