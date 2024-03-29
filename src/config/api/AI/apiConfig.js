import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_AI_API,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => config);

api.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
