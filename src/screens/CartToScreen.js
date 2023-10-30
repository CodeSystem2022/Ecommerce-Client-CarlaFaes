import React, { useEffect } from "react";
import Header from "../components/Header";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../Redux/Actions/CartAction";
import { useNavigate } from "react-router-dom";

const CartToScreen = () => {
  window.scrollTo(0, 0);
  const { id } = useParams();
  console.log(id, "Cart id")
  const location = useLocation();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  let history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  console.log(userInfo,'userInfo')

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  //console.log(cartItems,'cartItem')

  //total:suma los valores de todos los elementos en el carrito de compras, teniendo en cuenta la cantidad y el precio de cada elemento, y devuelve el resultado con dos decimales como una cadena de texto. El resultado se almacena en la variable total.
  const total = cartItems
    .reduce((ttl, item) => ttl + item.qty * item.price, 0)
    .toFixed(2);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    } else {
      console.log("error en cartToScreen");
    }
  }, [dispatch, id, qty]);

  const checkOutHandler = () => {
    if (!userInfo) {
      console.log("No se redirigió porque el carrito está vacío");
    } else {
      console.log(cartItems, 'cartItems checkOutHandler')
      history("/shipping");
    }
  };

  const removeFromCartHandler = (id,e) => {
   // e.preventDefault();
    dispatch(removeFromCart(id));
  };

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
                    <button key={item._id} onClick={() => removeFromCartHandler(item.product)}>
                      x
                    </button>
                  </div>
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
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={item.id} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <h6>Precio</h6>
                    <h4>${item.price}</h4>
                  </div>
                </div>
              </>
            ))}
                   {/*find de los items del carrito*/}
                   <div>
                    <span>Total:</span>
                    <span>${total}</span>
                  </div>
                  <hr />
                  <div>
                    <div>
                      <button>
                        <Link to="/">Continuar comprando</Link>
                      </button>
                    </div>
                    {" continuous"}
                    <div>
                    {total > 0 && (
                      <div>
                        <button onClick={()=>checkOutHandler()}>Ir a pagar</button>
                      </div>
                    )}
                    </div>
                  </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartToScreen;
