import React, { useEffect } from "react";
import Header from "../components/Header";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../Redux/Actions/CartAction";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { FaWindowClose } from "react-icons/fa";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import compras from "../utils/carritocart.png";

const CartToScreen = () => {
  window.scrollTo(0, 0);
  const { id } = useParams();
  console.log(id, "Cart id");
  const location = useLocation();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  let history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo, "userInfo");
  const dynamicHeigth = "100%";
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems,'cartItem')

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
      console.log(cartItems, "cartItems checkOutHandler");
      history("/shipping");
    }
  };

  const removeFromCartHandler = (id, e) => {
    // e.preventDefault();
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <div>
        <Header />
        <Container fixed>
          <Box
            sx={{
              bgcolor: "#b3c5cd",
              height: dynamicHeigth,
              minHeight: "100vh",
            }}
          >
            {cartItems.length === 0 ? (
              <div className="flex flex-col justify-center items-center">
                <div>
                  <img src={compras} alt="compras" width="400" />
                </div>
                <div>
                  <p className="font-semibold font-[Poppins] text-lg leading-none text-primary">
                    Tu carrito esta vacio
                  </p>
                  <Link
                    className="font-semibold font-[Poppins] text-lg leading-none text-cyan-900"
                    to="/"
                  >
                    Ir a comprar
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col justify-start items-start">
                  <p className="font-bold text-xl leading-none text-primary">
                    Total de productos en el carrito:
                  </p>
                  <Link
                    to="/cart"
                    className="w-full mb-3 font-bold text-md leading-none text-primary"
                  >
                    {cartItems.length}
                  </Link>
                </div>
                <div className="overflow-y-auto h-96">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="grid mb-2 sm:grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center w-2/3"
                  >
                    <div className="flex flex-row items-start justify-center">
                      <button
                        key={item._id}
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <FaWindowClose className="w-5 text-red-500" />
                      </button>
                      <img
                        className="max-w-20 max-h-48 rounded-md mx-3"
                        src={item.image}
                        alt={cartItems.name}
                      />
                    </div>
                    <div className="flex flex-col items-center justify-evenly h-full">
                      <div>
                        <Link to={`/product/${item.product}`}>
                          <h4 className="w-full mb-3 font-normal font-[Poppins] text-lg leading-none text-primary">
                            {item.name}
                          </h4>
                        </Link>
                      </div>

                      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-3">
                        <div>
                          <h6 className="w-full mb-3 font-normal font-[Poppins] text-lg leading-none text-primary">
                            Cantidad:
                          </h6>
                          
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={item.qty}
                              label={item.qty}
                              onChange={(e) =>
                                dispatch(
                                  addToCart(
                                    item.product,
                                    Number(e.target.value)
                                  )
                                )}>
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <MenuItem key={item._id} value={x + 1}>
                                  {x + 1} u.
                                </MenuItem>
                              ))}
                            </Select>
                          
                        </div>
                        <div>
                          <h6 className="w-full mb-3 font-normal font-[Poppins] text-lg leading-none text-primary">
                            Precio:{" "}
                          </h6>
                          <h4 className="w-full mb-3 font-semibold font-[Poppins] text-lg leading-none text-primary">
                            ${item.price}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
                {/*find de los items del carrito*/}
                <div className="bg-red-200 relative">
                  <div className="object-bottom inset-x-0 bottom-0">
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
                  <div>
                    {total > 0 && (
                      <div>
                        <button onClick={() => checkOutHandler()}>
                          Ir a pagar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                  </div>
               
                </div>
              </>
            )}
          </Box>
        </Container>
      </div>
    </>
  );
};

export default CartToScreen;
