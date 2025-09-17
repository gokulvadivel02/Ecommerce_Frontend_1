import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';

const Home = () => {

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [ProductAvailable, setProductAvailable] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  // const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const addClick = async ()=>{

    // const formData = new FormData() ;
    // formData.append("productName", productName) ;
    // formData.append("description", description) ;
    // formData.append("stock", stock) ;
    // formData.append("ProductAvailable", ProductAvailable) ;
    // formData.append("price", price) ;
    // formData.append("category", category) ;
    // formData.append("brand", brand) ;
    // if(imageUrl){
    //   formData.append("imageUrl", imageUrl) ;
    // }

      const formData = new FormData();
      formData.append("products", new Blob([JSON.stringify({
      productName, description, stock, ProductAvailable, price, category, brand
      })], { type: "application/json" }));
    if(imageUrl){
      formData.append("imageUrl", imageUrl);
    }

    const response = await fetch("http://localhost:8080/shop/add" ,{
      method : "POST" ,
      body: formData 

      // headers : {
      //   "Content-Type" : "application/json"
      // },
      // body:JSON.stringify({productName, description, stock: parseInt(stock), 
      //   ProductAvailable: ProductAvailable === "true", price: parseInt(price), category, brand, imageUrl})

    })

    setProductName("");
    setDescription("") ;
    setStock("") ;
    setProductAvailable("") ;
    setPrice("") ;
    setCategory("") ;
    setBrand("") ;
    setImageUrl(null) ;
    setPreview("" ) ;

    const data = await response.json()
    console.log("Saved:", data)
    
  }

  return (
    <div className=' bg-gray-700 m-10 rounded-lg flex flex-col items-center justify-center space-y-10 p-10' >
      
      <h1 className='text-8xl text-white font-serif' > Welcome To Lev Shopping  </h1>
      <h2 className='text-4xl text-white font-serif' >One stop forword for amazing shopping ... </h2>
      
    </div>
  )
}

export default Home