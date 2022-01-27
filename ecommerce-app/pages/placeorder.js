import React, { useContext, useEffect } from 'react'
import { Store } from '../utils/Store'
import Layout from "../componets/layout"
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import axios from 'axios'
import getError from '../utils/error'

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
]

function PlaceOrder() {
    
    const router = useRouter()
    const {state, dispatch} = useContext(Store)
    const {cart, userInfo} = state
    const {cart: {cartItems, shippingAddress, paymentMethod}} = state
    const [open, setOpen] = useState(true)
    const [qty, setQty] = useState(cart.cartItems.countInStock)
    const [amount, setAmount] = useState(cart.cartItems.quantity)
    //closes the cart and routes to the home page
    const close =() =>{
        router.push('/')
    }
    //To update the quantity of order
       
    const round2 = num => Math.round(num*100 + Number.EPSILON) /100
    const itemsPrice = round2(cart.cartItems.reduce((a,c) => a + c.quantity * c.price, 0))   
    const shippingPrice = itemsPrice > 200 ? 0 : 15
    const taxPrice = round2(itemsPrice * 0.15)
    const totalPrice = round2(itemsPrice + shippingPrice+taxPrice)

    useEffect(()=>{
        console.log(paymentMethod)  
        if(!shippingAddress.address){
            router.push('/shipping')
        }
        if(!userInfo){
            router.push('/login?redirect=/payment')
        }
    },[])

    const placeOrderHandler = () =>{
        
        try{

        }catch(err){
            setEror(getError(err))
        }
    }

    return (
        <Layout title="Place Order">
                
                <div>
                {/* stage top nvabar */}

                { error == "Please select a Payment method" &&(
              
              <div className="w-full text-white bg-red-500">
              <div className="container flex items-center justify-between px-6 py-4 mx-auto">
                  <div className="flex">
                      <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
                          <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"></path>
                      </svg>

                      <p className="mx-3">{error}</p>
                  </div>

                  <button onClick={() =>setError("")} className="p-1 transition-colors duration-200 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                  </button>
              </div>
          </div>
          )}

                <div className="p-4 space-y-2 justify-center py-10 top-0 :bg-coolGray-800 dark:text-coolGray-100">
            <h3 className="text-base text-center font-semibold">Step 4:  Place Order</h3>
            <div className=" flex justify-center space-x-5">
                <span className="w-12 h-2 rounded-sm dark:bg-indigo-600"></span>
                <span className="w-12 h-2 rounded-sm dark:bg-indigo-600"></span>
                <span className="w-12 h-2 rounded-sm dark:bg-indigo-600"></span>
                <span className="w-12 h-2 rounded-sm dark:bg-indigo-600"></span>
                
            </div>
        </div>
            
              <div className="w-screen max-w-full">
                <div className="h-full w-full flex flex-col bg-white shadow-xl ">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                      <h1 className="text-2xl font-bold">Place Order</h1>
                        <br/>
                        <br/>
                        <h1 className='font-medium text-lg'>Shipping Address</h1>
                        <br/>
                        {/* since the address is not an array i cannot map  */}
                        <div className='flex space-x-3'>
                            <p>{cart.shippingAddress.name},</p>
                            <p>{cart.shippingAddress.code},</p>
                            <p>{cart.shippingAddress.address},</p>
                            <p>{cart.shippingAddress.city},</p>
                            <p>{cart.shippingAddress.country}</p>
                        </div>
                        <br/>
                        <h1 className='font-medium text-lg'>Payment Method</h1>
                        <br/>
                        <p>{cart.paymentMethod}</p>
                        <br/>
                    <div className="flex items-start justify-between">
                      <h1 className="text-lg font-medium text-gray-900">Order Items</h1>
    
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {cart.cartItems.map((product) => (
                            //using next router to go to the product's page
                            <li key={product.id} className="py-6 flex " >
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
                                      <a href={product.href}>{product.name}</a>
                                    </h3>
                                    <p className="ml-4">${product.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">Color: {product.selectedColor.name}</p>
                                  <p className="mt-1 text-sm text-gray-500">Size: {product.selectedSize.name}</p>
                                </div>
                                <div className="flex-1 flex items-end justify-between text-sm">
                                    <div className="flex">
                                    <p >Qty </p>
                                    {/* {console.log(amount)} */}
                                  <p className="text-gray-500 font-medium text-center w-5">{product.quantity}</p>
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
                      <div className='flex justify-between py-1'>
                        <p className="mt-0.5 text-sm text-gray-500 font-bold">Items</p>
                        <p className>${itemsPrice}</p>
                  </div>
                  <div className='flex justify-between py-1'>
                        <p className="mt-0.5 text-sm text-gray-500 font-bold">Tax</p>
                        <p className>${taxPrice}</p>
                  </div>
                  <div className='flex justify-between py-1'>
                        <p className="mt-0.5 text-sm text-gray-500 font-bold">Shipping</p>
                        <p className>${shippingPrice}</p>
                  </div>
                  <br/>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        
                      <p>Total ({cart.cartItems.reduce((a,c) => a + c.quantity, 0)}{' '} item(s))</p>
                      <p>${totalPrice}</p>
                    </div>
                   
                    <div className="mt-6">
                      <a
                       
                        className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        onClick={placeOrderHandler}
                      >
                        Place order
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          className="text-indigo-600 font-medium hover:text-indigo-500"
                          onClick={()=>{router.push('/')}}
                        >
                          Continue Shopping<span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
          
    </div>
            
        </Layout>
    )
}

export default dynamic(() => Promise.resolve(PlaceOrder), {ssr: false})
