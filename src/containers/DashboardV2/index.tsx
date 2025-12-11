// import Tilt from 'react-parallax-tilt'
import "./styles.css";

import React from "react";

// import Particles from "../../components/Particles";
import { GridScan } from "../../components/GridScan";

interface DashboardProps {
  name: string;
}

const Dashboard: React.FC<DashboardProps> = ({ name }) => {
  return (
    <React.Fragment>
      <section id="home" className="large-header">
        <div className="overlay">
          {/* <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
          > */}
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
          </GridScan>
          {/* </Particles> */}
        </div>
      </section>
    </React.Fragment>
  );
};

export default Dashboard;
