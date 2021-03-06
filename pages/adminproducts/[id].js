// import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Link from 'next/link'
import {useContext} from 'react' 
import axios from 'axios'
import { RadioGroup } from "@headlessui/react";
import {Store} from '../../utils/Store'


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}



export default function Example(props) {
  const router = useRouter( )
  const {dispatch, state} = useContext(Store)
  const { cart, userInfo } = state;
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [data, setData] = useState()
  const [sSize, setSsize] = useState([])
  const [quantity, setQuantity] = useState(1);

  const deleteHandler = async(id) =>{
    try{
    const {data} = await axios.post('/api/products/delete', {id},{
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    })
    router.push("/dashboard")
  }catch(err){
      console.log(err)
  }

  }

  const click = (e) =>{
    e.preventDefault()
    addToCart()
  }

  useEffect(() => {
    if(!userInfo){
      router.push("/");
    }
    if(!userInfo.isAdmin){
      router.push('/')
    }
    const fetchData = async()=>{
      try{
        console.log(props)
        const {data} = await axios.get(`/api/products/${props.id}`)
        setData(data)
        console.log(data)
        setSelectedColor(data.colors)
        setSelectedSize(data.sizes)
      }catch(err){
        console.log(err) 
      }
    }
    fetchData()
  },[])

  if (!data) {
    return <div>Not found</div>;
  }
  return (
      <div className="bg-white">
        <div className="pt-6">
          

          {/* Image gallery */}          
          <div className="mt-6 max-w-2xl mx-auto px-14 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                         <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
              <img
                src={data.imageSrc}
                alt={data.imageAlt}
                className="w-96 h-96 object-center object-cover"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                {data.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:mt-0 lg:row-span-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">${data.price}</p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex datas-center">
                  <div className="flex datas-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          data.reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{data.reviews.average} out of 5 stars</p>
                  <a
                    href={data.reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {data.reviews.totalCount} reviews
                  </a>
                </div>
              </div>

              <form className="mt-10" >
                {/* Colors */}
                <div>
                  <h3 className="text-sm text-gray-900 font-medium">Colors</h3>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex datas-center space-x-3">
                      {data.colors.map((color) => (
                        <RadioGroup.Option
                          key={color}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              `ring-${color}-400`,
                              active && checked ? "ring ring-offset-1" : "",
                              !active && checked ? "ring-2" : "",
                              "-m-0.5 relative p-0.5 rounded-full flex datas-center justify-center cursor-pointer focus:outline-none"
                            )
                          }
                        >
                          <RadioGroup.Label as="p" className="sr-only">
                            {color}
                          </RadioGroup.Label>
                          <span
                            style={{background:`${color}`, opacity:"0.7"}}
                            aria-hidden="true"
                            className={classNames(
                              `bg-${color}-600`,
                              "h-8 w-8 border border-black border-opacity-10 rounded-full"
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex datas-center justify-between">
                    <h3 className="text-sm text-gray-900 font-medium">Sizes</h3>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {data.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size}
                          value={size}
                          className={({ active }) =>
                            classNames(
                              active ? "ring-2 ring-indigo-500" : "",
                              "group relative border rounded-md py-3 px-4 flex datas-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="p">
                                {size}
                              </RadioGroup.Label>
                                <div
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-indigo-500"
                                      : "border-transparent",
                                    "absolute -inset-px rounded-md pointer-events-none"
                                  )}
                                  aria-hidden="true"
                                />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                
              </form>
              
              <Link href={`/editproduct/${data._id}`} >
              <a
                  // type="submit"
                  className="mt-10 w-full bg-indigo-500 border border-transparent rounded-md py-3 px-8 flex datas-center justify-center text-base font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit 
                </a>
                </Link>

                <a
                  // type="submit"
                  onClick={()=>deleteHandler(data._id)}
                  className="mt-5 w-full bg-red-500 border border-transparent rounded-md py-3 px-8 flex cursor-pointer datas-center justify-center text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete 
                </a>
            </div>

            <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {data.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                    {data.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{data.details}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export async function getServerSideProps(context){
  const {params} = context
  const {id} = params

  const val = {
    id: params.id
  }
  return{
     props:params,

  }
}