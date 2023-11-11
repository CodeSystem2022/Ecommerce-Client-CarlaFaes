import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/es"; // Importa el idioma español
import Header from "../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createProductReview, listProductDetail } from "../Redux/Actions/ProductActions";
import { useNavigate } from "react-router-dom";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductsConstants";

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
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  console.log(productReviewCreate,"productReviewCreate")
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productReviewCreate;
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

  const submitHandler= (e) => {
    e.preventDefault();
    dispatch(createProductReview(productId.id,{rating,comment}))
  }
  return (
    <>
      <Header />
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-info">{error}</Message>
      ) : (
        <>
          <div>
            <div>
              <div>
                <img src={product.image} alt={product.name} />
              </div>
            </div>
            <div>
              <div>
                <div>{product.name}</div>
              </div>
            </div>
            <p>{product.description}</p>
            <div>
              <div>
                <h6>Precio</h6>
                <span>${product.price}</span>
              </div>
            </div>
            <div>
              <h6>Reviews</h6>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </div>
            {product.countInStock > 0 ? (
              <>
                <div>
                  <h6>Cantidad</h6>
                  <select value={qty} onChange={(e) => setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <button onClick={AddToCartHandle}>agregar al carrito</button>
              </>
            ) : null}
          </div>
          {/* Rating */}
          <div>
            <div>
              <h6>Reseñas</h6>
              {product.reviews.length === 0 && (
                <Message variant={"alert alert-info mt-3"}>
                  Este producto aun no tiene reseñas
                </Message>
              )}
              {product.reviews?.map((review) => (
                <div key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <span>
                    {moment(review.createdAt).locale("es").format("LL")}
                  </span>
                  <div>
                    <p>{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <strong>Escribe una breve opinion del producto</strong>
              <div>
                {loadingCreateReview && <Loading />}
                {errorCreateReview && <Message>{errorCreateReview}</Message>}
              </div>
            </div>
            {userInfo  ? (
              <form onSubmit={submitHandler}>
                <div>
                  <h5>Rating</h5>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">seleccionar..</option>
                    <option value="1">1 - Malo</option>
                    <option value="2">2 - Regular</option>
                    <option value="3">3 - Bueno</option>
                    <option value="4">4 - Muy Bueno</option>
                    <option value="5">5 - Excelente</option>
                  </select>
                </div>
                <div>
                  <strong>comentarios</strong>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <button disabled={loadingCreateReview}>Enviar</button>
                </div>
              </form>
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
        </>
      )}
    </>
  );
};

export default SingleProduct;
