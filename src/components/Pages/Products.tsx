import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import { Link, Router, Routes } from 'react-router-dom';
import Update from './Update';


interface Props{
  productName : string,
  stock : number ;
  brand : string,
  category : string ,
  description : string,
  price : number ,
  imageType : string,
  imageUrl : string ,
  productAvailable : boolean ,
  imageName : string ,
  id : number
}

interface products{
  product:Props[]
  error : Error | null
}

const Products:React.FC<products> = ({product,error}) => {

  const [products, setProducts] = useState<Props[]>(product) ;

    const handleDelete = async(id : number )=>{
    const response = await fetch(`http://localhost:8080/shop/delete/${id}`, {
      method:"DELETE"
    })
    if(response.ok){
      alert(`product ${id} deleted successfully` )
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }else{
      alert("Error")
    }
    
  }

  
  return (
    <div className='text-center' >
      <div className='grid grid-cols-4' >

        { error? <h1 className='text-5xl font-extrabold  ' >{error.message}</h1>
         : 
          products.map((p,i)=>(
          
          <div key={i} className=' w-fit h-fit bg-black p-10 m-4 rounded-lg grid grid-cols-4 justify-items-center text-white space-y-4 space-x-4 ' 
          >
              
            <img 
              src={`data:${p.imageType};base64,${p.imageUrl}`}
              alt={p.productName}
              className="w-40 h-40 object-cover rounded-lg col-span-4   "
            />

            <h1 className='col-span-4 bg-gray-900 w-[250px]  p-2 rounded-lg  ' > {p.productName} </h1> 
            <h3 className='col-span-4 bg-gray-900 w-[250px]  p-2 rounded-lg   ' > Description : {p.description} </h3>
            <h3 className='col-span-4 bg-gray-900 w-[250px]  p-2 rounded-lg   ' > stock : {p.stock} </h3>
            
            <h2 className='col-span-4 bg-gray-900 w-[250px]  p-2 rounded-lg   '  > Price : {p.price}</h2>
             <h3 className='col-start-1 col-end-3' > category : {p.category} </h3> 
             <h4 className='col-start-3 col-end-5 bg-gray-950 p-2 rounded-2xl '  >{p.brand} </h4>
            <h4>{p.productAvailable} </h4> 

            <Button className='col-span-4'  >
              <Link to={`/Product/${p.id} `}> View </Link>
            </Button>

            <Button className='col-start-1 col-end-3' >
              <Link to={`/update/${p.id}`} > Update </Link>
            </Button>

            <Button className='col-start-3 col-end-5' onClick={()=>handleDelete(p.id)} >delete</Button>

            
          </div>
        
        ))
        }
      </div>
    </div>
  )
}

export default Products