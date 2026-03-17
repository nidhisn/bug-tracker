import api from "./axios";

// GET all bugs
export const getBugs = () => api.get("/bugs");

// GET bug by id
export const getBugById = (id) => api.get(`/bugs/${id}`);

// CREATE bug
export const createBug = (bug) => api.post("/bugs", bug);

// UPDATE status
export const updateBugStatus = (id, status) =>
  api.put(`/bugs/${id}/status`, null, {
    params: { status },
  });

// ASSIGN bug
export const assignBug = (id, assignedTo) =>
  api.put(`/bugs/${id}/assign`, null, {
    params: { assignedTo },
  });

// FILTER by status
export const getByStatus = (status) =>
  api.get("/bugs/status", {
    params: { status },
  });

// FILTER by priority
export const getByPriority = (priority) =>
  api.get("/bugs/priority", {
    params: { priority },
  });
