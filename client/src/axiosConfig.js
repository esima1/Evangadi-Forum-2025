import axios from "axios";
 const token = localStorage.getItem("token");
const axiosBase = axios.create({
  // baseURL: "http://localhost:3306/api"
  baseURL: "https://evangadi-forum-2025.onrender.com/api",
});

export default axiosBase;
