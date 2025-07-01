import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api`
      : "/api",
  withCredentials: true,
});

export default axiosInstance;
