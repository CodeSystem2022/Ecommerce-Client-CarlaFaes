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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomeScreen} exact />
          <Route path="/product/:id" Component={SingleProduct} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/profile" Component={ProfileScreen} />
          <Route path="/cart/:id?" Component={CartToScreen} />
          <Route path="/shipping" Component={ShippingScreen} />
          <Route path="/payment" Component={PaymentScreen} />
          <Route path="/placeOrder" Component={PlaceOrderScreen} />
          <Route path="/order" Component={OrderScreen} />
          <Route path="*" Component={NotFound} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
