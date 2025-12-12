import "./styles.css";

import React from "react";
import { FaBook } from "react-icons/fa";
// import { FaBook, FaStar } from "react-icons/fa";


import Books from "../Common/Books";

interface InterestsProps {
  data: any; // Define specific shape if possible
}

const Interests: React.FC<InterestsProps> = () => {
  // const { travel } = data // Unused for now

  return (
    <React.Fragment>
      <section className="interests-section" id="interests">
        <div className="interests-header">
          <div className="header-content">
            <div className="subtitle">What I Love</div>
            <h2>Interests</h2>
          </div>
        </div>
        
        <div className="interests-container">
          <div className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="inner-title">
                  <h3>
                    <FaBook /> Books
                  </h3>
                  <p>Some of my favorite books</p>
                </div>
                <Books />
              </div>
              {/* <div className="col-md-12">
                <div className="divider">
                  <span>
                    <FaStar />
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Interests;
