import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const getToken = () => {
  return localStorage.getItem("token");
};
let config = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
};

export const fetchBids = async (all, filterData) => {
  try {
    let url = `${apiUrl}/bids`;
    url += `?all=${all}`;
    if (filterData.search) url += `&search=${filterData.search}`;
    if (filterData.filter) url += `&filter=${filterData.filter}`;
    if (filterData.statusFilter)
      url += `&statusFilter=${filterData.statusFilter}`;
    const response = await axios.get(url, config);

    if (response.data) {
      return response.data;
    } else {
      console.error("Error retrieving bids:", response.data.message);
      return null;
    }
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    console.error("Error:", error.message);
    return null;
  }
};

export const fetchUserById = async (userId) => {
  try {
    const response = await axios.post(
      `${apiUrl}/users/getById`,
      { userId },
      config
    );

    if (response.data.success) {
      return response.data;
    } else {
      console.error("Error retrieving bids:", response.data.message);
      return null;
    }
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    console.error("Error:", error.message);
    return null;
  }
};

export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`${apiUrl}/products/${productId}`, config);

    if (response.data.success) {
      return response.data;
    } else {
      console.error("Error retrieving bids:", response.data.message);
      return null;
    }
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    console.error("Error:", error.message);
    return null;
  }
};

export const fetchUserProducts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/products/user/get`, config);

    if (response.data.success) {
      return response.data;
    } else {
      console.error("Error retrieving bids:", response.data.message);
      return null;
    }
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    console.error("Error:", error.message);
    return null;
  }
};

export const getHighestBidForItem = async (bidId) => {
  try {
    const response = await axios.post(
      `${apiUrl}/bids/getHighestBid`,
      { bidId },
      config
    );

    if (response.data) {
      return response.data;
    } else {
      console.error("Error retrieving highest bid:", response.data.message);
      return null;
    }
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    console.error("Error:", error.message);
    return null;
  }
};
