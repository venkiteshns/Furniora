import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PublicRoute from "./components/PublicRoutes";
import ProtectedRoute from "./components/ProtecteRoutes";
import UserProfile from "./components/UserProfile";
import SellProduct from './components/SellProduct'
import Header from "./components/Header";
import Cart from "./components/Cart";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutError from "./pages/CheckoutError";

function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Protected routes */}
            <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<UserProfile/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/sell" element={<SellProduct/>} />
            <Route path="/checkout/success" element={<CheckoutSuccess/>} />
            <Route path="/checkout/error" element={<CheckoutError/>} />
          </Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
