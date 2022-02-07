import Head from 'next/head'
import Link from "next/link"
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../componets/Layout'
import Pagination from '../componets/Pagination'
import  data from '../utils/data'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import db from '../utils/db'
import { useContext } from "react";
import { Store } from "../utils/Store";
import Product from '../models/Product'


export default function Home(props) {
  const {products} = props
  const { dispatch, state } = useContext(Store);
  const { cart, userInfo } = state;

  // console.log(props.props)
  // const products = [1,2,3]
  return (

    <Layout>
          
         {/* //hero section */}
      { !userInfo &&(
      <main className="mt-10 py-0 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Buy and sell products with</span>{' '}<br/>
                <span className="block text-indigo-600 xl:inline">Ecommerce stuff</span>
              </h1>
              <p className="mt-3 py-5 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                fugiat veniam occaecat fugiat aliqua.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link href="/register">
                  <a
                    
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
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
            
          </main> )}

          <div className="bg-white">


      <div className="max-w-2xl mx-auto py-16  sm:py-2 sm:px-2 lg:max-w-7xl lg:px-2">
      <h1 className=" my-10 font-bold text-4xl text-center ">Products</h1>

      
      <div className="grid grid-cols-2 px-3 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {props.props.map((product) => (
          
          <Link key={product.id} href={`/products/${product._id}`} className="group ">
          <a>
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="w-80 h-80 object-center object-cover group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
          </a>
          </Link>
        ))}
      </div>
      </div>
      </div>
      <Pagination/>
    </Layout>
  
   )
}


export async function getServerSideProps(){
  await db.connect()
  const products = await Product.find().lean()
  await db.disconnect()
  // console.log(products)
  return{
    props:{
      props:JSON.parse(JSON.stringify(products)),
      // props: {
      //   products: products.products.map(db.convertDocToObj)
      // }
    }
  }
}