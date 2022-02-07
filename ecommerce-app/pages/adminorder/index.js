import React, { useEffect, useContext, useState } from "react";
import dynamic from "next/dynamic";
import Layout from "../../componets/Layout";
import { Store } from "../../utils/Store";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

function AdminOrder() {
  const { state } = useContext(Store);
  const [order, setOrder] = useState([]);
  const [search, setSearch] = useState([]);
  const { userInfo } = state;
  const router = useRouter();

  const submitHandlder = async() =>{
    e.preventDefault()
        
    try{

        const {data} = await axios.post('/api/order/search', {search})
        setProducts(data)
    }catch(err){
        console.log(err)
    }
  }

  useEffect(() => {
    var val;
    if (!userInfo) {
      router.push("/login");
    }
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/all`, {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        });
        val = data;
      } catch (err) {
        const getError = (err) => {
          err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : err.message;
        };
        console.log(err);
        // dispatch({type:'FETCH_FAIL', payload:getError(err)})
      }
      setOrder(val);
    };

    // if(!order._id || (order._id && order._id==orderId)){
    fetchOrder();
  }, []);

  return (
    
      <>

        <div className='flex'>
            
            <div class="flex flex-col w-64 h-screen  px-8 py-8 bg-slate-800 bproduct-r :bg-gray-800 :bproduct-gray-600">
                <h2 class="text-3xl font-semibold text-center text-white">Products</h2>

                <div class="relative mt-6">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </span>
                    <form onSubmit={submitHandlder}> 
                    <input value={search} onChange={(e) =>setSearch(e.target.value)} type="text" class="w-full py-2 pl-10 pr-4 text-gray-700 bg-white bproduct rounded-md :bg-gray-800 :text-gray-300 :bproduct-gray-600 focus:bproduct-blue-400 :focus:bproduct-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search"/>
                    </form>
                    
                </div>
                
                <div class="flex flex-col justify-between flex-1 mt-6">
                    <nav>

                    <a href="/dashboard" class="flex items-center px-4 py-2 cursor-pointer mt-5 text-gray-600 transition-colors duration-200 transform rounded-md :text-gray-400 hover:bg-gray-200 :hover:bg-gray-700 :hover:text-gray-200 hover:text-gray-700" >
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                    </svg>

                            <span class="mx-4 font-medium">Products</span>
                        </a>
                        
                        <a class="flex items-center px-4 py-2 cursor-pointer mt-5 text-gray-600 transition-colors duration-200 transform rounded-md :text-gray-400 hover:bg-gray-200 :hover:bg-gray-700 :hover:text-gray-200 hover:text-gray-700" >
                                    
                        <svg href="/adminorder" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>

                            <span class="mx-4 font-medium">Orders</span>
                        </a>

                      
                        <a href="/adminuser" class="flex items-center px-4 py-2 cursor-pointer mt-5 text-gray-600 transition-colors duration-200 transform rounded-md :text-gray-400 hover:bg-gray-200 :hover:bg-gray-700 :hover:text-gray-200 hover:text-gray-700" >
                                    
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>

                            <span class="mx-4 font-medium">Users</span>
                        </a>
                    </nav>

                   
                </div>
            </div>

      {order && (
          <div style={{minHeight:"100vh"}} className="container p-6 mx-auto :bg-coolGray-800 :text-coolGray-100">
            <h2 className="mb-6 text-2xl font-semibold leading-tight">
              Orders
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-xs font-semibold tracking-wider text-left uppercase border-b-2 :bg-coolGray-700 :text-coolGray-50 :border-coolGray-700">
                    <th className="px-3 py-4 md:p-5">ID</th>
                    <th className="px-3 py-4 md:p-5">Date</th>
                    <th className="px-3 py-4 md:p-5">Total</th>
                    <th className="px-3 py-4 md:p-5">Delivered</th>
                    <th className="px-3 py-4 md:p-5">Delivered at</th>
                    <th className="px-3 py-4 md:p-5">Action</th>
                  </tr>
                </thead>
                {order.length>0?(
                <tbody className="divide-y divide-coolGray-700">
                  {order.map((order) => (
                    <>
                      <tr className="space-x-5 text-sm">
                        <td className="p-3 md:p-5">
                          <div className="flex space-x-3">
                            <div>
                              <p>{order._id.substring(20, 24)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 md:p-5">
                          <p className=":text-coolGray-400">
                            {order.createdAt}
                          </p>
                        </td>
                        <td className="p-3 md:p-5">
                          <p className=":text-coolGray-400">
                            ${order.totalPrice}
                          </p>
                        </td>
                        <td className="p-3 md:p-5">
                          {/* <span className="px-3 py-1 font-semibold rounded-full :bg-violet-400 :text-coolGray-900"> */}
                          <span>
                          <span>
                            {order.isDelivered
                              ? `Delivered`
                              : "Not devlivered"}
                          </span>
                          </span>
                          {/* </span> */}
                        </td>
                        <td className="p-3 md:p-5">
                          {/* <span className="px-3 py-1 font-semibold rounded-full :bg-violet-400 :text-coolGray-900"> */}
                          <span>
                            {order.isDelivered
                              ? `delivered at ${order.deliveredAt}`
                              : "not devlivered"}
                          </span>
                          {/* </span> */}
                        </td>
                        <td className="p-3 md:p-5">
                          <Link href={`/adminorder/${order._id}`}>
                            <a
                              className="px-8 py-3 font-semibold rounded bg-indigo-600 text-white"
                            >
                              Details
                            </a>
                          </Link>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
                ):
                // <h1  className='text-center self-center lg:ml-80 md:ml-60 sm:ml-20 my-20 text-4xl '>No Order Found</h1>
                <div></div>
              }
        
              </table>
            </div>
          </div>
          
        
      )}
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(AdminOrder), { ssr: false });
