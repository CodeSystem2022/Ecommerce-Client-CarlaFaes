import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";
import Pagination from "./Pagination";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { listProduct } from "../../Redux/Actions/ProductActions";
import { Link, useLocation } from "react-router-dom";

const ShopSection = (props) => {
  const { keywords, pageNumber } = props;
  console.log(keywords, "keyword");
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
 console.log(page,pages);
  useEffect(() => {
    // listProduct()
    //console.log(productList, "productlist");
    dispatch(listProduct(keywords, pageNumber));
  }, [keywords, dispatch, pageNumber]);

  console.log(products, "products");
  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          PRODUCTOS
          {products ? (
            products.map((product, index) => (
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
      )}
      
      <Pagination
        pages={pages}
        page={page}
        keywords={keywords ? keywords : ""}
      />
      <Rating />
    </div>
  );
};

export default ShopSection;
