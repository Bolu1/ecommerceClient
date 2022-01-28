import React, { useContext, useEffect, useReducer } from 'react'
import { Store } from '../../utils/Store'
import Layout from "../../componets/layout"
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import axios from 'axios'
import Cookies from 'js-cookie'

// const reducer = (state, action) =>{
//     switch(action.type){
//         case 'FETCH_REQUEST':
//             return {...state, order: {}, error:''}

//         case 'FETCH_SUCCESS':
//             return {...state, order: action.payload}
//         case 'FETCH_FAIL':
//             return {...state, error: action.payload}
//     }
// }

function Order({params}) {

    const orderId = params.id
    const router = useRouter()
    const {state} = useContext(Store)
    const {cart, userInfo} = state
    const [order, setOrder] = useState({})

    //To update the quantity of order
    
    

    // const [{ order}, dispatch] = useReducer(reducer, {order:{}})
    const {shippingAddress, paymentMethod, orderItems, itemsPrice, taxPrice, shippingPrice, totalPrice, isPaid, paidAt, isDelivered, deliveredAt} = order

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
                // dispatch({type:'FETCH_SUCCESS', payload:data})
            }catch(err){
                const getError = (err) =>{
                err.response && err.response.data && err.response.data.message
                ?err.response.data.message
                : err.message
            }
                console.log(err)
                // dispatch({type:'FETCH_FAIL', payload:getError(err)})
            }
            setOrder(val)
        }
        
        // if(!order._id || (order._id && order._id==orderId)){
            fetchOrder()
        // }
    },[])

  

    return (
        <>
        {shippingAddress ?(
        <>

        <Layout title="Order Details">
                
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
                        
                      <p>Total ({cart.cartItems.reduce((a,c) => a + c.quantity, 0)}{' '} item(s))</p>
                      <p>${totalPrice}</p>
                    </div>
                   
                  </div>
                </div>
              </div>
          
    </div>
            
        </Layout></> ): <></>}</>
    )
}

export async function getServerSideProps({params}){
    return{props:{params}}
}

export default dynamic(() => Promise.resolve(Order), {ssr: false})
