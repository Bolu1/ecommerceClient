import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Store } from "../utils/Store";
import Layout from "../components/Layout";
import Cookies from "js-cookie";

function Shipping() {
  const { dispatch, state } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  const router = useRouter();

  // const [saved, setSaved] = useState({
  //     name: shippingAddress.name ,
  //     address: shippingAddress.address,
  //     city: shippingAddress.city ,
  //     code: shippingAddress.code ,
  //     country: shippingAddress.country,
  // })
  const [email, setEmail] = useState(shippingAddress.email);
  const [address, setAddress] = useState(shippingAddress.address);
  const [name, setName] = useState(shippingAddress.name);
  const [city, setCity] = useState(shippingAddress.city);
  const [code, setCode] = useState(shippingAddress.code);
  const [country, setCountry] = useState(shippingAddress.country);

  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/shipping");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      address: address,
      city: city,
      code: code,
      country: country,
    };
    const value = JSON.stringify(data);
    dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: data });
    Cookies.set("shippingAddress", value);
    router.push("/payment");
  };

  return (
    <Layout title="Shipping">
      <div>
        <div className="p-4 space-y-2 justify-center py-10 top-0 :bg-coolGray-800 dark:text-coolGray-100">
          <h3 className="text-base text-center font-semibold">
            Step 2: Shipping Address
          </h3>
          <div className=" flex justify-center space-x-5">
            <span className="w-12 h-2 rounded-sm dark:bg-indigo-600"></span>
            <span className="w-12 h-2 rounded-sm dark:bg-indigo-600"></span>
            <span className="w-12 h-2 rounded-sm dark:bg-indigo-100"></span>
            <span className="w-12 h-2 rounded-sm dark:bg-indigo-100"></span>
          </div>
        </div>

        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md :bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 capitalize :text-white">
            Shipping Address
          </h2>

          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-gray-900 :text-gray-700">
                  Full Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  type="text"
                  required
                  className="block w-full px-4 py-2 mt-2 required text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label className="text-gray-900 :text-gray-200">Address</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  id="address"
                  type="text"
                  required
                  className="block w-full px-4 py-2 mt-2 required text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label className="text-gray-900 :text-gray-200">City</label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  id="city"
                  type="text"
                  required
                  className="block w-full px-4 py-2 mt-2 required text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label className="text-gray-900 :text-gray-200">
                  Postal Code
                </label>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  id="postalCode"
                  type="text"
                  required
                  className="block w-full px-4 py-2 mt-2 required text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label className="text-gray-900 :text-gray-200">Country</label>
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  id="country"
                  type="text"
                  required
                  className="block w-full px-4 py-2 mt-2 required text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
                Continue
              </button>
            </div>
          </form>
        </section>
      </div>
    </Layout>
  );
}

export default Shipping;
