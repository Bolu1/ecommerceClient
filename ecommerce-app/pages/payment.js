import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import {Store} from '../utils/Store'
import Layout from '../componets/Layout';
import Cookies from 'js-cookie';


function Payment() {
    const router = useRouter()
    const [paymentMethod, setPaymentMethod] = useState('')
    const [error, setError] = useState('')
    const {state, dispatch} = useContext(Store)
    const {userInfo, cart:{shippingAddress}}  = state

    useEffect(()=>{
        console.log(paymentMethod)  
        if(!shippingAddress.address){
            router.push('/shipping')
        }
        else{
             setPaymentMethod(Cookies.get('paymentMethod' || ''))
        }
        if(!userInfo){
            router.push('/login?redirect=/payment')
        }
    },[])

    const submitHandler = (e) =>{
        
        e.preventDefault()
        if(!paymentMethod){
            setError("Please select a Payment method")
        }else{
            dispatch({type:'SAVE_PAYMENT_METHOD', payload: paymentMethod})
            Cookies.set('paymentMethod', paymentMethod)
            router.push('/placeorder')
        }
        
        
    }

  return <Layout title="Payment Method">
          <div >
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
        <div className="p-4 space-y-2 justify-center py-10  top-0 :bg-coolGray-800 dark:text-coolGray-100">
            <h3 className="text-base text-center font-semibold">Step 3: Payment</h3>
            <div className=" flex justify-center space-x-5">
                <span className="w-12 h-2 rounded-sm dark:bg-indigo-600"></span>
                <span className="w-12 h-2 rounded-sm dark:bg-indigo-600"></span>
                <span className="w-12 h-2 rounded-sm dark:bg-indigo-600"></span>
                <span className="w-12 h-2 rounded-sm dark:bg-indigo-100"></span>
               
            </div>
        </div>
        <h1 className='text-center text-2xl font-bold'>Payment Method</h1>
        <div className="flex py-10 justify-center">
            
        <form onSubmit={submitHandler}>

        <div className="flex justify-center">
            <div>
                <div className="form-check">
                <input onChange={(e)=>{setPaymentMethod("Paypal")}} className="form-check-input onChange={(e)=>{setPaymentMethod(e.target.value)}} appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="Paypal" value="Paypal"/>
                <label className="form-check-label inline-block text-gray-800 font-medium" htmlFor="flexRadioDefault1">
                    Paypal
                </label>
                </div>
                <br/>
                <div className="form-check">
                <input onChange={(e)=>{setPaymentMethod("PayStack")}} className="form-check-input onChange={(e)=>{setPaymentMethod(e.target.value)}} appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="PayStack" value="PayStack" />
                <label className="form-check-label inline-block text-gray-800 font-medium" htmlFor="flexRadioDefault2">
                    PayStack
                </label>
                </div>
                <br/>
                <div className="form-check">
                <input onChange={(e)=>{setPaymentMethod("Cash")}} className="form-check-input onChange={(e)=>{setPaymentMethod(e.target.value)}} appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="Cash"  value="Cash" />
                <label className="form-check-label inline-block text-gray-800 font-medium" htmlFor="flexRadioDefault2">
                    Cash
                </label>
                </div>
            </div>
            </div>
            
            <br/>
            <div className="flex justify-end mt-6">
                <button  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Continue</button>
            </div>
            <div className="flex justify-center mt-6">
            <button onClick={()=> router.push('/shipping')} type="button" className="px-10 py-1 font-semibold border rounded-md dark:border-coolGray-100 :text-coolGray-100">Back</button>
            </div>
        </form>
        </div>
    </div>
 
  </Layout>;
}

export default Payment;

