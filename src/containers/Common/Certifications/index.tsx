import "./styles.css";

import React from "react";

import CCP from "../../../assets/images/certifications/CCP.png";
import CDVA from "../../../assets/images/certifications/CDVA.png";
import CSAA from "../../../assets/images/certifications/CSAA.png";
import CSOA from "../../../assets/images/certifications/CSOA.png";

const images: { [key: string]: string } = {
  "CCP.png": CCP,
  "CDVA.png": CDVA,
  "CSAA.png": CSAA,
  "CSOA.png": CSOA,
};

interface CertificationsProps {
  certifications: any[];
}

const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {
  return (
    <div>
      <div className="inner-title">
        <h3>Certifications</h3>
      </div>
      <div className="inner-content certifications">
        <div className="row gy-4 justify-content-center">
          {certifications.map((cert: any, i: number) => {
            return (
              <div
                className="col-6 col-md-auto certification"
                key={i}
              >
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={images[cert.image] || ""} alt={cert.title} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
