import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CartToScreen from "./screens/CartToScreen";
import ShippingScreen from "./screens/ShippingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";
import OrderId from "./screens/OrderId";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "./index.css";

function App() {
  return (
    <div>
      {/* <PayPalScriptProvider options={{"client-id":"AVrcnJr0-ydoHXt5zCcQW-7qMAqsfFfyB9LvH1r5ql-qk9T-NIVAa6274hkIBnW9oGsgDl0Sd4YHvxTY"}}>  */}
      <BrowserRouter>
        <Routes>
          <Route path="/profile" Component={ProfileScreen} />
          <Route path="/login" Component={Login} />
          <Route path="/" Component={HomeScreen} exact />
          <Route path="/search/:keywords" Component={HomeScreen} exact />
          <Route
            path="/search/:keywords/page/:pageNumber"
            Component={HomeScreen}
            exact
          />
          <Route path="/page/:pageNumber" Component={HomeScreen} exact />
          <Route path="/product/:id" Component={SingleProduct} />
          <Route path="/register" Component={Register} />
          <Route path="/cart/:id?" Component={CartToScreen} />
          <Route path="/shipping" Component={ShippingScreen} />
          <Route path="/payment" Component={PaymentScreen} />
          <Route path="/placeOrder" Component={PlaceOrderScreen} />
          <Route path="/order" Component={OrderScreen} />
          <Route path="/order/:id?" Component={OrderId} />
          <Route path="*" Component={NotFound} />
        </Routes>
      </BrowserRouter>
      {/* </PayPalScriptProvider> */}
    </div>
  );
}

export default App;
