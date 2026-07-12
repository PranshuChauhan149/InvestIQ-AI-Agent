import axios from "axios";

const backendApi = import.meta.env.VITE_BACKEND_API || "http://localhost:5002/api";

const API = axios.create({
    baseURL: backendApi,
});

export const analyzeCompany = async (company) => {
    const response = await API.post("/analyze", { company });
    return response.data;
};

export default API;