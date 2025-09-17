import React from 'react'

interface Props{
  productName : string,
  brand : string,
  category : string ,
  Description : string,
  Price : number ,
  imageType : string,
  imageUrl : string ,
  productAvailable : boolean ,
  imageName : string ,
  id : number
}

interface products {
  product : Props[]
  error : Error | null 
  // error : boolean
}

const Cart:React.FC<products>= ({ product, error}) => {
  console.log(product) ;
  console.log(error)
  return (
    <div>
      <h1 className='text-9xl' >hello this is cart </h1>
      <h1>{error? error.message : null}</h1>
      <h1>{error?.message}</h1>
    </div>
  )
}

export default Cart