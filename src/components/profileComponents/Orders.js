import React from "react";

const Orders = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
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
          <tbody>
            <tr>
                <td>
                    <a href="/">1</a>
                </td>
                <td>pagar</td>
                <td>fecha</td>
                <td>$$$</td>
            </tr>
            {/* cancelar*/}
            <tr>
                <td>
                    <a href="/">
                        2
                    </a>
                </td>
                <td>no pagar</td>
                <td>fecha</td>
                <td>$$</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
