import React, { useState } from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate'

function Pagination() {

  const [item, setItems] = useState([])

const handlePageClick = (data) =>{
    console.log(data.selected)
}

  return (
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
      previousClassName={'flex items-center px-4 py-2 mx-1 text-gray-500 bg-white rounded-md cursor-not-allowed :bg-gray-900 :text-gray-600'}
      nextClassName={'flex items-center px-4 py-2 mx-1 text-gray-500 bg-white rounded-md cursor-not-allowed :bg-gray-900 :text-gray-600'}
      // breakClassName={'hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline :bg-gray-900 :text-gray-200 hover:bg-blue-500 :hover:bg-blue-500 hover:text-white :hover:text-gray-200'}
      // breakLinkClassName={'hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline :bg-gray-900 :text-gray-200 hover:bg-blue-500 :hover:bg-blue-500 hover:text-white :hover:text-gray-200'}
      activeClassName={'text-indigo-600 '}
      />

    </div>
    )
}

export default Pagination;
