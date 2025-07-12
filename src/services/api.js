import axios from "axios";

const api = axios.create({
  baseURL: "https://business-nexus-production.up.railway.app", // Production API endpoint
});

export default api;
