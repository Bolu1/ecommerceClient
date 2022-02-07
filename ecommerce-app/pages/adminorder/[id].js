import React, { useContext, useEffect, useReducer } from 'react'
import { Store } from '../../utils/Store'
import Layout from "../../componets/layout"
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { usePayPalScriptReducer, PayPalButtons } from '@paypal/react-paypal-js'
import axios from 'axios'
import Cookies from 'js-cookie'
import {initializePayment, verifyPayment} from '../../utils/paystack'

function Order({params}) {
  const [{isPending}, paypalDispatch] = usePayPalScriptReducer()
    const orderId = params.id
    const router = useRouter()
    const {state} = useContext(Store)
    const {cart, userInfo} = state
    const [order, setOrder] = useState({})
    const [error, setError] = useState('')
    const [dev, setDev] = useState(false)

    //To update the quantity of order
    
    const getError = (err) =>{
    err.response && err.response.data && err.response.data.message
    ?err.response.data.message
    : err.message
}

    // const [{ order}, dispatch] = useReducer(reducer, {order:{}})
    const {shippingAddress, paymentMethod, orderItems, itemsPrice, taxPrice, shippingPrice, totalPrice, isPaid, paidAt, isDelivered, deliveredAt} = order

    const suubmitHandler = async(e) =>{
      e.preventDefault()
      try{
      const {data} = await axios.put('/api/orders/update', {orderId, dev},{
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      })
      const value = JSON.stringify(data.data)
      setError("successful")
      }catch(err){
        console.log(err)
        setError(getError(err)?getError(err):"Something went wrong")
      }
      console.log(dev)
    }


    useEffect(()=>{
        var val
        if(!userInfo){
            router.push('/login?redirect=/payment')
        }
        const fetchOrder = async () =>{
            
            try{
            
                const {data} = await axios.get(`/api/orders/${orderId}`,{
                    headers: {
                        authorization: `Bearer ${userInfo.token}`
                    }
                })
                val = data
            }catch(err){
                const getError = (err) =>{
                err.response && err.response.data && err.response.data.message
                ?err.response.data.message
                : err.message
            }
                console.log(err)
            }
            setOrder(val)
        }
        
        
            fetchOrder()
        
    },[])

  

    return (
        <>
        {shippingAddress ?(
        <>

            { error != "" && error != "successful" &&(
                  
                  <div className="w-full fixed text-white bg-red-500">
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

                  { error == "successful" &&(
                                
                                <div className="w-full text-white bg-emerald-500">
                                <div className="container flex items-center justify-between px-6 py-4 mx-auto">
                                    <div className="flex">
                                        <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
                                            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"></path>
                                        </svg>

                                        <p className="mx-3">Update Successful</p>
                                    </div>

                                    <button onClick={() =>setError("")} className="p-1 transition-colors duration-200 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                      </div>
                  )}
                <div>
                {/* stage top nvabar */}
            
              <div className="w-screen max-w-full">
                <div className="h-full w-full flex flex-col bg-white shadow-xl ">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                      <h1 className="text-2xl font-bold">Order {orderId}</h1>
                        <br/>
                        <br/>
                        <h1 className='font-medium text-lg'>Shipping Address</h1>
                        <br/>
                        {/* since the address is not an array i cannot map  */}
                        <div className='flex space-x-3'>
                            <p>{shippingAddress.name},</p>
                            <p>{shippingAddress.code},</p>
                            <p>{shippingAddress.address},</p>
                            <p>{shippingAddress.city},</p>
                            <p>{shippingAddress.country}</p>
                        </div>
                        <div className=' my-1 flex space-x-3 font-medium'>
                            Status:{' '}{isDelivered?`delivered at ${deliveredAt}`:'not delivered'}
                        </div>
                        <br/>
                        
                        <h1 className='font-medium text-lg'>Payment Method</h1>
                        <br/>
                        <p>{paymentMethod}</p>
                        <div className='my-1 flex space-x-3 font-medium'>
                            Status:{' '}{isDelivered?`Paid at ${paidAt}`:'not paid'}
                        </div>
                        <br/>
                        
                        {/* {cart.cartItems?(  */}
                    <div className="flex items-start justify-between">
                      <h1 className="text-lg font-medium text-gray-900">Order Items</h1>
                            {/* ):<div></div> } */}
                    </div>
                    {orderItems?(   
                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {orderItems.map((product) => (
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
                    </div>  ):<div></div> }
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
                        {/* if this line does not show number of items chang it to just total price */}
                      <p>Total ({cart.cartItems.reduce((a,c) => a + c.quantity, 0)}{' '} item(s))</p>  
                      <p>${totalPrice}</p>
                    </div>
                    <form className="py-4">

                    <div className="flex justify-center">
                        <div className="flex space-x-10">
                            <div className="form-check">
                            <input onChange={(e)=>{setDev(false)}} className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="Paypal" value="Paypal"/>
                            <label className="form-check-label inline-block text-gray-800 font-medium" htmlFor="flexRadioDefault1">
                                Not Delivered
                            </label>
                            </div>
                            <br/>
                            <div className="form-check">
                            <input onChange={(e)=>{setDev(true)}} className="form-check-input onChange={(e)=>{setPaymentMethod(e.target.value)}} appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="PayStack" value="PayStack" />
                            <label className="form-check-label inline-block text-gray-800 font-medium" htmlFor="flexRadioDefault2">
                                Delivered
                            </label>
                            </div>
                            <br/>
                        </div>
                        </div>
                        
                        <br/>
                        <div className="flex justify-end mt-6">
                            <button onClick={suubmitHandler} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Update</button>
                        </div>
                    </form>
                  </div>
                </div>
              </div>
          
    </div>
            </> ): <></>}</>
    )
}

export async function getServerSideProps({params}){
    return{props:{params}}
}

export default dynamic(() => Promise.resolve(Order), {ssr: false})
