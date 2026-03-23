import { createProject, getProjects } from "../api/projectService";

const FALLBACK_PROJECTS = [
  {
    name: "Bug Tracker Web",
    key: "BT-WEB",
    status: "Active",
    owner: "Frontend Team",
    description:
      "React dashboard for viewing and tracking bugs from Google Sheets.",
  },
  {
    name: "Bug Tracker API",
    key: "BT-API",
    status: "Planned",
    owner: "Backend Team",
    description:
      "Spring Boot service to create, update and sync bugs with the sheet.",
  },
];

export async function fetchProjects() {
  const res = await getProjects();
  return Array.isArray(res.data) ? res.data : FALLBACK_PROJECTS;
}

export async function addProject(project) {
  const res = await createProject(project);
  return res.data;
}

export { FALLBACK_PROJECTS };
