import React from 'react'
import {useParams}  from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button';

interface Props{
  productName : string,
  stock : number ;
  brand : string,
  category : string ,
  description : string,
  price : number ,
  imageType : string,
  imageUrl : string ,
  productAvailable : string ,
  imageName : string ,
  id : number
}

interface product{
  products :Props[] ;
}

const Update = () => {

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

  const params  = useParams<{ id: string }>();
  const id = params.id ;

  const [updates, setUpdates] = useState<Props | null >(null) ;

  const updateClick = async()=>{
   const formData = new FormData();
      formData.append("products", new Blob([JSON.stringify({
      id , productName, description, stock, ProductAvailable, price, category, brand
      })], { type: "application/json" }));
    if(imageUrl){
      formData.append("imageUrl", imageUrl);
    }

    const response = await fetch("http://localhost:8080/shop/update" ,{
      method : "PUT" ,
      body: formData 
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

  useEffect(()=>{
    const update = async ()=>{
      const response = await fetch(`http://localhost:8080/shop/productById/${id}`,{
      method : "GET"
    })
    const data = await response.json();
    setUpdates(data) ;
    console.log(data) ;
    console.log(updates)
    }
    update();
  },[id])

  return (
   <div className=' bg-gray-700 m-10 rounded-lg flex flex-col items-center justify-center space-y-10 p-10' >
      <h1 className='text-8xl text-white font-serif' > Welcome To Lev Shopping  </h1>
      <h2 className='text-4xl text-white font-serif' >One stop forword for amazing shopping ... </h2>

      <div className=' grid grid-cols-4 gap-5 gap-y-10 bg-gray-900 w-fit h-fit p-10 rounded-2xl space-y-5text-center text-white  ' >
        productName :
        <Input className=' border-4  ' placeholder='productName '  value={productName} onChange={(e)=>{setProductName(e.target.value)}} />
        description :
        <Input className=' border-4  ' placeholder='description' value={description} onChange={(e)=>{setDescription(e.target.value)}} />
        stock :
        <Input className=' border-4  ' placeholder='stock' value={stock} onChange={(e)=>{setStock(e.target.value)}} />
        ProductAvailable :
        <Input className=' border-4  ' placeholder='ProductAvailable' value={ProductAvailable} onChange={(e)=>{setProductAvailable(e.target.value)}} />
        price :
        <Input className=' border-4  ' placeholder='price' value={price} onChange={(e)=>{setPrice(e.target.value)}} />
        category :
        <Input className=' border-4  ' placeholder='category' value={category} onChange={(e)=>{setCategory(e.target.value)}} />
        brand :
        <Input className=' border-4  ' placeholder='brand' value={brand} onChange={(e)=>{setBrand(e.target.value)}} />
        {/* <Input className=' border-4  ' placeholder='imageUrl' value={imageUrl} onChange={(e)=>{setImageUrl(e.target.value)}} /> */}

        imageUrl :
         <Input
          className=' border-4 pb-2 text-white col-start-2 col-end-4  '
          type="file"
          accept="image/*"
          onChange={(e) => {
             const file = (e.target as HTMLInputElement).files?.[0];
            
            if (file) {
              setImageUrl(file);
              setPreview(URL.createObjectURL(file)); // preview before upload
            }
          }}
        />

        {/* Preview selected image */}
        {preview && <img src={preview} alt="preview" className="w-50 h-50 col-start-2 col-end-4 mx-auto rounded-lg mt-3" />}

        <Button className='col-start-2 col-end-4' onClick={()=>updateClick()} > Update Product </Button>
      </div>
      
    </div>
  )
}

export default Update