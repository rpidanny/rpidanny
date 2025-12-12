import "./styles.css";

import React from "react";

import { GridScan } from "../../components/GridScan";
import Social from "../Common/Social";

interface ProfileData {
  social: any[];
  cv: any[];
}

interface AboutData {
  name: string;
  summary: string[];
  profiles: ProfileData;
  email: string;
  phone: string;
}

interface DashboardProps {
  data: AboutData;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const { name, summary, profiles } = data;

  return (
    <React.Fragment>
      <section id="home" className="large-header">
        <div className="overlay">
          <GridScan
            sensitivity={0.55}
            lineThickness={1}
            linesColor="#392e4e"
            gridScale={0.1}
            scanColor="#FF9FFC"
            scanOpacity={0.4}
            enablePost
            bloomIntensity={0.6}
            chromaticAberration={0.002}
            noiseIntensity={0.01}
          >
            <div className="hero-content">
              <div className="hero-intro">
                <i>Hi, my name is</i>
              </div>

              <div className="hero-name-wrapper">
                <h1 className="typewriter">{name}</h1>
              </div>

              <div className="hero-summary">
                {summary.map(
                  (element, idx) => element && <p key={idx}>{element}</p>,
                )}
              </div>

              <div className="hero-actions">
                <div className="social-group">
                  <Social data={profiles.social} />
                </div>
                <div className="action-separator">|</div>
                <div className="cv-group">
                  <Social data={profiles.cv} />
                </div>
              </div>
            </div>

            <div
              className="arrow-container"
              onClick={() =>
                document
                  .getElementById("resume")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <i className="arrow down" />
            </div>
          </GridScan>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Dashboard;
