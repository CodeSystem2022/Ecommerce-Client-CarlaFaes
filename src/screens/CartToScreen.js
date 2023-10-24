import React, { useEffect } from "react";
import Header from "../components/Header";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/Actions/CartAction";

const CartToScreen = () => {
  window.scrollTo(0, 0);
  const { id } = useParams();
  const location = useLocation();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    } else {
      console.log("error en cartToScreen");
    }
  }, [dispatch, id, qty]);
  return (
    <>
      <div>
        {cartItems.length === 0 ? (
          <div>
            Tu carrito esta vacio
            <Link to="/">Ir a comprar</Link>
          </div>
        ) : (
          <>
            <div>
              Total de productos en el carrito
              <Link to="/cart">{cartItems.length}</Link>
            </div>
            {cartItems.map((item) => (
              <>
                <div>
                  <div>
                    <img src={item.image} alt={cartItems.name} />
                  </div>
                  <div>
                    <Link to={`/product/${item.product}`}>
                      <h4>{item.name}</h4>
                    </Link>
                  </div>
                  <div>
                    <h6>cantidad</h6>
                  </div>
                  <div>
                    <h6>subtotal</h6>
                    <h4>$$$</h4>
                  </div>

                  {/*find de los items del carrito*/}
                  <div>
                    <span>total:</span>
                    <span>$567</span>
                  </div>
                  <hr />
                  <div>
                    <button>
                      <Link to="/shipping">pagar</Link>
                    </button>
                  </div>
                </div>
              </>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default CartToScreen;
