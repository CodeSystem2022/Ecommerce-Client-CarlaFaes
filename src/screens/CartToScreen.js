import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const CartToScreen = () => {
  window.scrollTo(0, 0);
  return (
    <>
      <div>
        <div>
          Total de productos en el carrito
          <Link to="/cart">(4)</Link>
        </div>
        <div>
          <div>
            <i></i>
          </div>
          <div>
            <img
              src="https://d1ih8jugeo2m5m.cloudfront.net/2021/12/ejemplos-de-paginas-web-20-1024x575.jpg"
              alt="nike"
            />
          </div>
          <div>
            <Link to="#">
              <h4>mueble de ejemplo</h4>
            </Link>
          </div>
          <div>
            <h6>cantidad</h6>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
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
      </div>
    </>
  );
};

export default CartToScreen;