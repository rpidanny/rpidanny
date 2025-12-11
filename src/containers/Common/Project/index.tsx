import "./styles.css";

import React from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

export interface ProjectData {
  title: string;
  description: string;
  url: string;
  github?: string;
  image: string;
  tags: string[];
}

interface ProjectProps {
  data: ProjectData;
  index: number;
}

const Project: React.FC<ProjectProps> = ({ data, index }) => {
  const { title, description, url, github, tags } = data;

  return (
    <div className="project-card" data-index={index}>
      <div className="project-image-container">
        <div className="project-image-placeholder">
          <div className="project-image-overlay">
            <span className="project-number">0{index + 1}</span>
          </div>
        </div>
      </div>

      <div className="project-content">
        <div className="project-header">
          <h3 className="project-title">{title}</h3>
          <div className="project-links">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                aria-label="View on GitHub"
              >
                <FaGithub />
              </a>
            )}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              aria-label="Visit project"
            >
              <FaExternalLinkAlt />
            </a>
          </div>
        </div>

        <p className="project-description">{description}</p>

        <div className="project-tags">
          {tags.map((tag, i) => (
            <span key={i} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
