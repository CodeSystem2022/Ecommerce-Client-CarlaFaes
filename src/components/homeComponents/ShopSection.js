import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import {
  listProduct,
  sortProducts,
  sortProductsByPrice,
} from "../../Redux/Actions/ProductActions";
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import isEqual from "lodash/isEqual";
import { selectCombinedProducts } from "../selectors.js";
import { productListReducer } from "../../Redux/Reducers/ProductsReducer.js";

const ShopSection = (props) => {
  const { keywords, pageNumber, sortOptions } = props;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const sortOrder = useSelector((state) => state.sortOrder);
  console.log(sortOrder, "sortorder de shop");

  useEffect(() => {
    dispatch(listProduct(keywords, pageNumber));
    dispatch(sortProducts(sortOptions));
  }, [keywords, dispatch, pageNumber, sortOptions]);

  console.log(products, "products");
  return (
    <div className="">
      <Container fixed>
        <Box sx={{ bgcolor: "#b3c5cd" }}>
          <h5 className="flex flex-row justify-center text-primary w-full text-lg font-bold">
            CATALOGO DE PRODUCTOS
          </h5>
          <div className="bg-red-500 grid grid-cols-4">
            <div className="col-start-1 col-span-1 h-full mr-5 px-3">
              <PrimarySearchAppBar
                onSort={(sortBy, sortOrder) =>
                  dispatch(sortProducts({ sortBy, sortOrder }))
                }
              />
            </div>
            <div className="grid col-start-2 col-span-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 text-secondary ">
              {loading ? (
                <Loading />
              ) : error ? (
                <Message variant="alert-danger">{error}</Message>
              ) : sortOrder.sortOptions !== null &&
                sortOrder.sortOptions.sortBy === "name" &&
                sortOrder.sortOptions.sortOrder === "asc" ? (
                <>
                  {sortOrder.products.map((product, index) => (
                    <div className="container font-serif w-full h-full shadow-md rounded-xl">
                      <Link to={`/product/${product._id}`}>
                        <div
                          key={index}
                          className="relative rounded-lg max-w-full bg-primary h-full"
                        >
                          <div className="w-full  relative">
                            <img
                              className="w-full rounded-t-md h-2/4"
                              loading="lazy"
                              src={product.image}
                              alt="img_"
                            />
                          </div>
                          <div className="flex flex-col justify-center items-cente sm:text-lg md:text-xl">
                            <p className="w-full flex-none mb-3  leading-none text-secondary">
                              {product.name}
                            </p>
                            <p>${product.price}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </>
              ) : sortOrder.sortOptions !== null &&
                sortOrder.sortOptions.sortBy === "name" &&
                sortOrder.sortOptions.sortOrder === "desc" ? (
                <>
                  {sortOrder.products.map((product, index) => (
                    <div className="container font-serif w-full h-full shadow-md rounded-xl">
                      <Link to={`/product/${product._id}`}>
                        <div
                          key={index}
                          className="relative rounded-lg max-w-full bg-primary h-full"
                        >
                          <div className="w-full  relative">
                            <img
                              className="w-full rounded-t-md h-2/4"
                              loading="lazy"
                              src={product.image}
                              alt="img_"
                            />
                          </div>
                          <div className="flex flex-col justify-center items-cente sm:text-lg md:text-xl">
                            <p className="w-full flex-none mb-3  leading-none text-secondary">
                              {product.name}
                            </p>
                            <p>${product.price}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </>
              ) : sortOrder.sortOptions !== null &&
                sortOrder.sortOptions.sortBy === "price" &&
                sortOrder.sortOptions.sortOrder === "desc" ? (
                <>
                  {sortOrder.products.map((product, index) => (
                    <div className="container font-serif w-full h-full shadow-md rounded-xl">
                      <Link to={`/product/${product._id}`}>
                        <div
                          key={index}
                          className="relative rounded-lg max-w-full bg-primary h-full"
                        >
                          <div className="w-full  relative">
                            <img
                              className="w-full rounded-t-md h-2/4"
                              loading="lazy"
                              src={product.image}
                              alt="img_"
                            />
                          </div>
                          <div className="flex flex-col justify-center items-cente sm:text-lg md:text-xl">
                            <p className="w-full flex-none mb-3  leading-none text-secondary">
                              {product.name}
                            </p>
                            <p>${product.price}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </>
              ) : sortOrder.sortOptions !== null &&
                sortOrder.sortOptions.sortBy === "price" &&
                sortOrder.sortOptions.sortOrder === "asc" ? (
                <>
                  {sortOrder.products.map((product, index) => (
                    <div className="container font-serif w-full h-full shadow-md rounded-xl">
                      <Link to={`/product/${product._id}`}>
                        <div
                          key={index}
                          className="relative rounded-lg max-w-full bg-primary h-full"
                        >
                          <div className="w-full  relative">
                            <img
                              className="w-full rounded-t-md h-2/4"
                              loading="lazy"
                              src={product.image}
                              alt="img_"
                            />
                          </div>
                          <div className="flex flex-col justify-center items-cente sm:text-lg md:text-xl">
                            <p className="w-full flex-none mb-3  leading-none text-secondary">
                              {product.name}
                            </p>
                            <p>${product.price}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {products ? (
                    products.map((product, index) => (
                      <div className="container font-serif w-full h-full shadow-md rounded-xl">
                        <Link to={`/product/${product._id}`}>
                          <div
                            key={index}
                            className="relative rounded-lg max-w-full bg-primary h-full"
                          >
                            <div className="w-full  relative">
                              <img
                                className="w-full rounded-t-md h-2/4"
                                loading="lazy"
                                src={product.image}
                                alt="img_"
                              />
                            </div>
                            <div className="flex flex-col justify-center items-cente sm:text-lg md:text-xl">
                              <p className="w-full flex-none mb-3  leading-none text-secondary">
                                {product.name}
                              </p>
                              <p>${product.price}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <Loading />
                  )}
                </>
              )}
            </div>
          </div>
          <Pagination
            pages={pages}
            page={page}
            keywords={keywords ? keywords : ""}
          />
        </Box>
      </Container>
    </div>
  );
};
export default ShopSection;
