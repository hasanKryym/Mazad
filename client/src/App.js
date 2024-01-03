import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Register } from "./pages/Login-Register/Login-Register";
import { UserStatus } from "./context/User/UserContext";
import Home from "./pages/Home/Home";
import Bids from "./pages/Bids/Bids";
import { BidsLoaderStatus } from "./context/Bids/BidsLoadingContext";
import MyAccount from "./pages/MyAccount/MyAccount";
import Profile from "./pages/MyAccount/Profile/Profile";
import Products from "./pages/MyAccount/Products/Products";
import UserBids from "./pages/MyAccount/Bids/UserBids";

function App() {
  return (
    <>
      <UserStatus>
        <BidsLoaderStatus>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/bids" element={<Bids />} />
              {/* <Route path="/myAccount" element={<MyAccount />} /> */}
              <Route path="/myAccount/profile" element={<Profile />} />
              <Route path="/myAccount/products" element={<Products />} />
              <Route path="/myAccount/bids" element={<UserBids />} />
            </Routes>
          </Router>
        </BidsLoaderStatus>
      </UserStatus>
    </>
  );
}

export default App;
