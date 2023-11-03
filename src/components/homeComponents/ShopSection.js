import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";
import Pagination from "./Pagination";
import Loading from'../LoadingError/Loading'
import Message from'../LoadingError/Error'
import { listProduct } from "../../Redux/Actions/ProductActions";
import { Link, useLocation } from "react-router-dom";

const ShopSection = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    // listProduct()
    console.log(productList, "productlist");
    dispatch(listProduct());
  }, []);

  console.log(products, "products");
  return (
    <div>
      {
        loading ? (<Loading/>):
        error?(<Message variant="alert-danger">{error}</Message>):
        (
          <>
          PRODUCTOS
          {products ? (
            products.map((product,index) => (
              <div key={index}>
                <img src={product.image} alt="img_" />
                <Link to={`/product/${product._id}`}>
                <p>{product.name}</p>
                </Link>
              </div>
            ))
          ) : (
            <p>no hay</p>
          )}
          </>
        )  
      }
      <Pagination />
      <Rating />
    </div>
  );
};

export default ShopSection;
