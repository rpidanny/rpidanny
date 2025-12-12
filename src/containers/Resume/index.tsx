import "./styles.css";

import React from "react";

import Certifications from "../Common/Certifications";
import Education from "../Common/Education";
import { ProjectData } from "../Common/Project";
import Projects from "../Common/Projects";
import Work from "../Common/Work";

interface ResumeProps {
  education: any[];
  work: any[];
  certifications?: any[];
  projects?: ProjectData[];
}

const Resume: React.FC<ResumeProps> = ({
  education,
  work,
  certifications,
  projects,
}) => {
  return (
    <section className="resume-section" id="resume">
      <div className="resume-header">
        <div className="header-content">
          <div className="subtitle">My Journey</div>
          <h2>Resume</h2>
        </div>
      </div>

      <div className="resume-container">
        <div className="resume-content">
          {projects && projects.length > 0 && (
            <div className="resume-block">
              <Projects projects={projects} />
            </div>
          )}

          <div className="resume-block">
            <Work companies={work} />
          </div>

          <div className="resume-block">
            <Education institutions={education} />
          </div>

          {certifications && (
            <div className="resume-block">
              <Certifications certifications={certifications} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Resume;
