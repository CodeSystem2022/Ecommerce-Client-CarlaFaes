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
  console.log(page, pages);
  useEffect(() => {
    // listProduct()
    //console.log(productList, "productlist");
    dispatch(listProduct(keywords, pageNumber));
  }, [keywords, dispatch, pageNumber]);

  console.log(products, "products");
  return (
    <div className="container mx-auto">
     <h5 className="flex flex-row justify-center text-primary w-full text-lg font-bold">CATALOGO DE PRODUCTOS</h5> 
      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 shadow  text-secondary p-5 w-full left-0 ">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            {products ? (
              products.map((product, index) => (
                <div className=" font-serif  bg-[#2f4556] w-full shadow-md rounded-xl">
                  <Link to={`/product/${product._id}`}>
                  <div
                    key={index}
                    className="grid grid-cols-2 max-w-full"
                  >
                    <div className="mr-2 w-52 h-52 relative">
                    <img className="w-full h-full rounded-lg" loading="lazy" src={product.image} alt="img_" />
                    </div>
                    <div className="flex flex-col justify-evenly items-center pl-4 sm:text-lg md:text-xl">
                      <p className="w-full flex-none mb-3  leading-none text-secondary">{product.name}</p>
                    <p>
                      ${product.price}
                    </p>
                    </div>
                  </div>
                    </Link>
                </div>
              ))
            ) : (
              <p>no hay</p>
            )}
          </>
        )}
      </div>
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
