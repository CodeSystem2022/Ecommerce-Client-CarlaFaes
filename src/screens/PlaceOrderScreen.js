import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/LoadingError/Error";
import { useNavigate } from "react-router-dom";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";
import { createOrder } from "../Redux/Actions/OrderAction";

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
      <div>
        <div>
          <div>
            <i></i>
          </div>
          <div>
            <h5>
              <strong>Datos del comprador</strong>
            </h5>
            <p>Nombre y apellido:{userInfo.name}</p>
            <p>Email:{userInfo.email}</p>
          </div>
          <div>
            <h5>
              <strong>Informacion de pedido</strong>
            </h5>
            {/* <p>envio: {cart.shippingAddress.country}</p> */}
            <p>Metodo de pago:{cart.paymentMethod}</p>
          </div>
        </div>
        <div>
          <div>
            <h5>
              <strong>Enviar a:</strong>
            </h5>
            <p>Direccion: {cart.shippingAddress.address}</p>
            <p>Localidad: {cart.shippingAddress.city}</p>
            <p>Codigo Postal: {cart.shippingAddress.postalCode}</p>
            <p>Pais: {cart.shippingAddress.country}</p>
          </div>
        </div>
        <div>
          {cart.cartItems.length < 0 ? (
            <Message variant="alert">Tu carrito esta vacio</Message>
          ) : (
            <>
              {cart.cartItems.map((item, index) => (
                <div key={index}>
                  <div>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div>
                    <Link to={`/products/${item.product}`}>
                      <h5>{item.name}</h5>
                    </Link>
                  </div>
                  <div>
                    <p>cantidad: {item.qty}</p>
                  </div>
                  <div>
                    <p>subtotal: {item.qty * item.price}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div>
          {/* total */}
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Productos</strong>
                </td>
                <td>${cart.itemsPrice}</td>
              </tr>
              <tr>
                <td>
                  <strong>Envio</strong>
                </td>
                <td>
                  <p>${cart.shippingPrice}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Impuesto</strong>
                </td>
                <td>${cart.taxPrice}</td>
              </tr>
              <tr>
                <td>
                  <strong>Total</strong>
                </td>
                <td>${cart.totalPrice}</td>
              </tr>
            </tbody>
          </table>
          {cart.cartItems.length === 0 ? null : (
            <button type="submit" onClick={placeOrderHandler}>
              Realizar pedido
            </button>
          )}
          {error && (
            <>
              <Message variant="alert-danger">{error}</Message>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default PlaceOrderScreen;
