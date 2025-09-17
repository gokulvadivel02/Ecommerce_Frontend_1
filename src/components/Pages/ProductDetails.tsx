import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
    const params = useParams<{id :string }>() ;
    const id = params.id ;

    useEffect(()=>{
        const getProductById = async()=>{
            const response = await fetch(`http://localhost:8080/shop/productById/${id}`,{
                method : "GET"
            })
            const data = await response.json() ;
            console.log(data) ;
        }
        getProductById() ;
    },[id])
  return (
    <div>ProductDetails</div>
  )
}

export default ProductDetails