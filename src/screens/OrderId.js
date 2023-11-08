import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import moment from "moment";
import "moment/locale/es"; // Importa el idioma español
import { getOrderDetails, payOrder } from "../Redux/Actions/OrderAction";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import { ORDER_PAY_RESET } from "../Redux/Constants/OrderConstants";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const OrderId = () => {
  window.scrollTo(0, 0);
  const orderDetails = useSelector((state) => state.orderDetails);
  const [sdkReady, setSdkReady] = useState(false);
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  const { id } = useParams();
  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();
  const [isPaid, setIsPaid] = useState(false); // Agrega un estado isPaid
  const ref = useRef(false);

  useEffect(() => {
    const fetchPaypalClientId = async () => {
      try {
        const { data: clientId } = await axios.get("/api/config/paypal");
        console.log(clientId, "clientid");
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.async = true;
        script.onload = () => {
          setSdkReady(true);
          console.log("Sdk ready", sdkReady);
        };
        // Configurar un evento de error para el script
        script.onerror = () => {
          setSdkReady(true); // En caso de error al cargar el script, también marca sdkReady como true
        };
        document.body.appendChild(script);
      } catch (error) {
        console.log("Error al obtener el clientId de PayPal");
        setSdkReady(true);
      }
    };
    if (id) {
      if (!order || successPay) {
        console.log("se ejecuta primer if");
        dispatch({ type: ORDER_PAY_RESET });
        dispatch(getOrderDetails(id));
      } else if (!order.isPaid && !sdkReady) {
        console.log("se ejecuta segundo if");
        fetchPaypalClientId();
        setSdkReady(true);
        console.log("sdkREady", sdkReady);
      }
    }
  }, [dispatch, id, successPay, order, sdkReady]);

  // useEffect(() => {
  //   if (order) {
  //     if (order.isPaid) {
  //       console.log("se ejecuta se useRef", ref.current);
  //       ref.current = true;
  //       setIsPaid(true);
  //       console.log("isPaid", ref.current,isPaid);
  //     }
  //   }
  // }, [order,isPaid]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult, "payment");
    dispatch(payOrder(id, paymentResult));
    renderer()
  };
  if (order) {
    const addDecimal = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimal(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  } else {
    return <Loading />;
  }
  const renderer= (order)=>{
    if (order) {
      if (order.isPaid) {
        console.log("se ejecuta se useRef", ref.current);
        ref.current = true;
        setIsPaid(true);
        console.log("isPaid", ref.current,isPaid);
      }
    }
  }
  console.log("orderpay", orderPay);
  console.log("order", order);
  console.log("succes", orderPay.success);

  return (
    <>
      <PayPalScriptProvider
        options={{
          clientId:
            "AVrcnJr0-ydoHXt5zCcQW-7qMAqsfFfyB9LvH1r5ql-qk9T-NIVAa6274hkIBnW9oGsgDl0Sd4YHvxTY",
        }}
      >
        <Header />
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div>
              <div>
                <i>icono</i>
              </div>
              <div>
                <div>
                  <h5>
                    {" "}
                    <strong>Cliente:</strong>
                  </h5>
                  <p>{order.user.name}</p>
                  <p>
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                </div>
                <div>
                  <h5>
                    <strong>Datos de envio:</strong>
                  </h5>
                  <p>Direccion: {order.shippingAddress.address}</p>
                  <p>Localidad: {order.shippingAddress.city}</p>
                  <p>Codigo Postal: {order.shippingAddress.postalCode}</p>
                  <p>Pais: {order.shippingAddress.country}</p>
                </div>
                <div>
                  <h5>
                    <strong>Metodo de pago:</strong>
                  </h5>
                  <p>{order.paymentMethod}</p>
                </div>
                {order && order.isPaid ? (
                  <>
                    <div>
                      Pagado en {moment(order.paidAt).locale("es").format("LL")}
                    </div>
                  </>
                ) : (
                  <>
                    <div>No pagado</div>
                  </>
                )}
              </div>

              <div>
                <h5>
                  <strong>Estado de entrega de envio:</strong>
                </h5>
                {order && order.isDelivered ? (
                  <>
                    <div>
                      <p>
                        Entregado el{" "}
                        {moment(order.deliveredAt).locale("es").format("LL")}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p>No entregado</p>
                    </div>
                  </>
                )}
              </div>
              <div>
                {order.orderItems.length === 0 ? (
                  <>
                    <div>
                      <Message>No hay ningun pedido</Message>
                    </div>
                  </>
                ) : (
                  <>
                    {order.orderItems.map((item, index) => (
                      <div key={index}>
                        <div>
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div>
                          <Link to={`/products/${item.product}`}>
                            <p>{item.name}</p>
                          </Link>
                        </div>
                        <div>
                          <p>Cantidad:{item.qty}</p>
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
                      <td>${order.itemsPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Envio</strong>
                      </td>
                      <td>
                        <p>${order.shippingPrice}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Impuesto</strong>
                      </td>
                      <td>${order.taxPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td>${order.totalPrice}</td>
                    </tr>
                  </tbody>
                </table>
                <PayPalButtons
                  style={{
                    color: "silver",
                    layout: "vertical",
                    shape: "pill",
                  }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          description: order.orderItems
                            .map((item) => item.name)
                            .join(", "),
                          amount: { value: order.totalPrice },
                        },
                      ],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log("order capture", order);
                    successPaymentHandler(data);
                  }}
                />
              </div>
            </div>
          </>
        )}
      </PayPalScriptProvider>
    </>
  );
};

export default OrderId;
