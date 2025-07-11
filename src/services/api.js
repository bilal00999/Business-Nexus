import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // Change to your mock API endpoint if needed
});

export default api;
