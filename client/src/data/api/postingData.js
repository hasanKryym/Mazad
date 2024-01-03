import axios from "axios";
const server = process.env.REACT_APP_API_URL;

const getToken = () => {
  return localStorage.getItem("token");
};
let config = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
};

export const login = async (email, password) => {
  const data = {
    email,
    password,
  };
  try {
    const response = await axios.post(`${server}/authentication/login`, data, {
      withCredentials: true,
    });
    // const response = await axios.post(`${server}/authentication/login`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    return error.response ? error.response.data : error.message;
  }
};

export const register = async (
  username,
  email,
  password,
  address,
  phoneNumber
) => {
  const data = {
    username,
    email,
    password,
    address,
    phoneNumber,
  };
  try {
    const response = await axios.post(`${server}/authentication/signup`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    return error.response ? error.response.data : error.message;
  }
};

export const placeBid = async (bidId, bidAmount) => {
  const data = {
    bidId,
    bidAmount,
  };
  try {
    const response = await axios.post(`${server}/bids/place`, data, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    console.error("Error:", error.message);
    return null;
  }
};

export const addProduct = async (name, description, image) => {
  const data = {
    name,
    description,
    image,
  };
  try {
    const response = await axios.post(
      `${server}/products/manage/add`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    return error.response ? error.response.data : error.message;
  }
};

export const addBid = async (productId, bidderId, min_bid, end_time) => {
  const data = {
    productId,
    bidderId,
    min_bid,
    end_time,
  };
  try {
    const response = await axios.post(
      `${server}/bids/manage/add`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    return error.response ? error.response.data : error.message;
  }
};

// const server = process.env.REACT_APP_API_URL;

// const getToken = () => {
//   return localStorage.getItem("token");
// };
// let config = {
//   headers: {
//     Authorization: `Bearer ${getToken()}`,
//     "Content-Type": "application/json",
//   },
// };

// export const login = async (email, password) => {
//   const data = {
//     email,
//     password,
//   };
//   try {
// const response = await fetch(`${server}/authentication/login`, {
//   method: "POST",
//   headers: {
//     ...config.headers,
//     Accept: "application/json",
//   },
//   body: JSON.stringify(data),
// });
//     const result = await response.json();
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.error("Error:", error.message);
//     return null;
//   }
// };

// export const placeBid = async (bidId, bidAmount) => {
//   const data = {
//     bidId,
//     bidAmount,
//   };
//   try {
//     const response = await fetch(`${server}/bids/place`, {
//       method: "POST",
//       headers: config.headers,
//       body: JSON.stringify(data),
//     });
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error("Error:", error.message);
//     return null;
//   }
// };

// export const addProduct = async (name, description, image) => {
//   const data = {
//     name,
//     description,
//     image,
//   };
//   try {
//     const response = await fetch(`${server}/products/manage/add`, {
//       method: "POST",
//       headers: config.headers,
//       body: JSON.stringify(data),
//     });
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error("Error:", error.message);
//     return null;
//   }
// };

// export const addBid = async (productId, bidderId, min_bid, end_time) => {
//   const data = {
//     productId,
//     bidderId,
//     min_bid,
//     end_time,
//   };
//   try {
//     const response = await fetch(`${server}/bids/manage/add`, {
//       method: "POST",
//       headers: config.headers,
//       body: JSON.stringify(data),
//     });
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error("Error:", error.message);
//     return null;
//   }
// };
