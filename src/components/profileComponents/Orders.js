import React from "react";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es"; // Importa el idioma español

const Orders = (props) => {
  const { loading, error, orders } = props;
  return (
    <div >
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
              <table className="w-full mt-3">
                <thead className="w-full justify-center items-normal border border-primary rounded-lg">
                  <tr>
                    <th>id</th>
                    <th>status</th>
                    <th>date</th>
                    <th>total</th>
                  </tr>
                </thead>
                {orders.map((order) => (
                  <>
                    <tbody className="w-full justify-center items-normal ">
                      <tr
                      className="font-serif italic"
                         style={{
                          backgroundColor: order.isPaid ? 'lightgreen' : 'red',
                        }}
                        key={order._id}
                      >
                        <td className="p-3 border border-gray-500">
                          <a href={`/order/${order._id}`}>{order._id}</a>
                        </td>
                        <td className="p-3 border border-gray-500">{order.isPaid ? <>Pagado</> : <>No pagado</>}</td>
                        <td className="p-3 border border-gray-500">
                          {order.isPaid
                            ? moment(order.paidAt).locale("es").format("LL")
                            : moment(order.createdAt).locale("es").format("LL")}
                        </td>
                        <td className="p-3 border border-gray-500">{order.totalPrice}</td>
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
