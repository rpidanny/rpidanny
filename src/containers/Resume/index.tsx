import "./styles.css";

import React from "react";
import { FaBriefcase, FaStar } from "react-icons/fa";

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
    <React.Fragment>
      <section className="row resume" id="resume">
        <div className="col-md-12 title">
          <h2>
            <FaBriefcase /> / Resume
          </h2>
        </div>
        <div className="col-md-12">
          <div className="content">
            {projects && projects.length > 0 && (
              <>
                <div className="divider" />
                <Projects projects={projects} />
              </>
            )}
            <div className="divider">
              <span>
                <FaStar />
              </span>
            </div>
            <Work companies={work} />
            <div className="divider">
              <span>
                <FaStar />
              </span>
            </div>
            {certifications && (
              <Certifications certifications={certifications} />
            )}
            <div className="divider">
              <span>
                <FaStar />
              </span>
            </div>
            <Education institutions={education} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Resume;
