import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import axios from "axios";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetail } from "../Redux/Actions/ProductActions";
import { useNavigate } from "react-router-dom";

const SingleProduct = ({ match }) => {
  //const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const productId = useParams();
  const productsDetail = useSelector((state) => state.productsDetail);
  const { loading, error, product } = productsDetail;
  let history = useNavigate();

  useEffect(() => {
    dispatch(listProductDetail(productId));
  }, [dispatch, productId]);
  console.log(productId.id, "productId");

  const AddToCartHandle = (e) => {
    e.preventDefault();
    history(`/cart/${productId.id}?qty=${qty}`);
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
                  <select value={qty} onChange={(e)=>setQty(e.target.value)}>
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
              <h6>Reviews</h6>
              <Message variant={"alert alert-info mt-3"}>No reviews</Message>
              <div>
                <strong>Admin Doe</strong>
                <Rating />
                <span>19 septiembre 2023</span>
                <div>lorem Ipsum lorem</div>
              </div>
            </div>
            <div>
              <h6>escribe una breve opinion del producto</h6>
            </div>
            <form>
              <div>
                <strong>Rating</strong>
                <select>
                  <option>seleccionar..</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
              <div>
                <strong>comentarios</strong>
                <textarea></textarea>
              </div>
              <div>
                <button>submit</button>
              </div>
            </form>
            <div>
              <Message variant={"alert-warning"}>
                {" "}
                Por favor <Link to="/login"> inicie sesion</Link> para escribir
                una opinion
              </Message>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleProduct;
