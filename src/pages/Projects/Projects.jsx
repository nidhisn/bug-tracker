import { useEffect, useState } from "react";
import CreateProject from "../../components/CreateProject/CreateProject";
import {
  addProject,
  FALLBACK_PROJECTS,
  fetchProjects,
} from "../../services/projectService";
import styles from "./Projects.module.css";

function Projects() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch(() => {
        setProjects(FALLBACK_PROJECTS);
      });
  }, []);

  const handleSaveProject = async (project) => {
    const savedProject = await addProject(project);
    setProjects((currentProjects) => [savedProject || project, ...currentProjects]);
  };

  return (
    <>
      <div className={styles.page}>
        <div className={styles.headerRow}>
          <div>
            <div className={styles.pageTitle}>Projects</div>
            <p className={styles.pageSubtitle}>
              High-level view of products connected to this bug tracker.
            </p>
          </div>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => setCreateOpen(true)}
          >
            + New Project
          </button>
        </div>

        <div className={styles.cards}>
          {projects.map((p) => (
            <div key={p.key} className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.projectName}>{p.name}</div>
                  <div className={styles.projectKey}>{p.key}</div>
                </div>
                <span className={styles.badge}>{p.status}</span>
              </div>
              <p className={styles.description}>{p.description}</p>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Owner</span>
                <span className={styles.metaValue}>{p.owner}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CreateProject
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSave={handleSaveProject}
      />
    </>
  );
}

export default Projects;
