import axios from "axios";
const server = process.env.REACT_APP_API_URL;

export const checkAuth = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  try {
    const response = await axios.get(`${server}/authentication`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    return false;
  }
};
