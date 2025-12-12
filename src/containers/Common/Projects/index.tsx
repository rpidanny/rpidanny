import "./styles.css";

import React from "react";

import Project, { ProjectData } from "../Project";

interface ProjectsProps {
  projects: ProjectData[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <div className="projects-section">
      <div className="inner-title">
        <h3>Personal Projects</h3>
        <p>
          Passion projects that solve real-world problems and help me learn new skills.
        </p>
      </div>
      <div className="inner-content">
        <div className="projects-grid">
          {projects.map((project, i) => (
            <Project data={project} key={i} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
