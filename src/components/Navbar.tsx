import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div >
      <header className=" bg-gray-400 text-white h-[50px] rounded-lg m-10 top-4 left-4 right-4 w-svh shadow-md shadow-black" >
        <nav  >
          <ul className="flex flex-row p-3 font-bold ml-10 gap-10  hover:cursor-pointer "  >
            <li className=" hover:text-black ">
              <Link to="/" >Home</Link>
            </li>
            <li className=" hover:text-black ">
              <Link to="/products" >PRODUCTS</Link>
            </li>
            <li className="  hover:text-black ">
              <Link to="/cart" >CART</Link>
            </li>
            <li className="  hover:text-black ">
              <Link to="/AddProduct" >Add Product</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Navbar