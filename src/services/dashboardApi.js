import api from "../api/axios";

export const getCounts = () => api.get("/dashboard/counts");

export const getSeverity = () => api.get("/dashboard/severity");

export const getTrend = () => api.get("/dashboard/trend");
