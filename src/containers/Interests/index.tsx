import "./styles.css";

import React from "react";
import { FaBook, FaHeart, FaStar } from "react-icons/fa";

import Books from "../Common/Books";

interface InterestsProps {
  data: any; // Define specific shape if possible
}

const Interests: React.FC<InterestsProps> = () => {
  // const { travel } = data // Unused for now

  return (
    <React.Fragment>
      <section className="row interests" id="interests">
        <div className="col-md-12 title">
          <h2>
            <FaHeart /> / Interests
          </h2>
        </div>
        <div className="col-md-12">
          <div className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="inner-title">
                  <h3>
                    <FaBook /> Books
                  </h3>
                  <p>Some of my favorite books:</p>
                </div>
                <Books />
              </div>
              <div className="col-md-12">
                <div className="divider">
                  <span>
                    <FaStar />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Interests;
