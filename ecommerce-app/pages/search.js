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
import ReactPaginate from 'react-paginate'



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

    const pagSearch = async(page) =>{
        
        try{

            const {data} = await axios.post(`/api/products/search?page=${page}`, {search})
            setProducts(data)
        }catch(err){
            console.log(err)
        }
        
    }

    const pagCat = async(page) =>{
        try{
            
            const {data} = await axios.post(`/api/products/category?page=${page}`, {search, category})
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

    const handlePageClick = (data) =>{
        console.log(data.selected)
        {category ==""?(
                pagSearch(data.selected)
            ):
            pagCat(data.selected)
        }
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
    
  return(
   <div>
       <Layout >

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
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                    </svg>

                            <span class="mx-4 font-medium">All</span>
                        </a>
                        
                        <a class="flex items-center px-4 py-2 cursor-pointer mt-5 text-gray-600 transition-colors duration-200 transform rounded-md :text-gray-400 hover:bg-gray-200 :hover:bg-gray-700 :hover:text-gray-200 hover:text-gray-700" onClick={bagHandler}>
                                    
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>

                            <span class="mx-4 font-medium">Bags</span>
                        </a>

                        <a class="flex items-center px-4 py-2 cursor-pointer mt-5 text-gray-600 transition-colors duration-200 transform rounded-md :text-gray-400 hover:bg-gray-200 :hover:bg-gray-700 :hover:text-gray-200 hover:text-gray-700" onClick={shoeHandler}>
                                    
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>

                            <span class="mx-4 font-medium">Shoes</span>
                        </a>

                        <a class="flex items-center px-4 py-2 cursor-pointer mt-5 text-gray-600 transition-colors duration-200 transform rounded-md :text-gray-400 hover:bg-gray-200 :hover:bg-gray-700 :hover:text-gray-200 hover:text-gray-700" onClick={accHandler}>
                                    
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>

                            <span class="mx-4 font-medium">Acessories</span>
                        </a>

                        <a class="flex items-center px-4 py-2 cursor-pointer mt-5 text-gray-600 transition-colors duration-200 transform rounded-md :text-gray-400 hover:bg-gray-200 :hover:bg-gray-700 :hover:text-gray-200 hover:text-gray-700" onClick={shirtHandler}>
                                    
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>

                            <span class="mx-4 font-medium">Shirts</span>
                        </a>
    
                    </nav>

                   
                </div>
            </div>

            {/* products */}
        <>
        {products.length>0?(
            <div className="grid grid-cols-2 p-3 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          
          <Link key={product.id} href={`/products/${product._id}`} className="group">
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
        
      </div>):
        <h1  className='text-center self-center lg:ml-80 md:ml-60 sm:ml-20  text-4xl '>No Item Found</h1>
      }

      </>
            
    </div>
    <div className='flex justify-center py-5 '>
       
       <ReactPaginate 
       previousLabel={'previous'}
       nextLabel={'next'}
       breakLabel={'...'}
       pageCount={25}
       marginPageDisplayed={2}
       pageRangeDisplayed={3}
       onPageChange={handlePageClick}
       containerClassName={'flex'}
       pageLinkClassName={'items-center hidden px-4 py-2 mx-1 transition-colors duration-200 transform bg-white rounded-md sm:flex :bg-gray-900 :text-gray-200 hover:bg-blue-600 :hover:bg-blue-500 hover:text-white :hover:text-gray-200'}
       previousClassName={'flex items-center font-bold px-4 py-2 mx-1 text-gray-500 bg-white rounded-md cursor-not-allowed :bg-gray-900 :text-gray-600'}
       nextClassName={'flex items-center px-4 font-bold py-2 mx-1 text-gray-500 bg-white rounded-md cursor-not-allowed :bg-gray-900 :text-gray-600'}
       // breakClassName={'hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline :bg-gray-900 :text-gray-200 hover:bg-blue-500 :hover:bg-blue-500 hover:text-white :hover:text-gray-200'}
       // breakLinkClassName={'hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline :bg-gray-900 :text-gray-200 hover:bg-blue-500 :hover:bg-blue-500 hover:text-white :hover:text-gray-200'}
       activeClassName={'text-indigo-600 '}
       />

       <p1 className="pt-2 pl-5"></p1>
 
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