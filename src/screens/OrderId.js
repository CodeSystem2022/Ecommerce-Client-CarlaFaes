import React, { useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import moment from "moment";
import { getOrderDetails } from "../Redux/Actions/OrderAction";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";

const OrderScreen = () => {
  window.scrollTo(0, 0);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { id } = useParams();
  const { order, loading, error } = orderDetails;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

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
  console.log(order.orderItems,"order.itemsPrice",order,"order");
  return (
    <>
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
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
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
              {order.isPaid ? (
                <>
                  <div>Pagado en {moment(order.paidAt.calendar())}</div>
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
              {order.isDelivered ? (
                <>
                  <div>
                    <p>Entregado el {moment(order.deliveredAt).calendar()}</p>
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
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderScreen;
