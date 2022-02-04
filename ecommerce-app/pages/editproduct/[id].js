import React, { useEffect } from "react";
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
  const router = useRouter()
  const { dispatch, state } = useContext(Store);
  const { cart, userInfo } = state;
  const [selectedColor, setSelectedColor] = useState(props.colors[0]);
  const [selectedSize, setSelectedSize] = useState(props.sizes[2]);
  const [sSize, setSsize] = useState([])
  const [quantity, setQuantity] = useState(1);

  const addToCart = async() =>{

  }

  const click = (id) =>{
    router.push(`/editproduct/${id}`)
  }

  // if user does not have this permission
  useEffect(() => {
    if(userInfo){
      if(!userInfo.isAdmin){
        router.push('/')
      }
    }
 
  }, []);
  

  if (!props) {
    return <div>Not found</div>;
  }
  return (
    <div >
      <div className="bg-white">
        
    <section class="max-w-4xl mt-5 p-6 mx-auto bg-white rounded-md shadow-md :bg-gray-800">
        <h2 class="text-lg font-semibold text-gray-700 capitalize :text-white">Edit Product</h2>
        
        <form>
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                    <label class="text-gray-700 :text-gray-200" for="username">Name</label>
                    <input id="username" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"/>
                </div>

                <div>
                    <label class="text-gray-700 :text-gray-200" for="emailAddress">Price</label>
                    <input id="emailAddress" type="number" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"/>
                </div>

                <div>
                    <label class="text-gray-700 :text-gray-200" for="password">Category</label>
                    <input id="password" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"/>
                </div>

                <div>
                    <label class="text-gray-700 :text-gray-200" for="passwordConfirmation">P</label>
                    <input id="passwordConfirmation" type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"/>
                </div>
                
                <div class="flex ">
                <div class="mb-3 xl:w-96">
                  <label for="exampleFormControlTextarea1" class="form-label inline-block mb-2 text-gray-700"
                    >Details
                    </label>
                  <textarea
                    class="
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
                    placeholder="Your message"
                  ></textarea>
                </div>
              </div>

              <div class="flex ">
                <div class="mb-3 xl:w-96">
                  <label for="exampleFormControlTextarea1" class="form-label inline-block mb-2 text-gray-700" >
                      Description
                  </label >
                  <textarea
                    class="
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
                    placeholder="Your message"
                  ></textarea>
                </div>
              </div>

            </div>

            <div class="flex justify-end mt-6">
                <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
            </div>
        </form>
    </section>
      </div>
    </div>
  );
}

export async function getServerSideProps(context){
  const {params} = context
  const {id} = params

  await db.connect()
  const products = await Product.findOne({_id : id}).lean()
  await db.disconnect()
  return{
     props:JSON.parse(JSON.stringify(products)),

  }
}