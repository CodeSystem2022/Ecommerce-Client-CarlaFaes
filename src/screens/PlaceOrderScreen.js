import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/LoadingError/Error";
import { useNavigate } from "react-router-dom";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";
import { createOrder } from "../Redux/Actions/OrderAction";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const PlaceOrderScreen = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  let history = useNavigate();

  ///calcular precio
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  }; //toma un número (num) como argumento y devuelve ese número redondeado a dos decimales.

  cart.itemsPrice = addDecimal(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  ); //calcula el precio total de los elementos en el carrito de compras, lo redondea a dos decimales y almacena el resultado en la propiedad cart.itemsPrice

  cart.shippingPrice = addDecimal(cart.itemsPrice > 1000 ? 0 : 500); //calcula el precio de envío basado en el precio total de los elementos en el carrito. Si el precio total de los elementos en el carrito es mayor que 1000, el envío es gratuito (0), de lo contrario, se cobra un costo de envío de 500. Se almacena en cart.shippingPrice

  cart.taxPrice = addDecimal(Number((0.15 * cart.itemsPrice).toFixed(2))); // calcula el valor del impuesto como el 15% del precio total de los elementos en el carrito, redondea el resultado a dos decimales y lo almacena en la propiedad cart.taxPrice

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [history, dispatch, success, order]);

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <Header />
      <Container fixed>
        <Box sx={{ bgcolor: "#b3c5cd", minHeight: "100vh" }}>
          <div>
            <div className="flex flex-row justify-center items-center mt-3">
              <p className="font-bold text-xl leading-none text-primary mb-4">
                Detalle de factura
              </p>
            </div>
            <div className="grid grid-cols-3 justify-center items-center">
              <div>
                <h5 className="font-serif text-xl leading-none text-primary mb-4">
                  <strong>Datos del comprador</strong>
                </h5>
                <p className="font-serif italic">
                  Nombre y apellido:{userInfo.name}
                </p>
                <p className="font-serif italic">Email:{userInfo.email}</p>
              </div>
              <div>
                <h5 className="font-serif text-xl leading-none text-primary mb-4">
                  <strong>Informacion de pedido</strong>
                </h5>
                {/* <p>envio: {cart.shippingAddress.country}</p> */}
                <p className="font-serif italic">
                  Metodo de pago:{cart.paymentMethod}
                </p>
              </div>
              <div>
                <h5 className="font-serif text-xl leading-none text-primary mb-4">
                  <strong>Enviar a:</strong>
                </h5>
                <p className="font-serif italic">
                  Direccion: {cart.shippingAddress.address}
                </p>
                <p className="font-serif italic">
                  Localidad: {cart.shippingAddress.city}
                </p>
                <p className="font-serif italic">
                  Codigo Postal: {cart.shippingAddress.postalCode}
                </p>
                <p className="font-serif italic">
                  Pais: {cart.shippingAddress.country}
                </p>
              </div>
            </div>
            <div>
              {cart.cartItems.length < 0 ? (
                <Message variant="alert">
                  {" "}
                  <p className="font-semibold font-[Poppins] text-lg leading-none text-primary">
                    Tu carrito esta vacio
                  </p>
                </Message>
              ) : (
                <>
                  <div className="overflow-y-auto h-72">
                    {cart.cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="grid mb-2 sm:grid-cols-1 md:grid-cols-1"
                      >
                        <div className="flex flex-row justify-evenly items-center">
                          <div>
                            <img
                              className="max-w-20 max-h-36 rounded-full mx-1"
                              src={item.image}
                              alt={item.name}
                            />
                          </div>
                          <div className="flex flex-col items-center justify-evenly h-full">
                            <Link to={`/products/${item.product}`}>
                              <h5 className="font-serif italic">{item.name}</h5>
                            </Link>
                            <div>
                              <p className="font-serif italic">
                                Cantidad: {item.qty}
                              </p>
                            </div>
                            <div>
                              <p className="font-serif italic">
                                Subtotal: {item.qty * item.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div>
              {/* total */}
              <table className="w-full mt-3">
                <tbody className="w-full justify-center items-normal ">
                  <tr className="border border-primary">
                    <td>
                      <strong className="font-serif text-xl leading-none text-primary mb-4">
                        Productos:
                      </strong>
                    </td>
                    <td className="font-serif italic font-lg">
                      ${cart.itemsPrice}
                    </td>
                  </tr>
                  <tr className="border border-primary">
                    <td>
                      <strong className="font-serif text-xl leading-none text-primary mb-4">
                        Envio:
                      </strong>
                    </td>
                    <td>
                      <p className="font-serif italic font-lg">
                        ${cart.shippingPrice}
                      </p>
                    </td>
                  </tr>
                  <tr className="border border-primary">
                    <td>
                      <strong className="font-serif text-xl leading-none text-primary mb-4">
                        Impuesto:
                      </strong>
                    </td>
                    <td className="font-serif italic font-lg">
                      ${cart.taxPrice}
                    </td>
                  </tr>
                  <tr className="border border-primary">
                    <td>
                      <strong className="font-serif text-xl leading-none text-primary mb-4">
                        Total:
                      </strong>
                    </td>
                    <td className="font-serif italic font-lg">
                      ${cart.totalPrice}
                    </td>
                  </tr>
                </tbody>
              </table>
              {cart.cartItems.length === 0 ? null : (
                <div className="flex flex-row justify-center items-center mt-4">
                  <Button
                    type="submit"
                    onClick={placeOrderHandler}
                    variant="outlined"
                  >
                    Realizar pedido
                  </Button>
                </div>
              )}
              {error && (
                <>
                  <Message variant="alert-danger">{error}</Message>
                </>
              )}
            </div>
          </div>
        </Box>
      </Container>
    </>
  );
};
export default PlaceOrderScreen;
