import React from "react";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es"; // Importa el idioma español

const Orders = (props) => {
  const { loading, error, orders } = props;
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      {loading ? (
        <Loading />
      ) : error ? (
        <Message />
      ) : (
        <>
          {orders.length === 0 ? (
            <>
              <p>No hay pedidos</p>
              <Link to="/">Ir a comprar</Link>
            </>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>status</th>
                    <th>date</th>
                    <th>total</th>
                  </tr>
                </thead>
                {orders.map((order) => (
                  <>
                    <tbody>
                      <tr
                         style={{
                          backgroundColor: order.isPaid ? 'green' : 'red',
                        }}
                        key={order._id}
                      >
                        <td>
                          <a href={`/order/${order._id}`}>{order._id}</a>
                        </td>
                        <td>{order.isPaid ? <>Pagado</> : <>No pagado</>}</td>
                        <td>
                          {order.isPaid
                            ? moment(order.paidAt).locale("es").format("LL")
                            : moment(order.createdAt).locale("es").format("LL")}
                        </td>
                        <td>{order.totalPrice}</td>
                      </tr>
                    </tbody>
                  </>
                ))}
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
