import React, { useEffect, useContext, useState } from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

function OrderHistory() {
  const { state } = useContext(Store);
  const [order, setOrder] = useState([]);
  const { userInfo } = state;
  const router = useRouter();
  useEffect(() => {
    var val;
    if (!userInfo) {
      router.push("/login");
    }
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/history`, {
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

  if (!order) {
    return <div>
       <section className="flex items-center h-full sm:p-16 dark:bg-coolGray-900 dark:text-coolGray-100">
            <div style={{marginTop:"25vh"}} className="container flex flex-col items-center justify-center px-5 mx-auto  space-y-8 text-center sm:max-w-md">
                
                <p className="text-3xl">Sorry this order could not be found</p>
            </div>
        </section>
    </div>;
  }

  return (
    <>
      {order && (
        <Layout title="Orders History">
          <div
            style={{ minHeight: "100vh" }}
            className="container p-6 mx-auto :bg-coolGray-800 :text-coolGray-100"
          >
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
                    <th className="px-3 py-4 md:p-5">Paid</th>
                    <th className="px-3 py-4 md:p-5">Delivered</th>
                    <th className="px-3 py-4 md:p-5">Action</th>
                  </tr>
                </thead>
                {order.length > 0 ? (
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
                              {order.isPaid
                                ? `paid at ${order.paidAt}`
                                : "not paid"}
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
                            <Link href={`/order/${order._id}`}>
                              <a className="px-8 py-3 font-semibold rounded bg-indigo-600 text-white">
                                Details
                              </a>
                            </Link>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                ) : (
                  // <h1  className='text-center self-center lg:ml-80 md:ml-60 sm:ml-20 my-20 text-4xl '>No Order Found</h1>
                  <div></div>
                )}
              </table>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false });
