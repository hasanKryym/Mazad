import { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

export const UserStatus = (props) => {
  const { checkAuth } = require("../../utils/checkAuth");
  const userData = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {
        id: "",
        username: "",
        email: "",
        address: "",
        phoneNumber: "",
      };
  const [user, setUser] = useState({
    status: {
      isLoggedIn: localStorage.getItem("token") ? true : false,
    },
    userData,
  });

  useEffect(() => {
    const isAuth = checkAuth();
    isAuth.then((res) => {
      if (res.success) {
        if (!user.status.isLoggedIn) {
          setUser((prevUser) => ({
            ...prevUser,
            status: { isLoggedIn: true },
          }));
          const newUser = JSON.parse(localStorage.getItem("user"));
          setUser((prevUser) => ({ ...prevUser, data: newUser }));
        }
      } else {
        localStorage.clear();
        setUser({
          status: {
            isLoggedIn: false,
          },
          data: {
            id: "",
            username: "",
            email: "",
            address: "",
            phoneNumber: "",
          },
        });
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData: [user, setUser],
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
