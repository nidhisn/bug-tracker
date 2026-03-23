import api from "./axios";

export const getProjects = () => api.get("/projects");

export const createProject = (project) => api.post("/projects", project);
