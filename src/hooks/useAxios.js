import axios from "axios";

const useAxios = () => {
    const token = localStorage.getItem("token");

    const instance = axios.create({
        baseURL: "http://localhost:3001/api",
        headers: {
            "Content-Type": "application/json",
            ...(token && {Authorization: `Bearer ${token}`})
        }
    });
    
    instance.interceptors.response.use(
        response => response,
        error => {
          if (error.response?.status === 401 || error.response?.status === 403) {
            console.warn("Unauthorized. Redirecting to login...");
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
          return Promise.reject(error);
        }
      );

    return instance;
}
 
export default useAxios;