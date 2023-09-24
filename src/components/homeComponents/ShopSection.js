import React,{useEffect, useState} from 'react'
import Rating from './Rating'
import Pagination from './Pagination'
import axios from 'axios'


const ShopSection = () => {
  const [products, setProducts]=useState([]);


  useEffect(()=> {
    const fetchProducts= async()=>{
      const {data}= await axios.get("/api/products");
      //setProducts(data);
      console.log(data)
    }
    fetchProducts();
  },[]);

  return (
    <div>
      PRODUCTOS
        {products? products.map(product =>(
            <div key={product.id}>
                <img src={product.image} alt='img_'/>
                <p>{product.name}</p>
            </div>
        )):<p>no hay</p>}
        <Pagination/>
        <Rating/>
    </div>
  )
}

export default ShopSection