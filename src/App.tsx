import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./components/Pages/Home"
import Products from "./components/Pages/Products"
import Cart from "./components/Pages/Cart"
import Update from "./components/Pages/Update"
import { useEffect, useState } from "react";
import AddProduct from "./components/Pages/AddProduct";
import ProductDetails from "./components/Pages/ProductDetails";

function App() { 

  const [product, setProduct] = useState<any[]>([]);
  const[error , setError] = useState<Error |null>(null) ;
  // const[error , setError] = useState(false) ;

useEffect(()=>{
    const fetchData = async ()=>{
    try{
      const response = await fetch("http://localhost:8080/shop/products",{
      method : "GET" 
    })
    const data = await response.json() ;
    setProduct(data)
    // console.log(data)
    }
    catch(error){
      console.log("Error fetching product :" , error)
      setError(error as Error) ;
      // setError(true) ;
    }
  }
  fetchData();

},[])


  return (
    <Router>
    <div className="  flex flex-col w-full min-h-screen bg-gray-500 " >

      <div className="" >
         <Navbar/>
        <main>
          <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/products" element={<Products product={product} error={error} />} />
             <Route path="/cart" element={<Cart  product={product} error={error} />} />
             <Route path="/update/:id" element={<Update/>}/>
             <Route path="/AddProduct" element={<AddProduct/>} />
             <Route path="/Product/:id" element={<ProductDetails/>} />
           </Routes>
        </main>
      </div>
      
    </div>
    </Router>
  )
}

export default App


// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// function Homes() {
//   return <h1 className="text-2xl font-bold p-4">Welcome to Home</h1>;
// }

// function Product() {
//   return <h1 className="text-2xl font-bold p-4">This is Product Page</h1>;
// }

// function App() {
//   return (
//     <Router>
//       <div className="w-screen h-screen bg-gray-100">
//         {/* Navbar */}
//         <header className="bg-blue-500 text-white h-[50px] rounded-lg fixed top-4 left-4 right-4 z-50 shadow-md flex items-center justify-center gap-10">
//           <nav>
//             <ul className="flex gap-10 font-bold">
//               <li>
//                 <Link to="/" className="hover:text-yellow-300">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/product" className="hover:text-yellow-300">
//                   Product
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//         </header>

//         {/* Pages */}
//         <main className="pt-20 flex justify-center">
//           <Routes>
//             <Route path="/" element={<Homes />} />
//             <Route path="/product" element={<Product />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;
