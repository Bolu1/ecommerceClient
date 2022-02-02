import Head from 'next/head'
import Link from "next/Link"
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../componets/Layout'
import  data from '../utils/data'
import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import db from '../utils/db'
import { useContext, useEffect } from "react";
import { Store } from "../utils/Store";
import Product from '../models/Product'
import axios from 'axios'



export default function Search(props) {

    // const {products} = props
    const { dispatch, state } = useContext(Store);
    const { cart, userInfo } = state;
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState("")
    const [search, setSearch] = useState("")
  
    const submitHandlder = async(e) =>{
        e.preventDefault()
        
        try{

            const {data} = await axios.post('/api/products/search', {search})
            setProducts(data)
        }catch(err){
            console.log(err)
        }
        
    }

    const scatHandler = async(e) =>{
        e.preventDefault()
        try{
            
            const {data} = await axios.post('/api/products/category', {search, category})
            setProducts(data)
        }catch(err){
            console.log(err)
        }
    }

    const catHandler = async(state) =>{
        
        try{
            
            const {data} = await axios.post('/api/products/category', {search, state})
            setProducts(data)
        }catch(err){
            console.log(err)
        }
    }

    const noHandler = async(state) =>{
        
        try{
            
            const {data} = await axios.post('/api/products/search', {search})
            setProducts(data)
        }catch(err){
            console.log(err)
        }
    }

    const allHandler = (e) =>{
        e.preventDefault
        setCategory("")
        setCategory((state) => {
            noHandler(state)
            return state;
          });
           }

    const bagHandler = (e) =>{
        e.preventDefault
        setCategory("Bags")
        setCategory((state) => {
            catHandler(state)
            return state;
          });
    }

    const shoeHandler = (e) =>{
        e.preventDefault
        setCategory("Shoes")
        setCategory((state) => {
            catHandler(state)
            return state;
          });
    }

    const accHandler = (e) =>{
        e.preventDefault
        setCategory("Acessories")
        setCategory((state) => {
            catHandler(state)
            return state;
          });
    }

    const shirtHandler = (e) =>{
        e.preventDefault
        setCategory("Shirts")
        setCategory((state) => {
            catHandler(state)
            return state;
          });
    }

    useEffect(() => {
        
        try{
            const fetchProducts = async() =>{
                const {data} = await axios.post('/api/products/search', {search})
                setProducts(data)
            }
            fetchProducts()
        }catch(err){
            console.log(err)
        }
    }, []);

    // const changeHandler = (cat) =>{
    //     setSearch("")
    //     setCategory
        
    // }
    

  return(
   <div>
       <Layout>

            <div className='flex'>
            
            <div class="flex flex-col w-64 h-screen  px-4 py-8 bg-white border-r :bg-gray-800 :border-gray-600">
                <h2 class="text-3xl font-semibold text-center text-gray-800 :text-white">{category!=""?category:"All"}</h2>

                <div class="relative mt-6">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </span>
                    {category ==""?(
                    <form onSubmit={submitHandlder}> 
                    <input value={search} onChange={(e) =>setSearch(e.target.value)} type="text" class="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search"/>
                    </form>
                    ): <form onSubmit={scatHandler}>
                    <input value={search} onChange={(e) =>setSearch(e.target.value)} type="text" class="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search"/>
                    </form>}
                </div>
                
                <div class="flex flex-col justify-between flex-1 mt-6">
                    <nav>

                    <a class="flex items-center px-4 py-2 cursor-pointer mt-5 text-gray-600 transition-colors duration-200 transform rounded-md :text-gray-400 hover:bg-gray-200 :hover:bg-gray-700 :hover:text-gray-200 hover:text-gray-700" onClick={
                            allHandler
                            }>
                                    
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <span class="mx-4 font-medium">All</span>
                        </a>
                        
                        <a class="flex items-center px-4 py-2 cursor-pointer mt-5 text-gray-600 transition-colors duration-200 transform rounded-md :text-gray-400 hover:bg-gray-200 :hover:bg-gray-700 :hover:text-gray-200 hover:text-gray-700" onClick={bagHandler}>
                                    
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <span class="mx-4 font-medium">Bags</span>
                        </a>

                        <a class="flex items-center px-4 py-2 cursor-pointer mt-5 text-gray-600 transition-colors duration-200 transform rounded-md :text-gray-400 hover:bg-gray-200 :hover:bg-gray-700 :hover:text-gray-200 hover:text-gray-700" onClick={shoeHandler}>
                                    
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <span class="mx-4 font-medium">Shoes</span>
                        </a>

                        <a class="flex items-center px-4 py-2 cursor-pointer mt-5 text-gray-600 transition-colors duration-200 transform rounded-md :text-gray-400 hover:bg-gray-200 :hover:bg-gray-700 :hover:text-gray-200 hover:text-gray-700" onClick={accHandler}>
                                    
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <span class="mx-4 font-medium">Acessories</span>
                        </a>

                        <a class="flex items-center px-4 py-2 cursor-pointer mt-5 text-gray-600 transition-colors duration-200 transform rounded-md :text-gray-400 hover:bg-gray-200 :hover:bg-gray-700 :hover:text-gray-200 hover:text-gray-700" onClick={shirtHandler}>
                                    
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <span class="mx-4 font-medium">Shirts</span>
                        </a>
    
                    </nav>

                   
                </div>
            </div>

            {/* products */}
        <>
        {products?(
            <div className="grid grid-cols-1 p-3 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          
          <Link key={product.id} href={`/products/${product._id}`} className="group">
          <a>
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="w-full h-full object-center object-cover group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
          </a>
          </Link>
        ))}
        
      </div>):
        <h1 className='text-center text-4xl'>No Item Found</h1>
      }

      </>
            
    </div>

       </Layout>
  </div>
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