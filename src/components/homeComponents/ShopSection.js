import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";
import Pagination from "./Pagination";
import { listProduct } from "../../Redux/Actions/ProductActions";

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
      PRODUCTOS
      {products ? (
        products.map((product) => (
          <div key={product.id}>
            <img src={product.image} alt="img_" />
            <p>{product.name}</p>
          </div>
        ))
      ) : (
        <p>no hay</p>
      )}
      <Pagination />
      <Rating />
    </div>
  );
};

export default ShopSection;
