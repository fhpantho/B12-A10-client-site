import axios from "axios";
import { toast } from "react-hot-toast";

let loadingCount = 0;

// Helper to show/hide global loader
const setLoading = (state) => {
  const loader = document.getElementById("global-loader");
  if (!loader) return;
  loader.style.display = state ? "flex" : "none";
};


const axiosInstance = axios.create({

});


axiosInstance.interceptors.request.use(
  (config) => {
    loadingCount++;
    setLoading(true);
    return config;
  },
  (error) => {
    setLoading(false);
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    loadingCount--;
    if (loadingCount === 0) setLoading(false);
    return response;
  },
  (error) => {
    loadingCount--;
    if (loadingCount === 0) setLoading(false);
    toast.error(error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
