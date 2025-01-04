import axios from "axios";
 const token = localStorage.getItem("token");
const axiosBase = axios.create({
  baseURL: "http://localhost:3306/api", 
});

export default axiosBase;
