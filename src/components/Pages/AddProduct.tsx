import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';

const AddProduct = () => {
    
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
  
          <Button className='col-start-2 col-end-4' onClick={()=>addClick()} > Add Product </Button>
        </div>
        
      </div>
    )
}

export default AddProduct