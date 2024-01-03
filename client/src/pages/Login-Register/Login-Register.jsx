import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./LoginRegister.css";
import { login } from "../../data/api/postingData";
import { NOTIFICATION_STATES } from "../../components/Notification/notificationStates";
import Notification from "../../components/Notification/Notification";
import { UserContext } from "../../context/User/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  const [user, setUser] = userData;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({
    state: "",
    message: "",
  });

  const handleDismiss = () => {
    setShowNotification(false);
    setNotificationData({
      state: "",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setNotificationData({
        ...notificationData,
        message: "please enter email and password",
        state: NOTIFICATION_STATES.INFO,
      });
      setShowNotification(true);
      return;
    }

    setNotificationData({
      ...notificationData,
      message: "Logging in, please wait",
      state: NOTIFICATION_STATES.LOAD,
    });
    setShowNotification(true);

    const response = await login(formData.email, formData.password);
    if (response.success) {
      setNotificationData({
        message: response.message,
        state: NOTIFICATION_STATES.SUCCESS,
      });
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser((prevUser) => ({ ...prevUser, status: { isLoggedIn: true } }));
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    } else {
      setNotificationData({
        message: response.message,
        state: NOTIFICATION_STATES.ERROR,
      });
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [showNotification]);

  return (
    <>
      <div className="middle-container">
        {showNotification && (
          <Notification
            message={notificationData.message}
            state={notificationData.state}
            onDismiss={handleDismiss}
          />
        )}
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              className="input-field"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              className="input-field"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit" className="primary-button">
              Login
            </button>
          </form>
          <p>
            Don't have an account?{" "}
            <Link style={{ color: "var(--primaryColor)" }} to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your registration logic here, e.g., send formData to the server
  };

  return (
    <div className="middle-container">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            className="input-field"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            className="input-field"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="input-field"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            className="input-field"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phoneNumber"
            className="input-field"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <button type="submit" className="primary-button">
            Register
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link style={{ color: "var(--primaryColor)" }} to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export { Login, Register };
