// import Tilt from 'react-parallax-tilt'
import "./styles.css";

import React from "react";

import Particles from "../../components/Particles";

interface DashboardProps {
  name: string;
}

const Dashboard: React.FC<DashboardProps> = ({ name }) => {
  return (
    <React.Fragment>
      <section id="home" className="large-header">
        <div className="overlay">
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
          >
            {/* <Tilt
              tiltMaxAngleX={25}
              tiltMaxAngleY={25}
              scale={1.1}
            > */}
            <div className="main-title">
              <p>
                <i>Hi, My Name is</i>
              </p>
              <div style={{ display: "inline-block" }}>
                <h1 className="typewriter">{name}</h1>
              </div>
              <br />
              <br />
            </div>
            {/* </Tilt> */}
            <p className="arrow-container">
              <i className="arrow down" />
            </p>
          </Particles>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Dashboard;
