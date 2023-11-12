import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/es"; // Importa el idioma español
import Header from "../components/Header";
import Ratings from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  listProductDetail,
} from "../Redux/Actions/ProductActions";
import { useNavigate } from "react-router-dom";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductsConstants";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { TextareaAutosize } from "@mui/material";

const SingleProduct = () => {
  //const [product, setProduct] = useState({});
  let history = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const productId = useParams();
  const productsDetail = useSelector((state) => state.productsDetail);
  const { loading, error, product } = productsDetail;
  console.log(product, "product");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productReviewCreate;
  console.log(productReviewCreate, "productReviewCreate");
  useEffect(() => {
    if (successCreateReview) {
      alert("review enviada");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetail(productId));
  }, [dispatch, productId, successCreateReview]);
  console.log(productId.id, "productId");

  const AddToCartHandle = (e) => {
    e.preventDefault();
    history(`/cart/${productId.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(productId.id, { rating, comment }));
  };
  return (
    <>
      <Header />
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-info">{error}</Message>
      ) : (
        <>
          <div className="container top-0 left-0">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 m-4">
              <div>
                <div className="flex flex-row justify-center items-center">
                  <img
                    className="w-2/3 h-96 rounded-lg shadow-xl"
                    src={product.image}
                    alt={product.name}
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col items-center justify-center p-3 m-2">
                  <h5 className="w-full mb-3 font-bold text-2xl leading-none text-primary">
                    {product.name}
                  </h5>
                  <p className="w-full mb-3 font-normal font-[Poppins] text-lg leading-none text-primary">
                    {product.description}
                  </p>
                </div>
                <div>
                  <div className="flex flex-col justify-start items-start">
                    <div>
                      <h6 className="w-full mb-3 font-semibold font-[Poppins] text-lg leading-none text-primary">
                        Precio: <span>${product.price}</span>
                      </h6>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full ">
                      {product.countInStock > 0 ? (
                        <>
                          <div>
                            <h6 className="w-full mb-3 font-semibold font-[Poppins] text-lg leading-none text-primary">
                              Cantidad
                            </h6>
                            <select
                              className="border border-solid border-primary rounded-lg w-full py-2 mb-4 font-semibold font-[Poppins] text-lg leading-none text-primary"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option
                                    className="font-semibold font-[Poppins] text-lg
                                   text-primary"
                                    key={x + 1}
                                    value={x + 1}
                                  >
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <button
                            className="hover:bg-slate-600 border border-solid p-2 bg-primary border-secondary rounded-lg w-auto py-2 mb-4 font-normal font-[Poppins] text-lg leading-none text-secondary"
                            onClick={AddToCartHandle}
                          >
                            Agregar al carrito
                          </button>
                        </>
                      ) : (
                        "No disponible"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container grid md:grid-cols-2 w-full justify-center">
              <div className="">
                <div>
                  <div>
                    <h6 className="w-full mb-3 font-semibold font-[Poppins] text-lg leading-none text-primary">
                      Opiniones del producto
                    </h6>
                  </div>
                </div>
                {product.reviews.length === 0 && (
                  <Message
                    variant={"alert alert-info mt-3"}
                    className="w-full mb-3 font-normal font-[Poppins] text-lg leading-none text-primary"
                  >
                    Este producto aun no tiene reseñas
                  </Message>
                )}
                {product.reviews?.map((review) => (
                  <div className="grid grid-rows-3 w-full " key={review._id}>
                    <div className="w-full flex flex-row justify-evenly items-center">
                      <h6 className="text-lg font-[Poppins] font-semibold px-2">
                        {review.name}
                      </h6>
                      <Ratings value={review.rating} />
                    </div>
                    <div>
                      <span className="font-normal font-[Poppins] text-md leading-none text-primary">
                        {moment(review.createdAt).locale("es").format("LL")}
                      </span>
                    </div>
                    <div>
                      <p className="w-full mb-3 font-semibold font-[Poppins] text-lg leading-none text-primary">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1">
                <div>
                  <strong className="w-full mb-3 font-semibold font-[Poppins] text-lg leading-none text-primary">
                    Escribe una breve opinion del producto
                  </strong>
                  {loadingCreateReview && <Loading />}
                  {errorCreateReview && <Message>{errorCreateReview}</Message>}
                </div>
                <div>
                  {userInfo ? (
                    <>
                      <form onSubmit={submitHandler}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Puntuar
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={rating}
                            label="Puntaje"
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <MenuItem value={1}>1 - Malo</MenuItem>
                            <MenuItem value={2}>2 - Regular</MenuItem>
                            <MenuItem value={3}>3 - Bueno</MenuItem>
                            <MenuItem value={4}>4 - Muy Bueno</MenuItem>
                            <MenuItem value={5}>5 - Excelente</MenuItem>
                          </Select>
                          <TextareaAutosize
                            rowsMin={3}
                            placeholder="Escribe tu comentario aquí"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <Button
                            type="submit"
                            variant="outlined"
                            disabled={loadingCreateReview}
                          >
                            Enviar
                          </Button>
                        </FormControl>
                      </form>
                    </>
                  ) : (
                    <>
                      <div>
                        <Message variant={"alert-warning"}>
                          {" "}
                          Por favor <Link to="/login"> inicie sesion</Link> para
                          escribir una opinion
                        </Message>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleProduct;
