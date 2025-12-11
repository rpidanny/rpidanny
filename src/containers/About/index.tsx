import "./styles.css";

import React from "react";
import Image from "react-bootstrap/Image";
import { FaEnvelope, FaPhone, FaUser, FaWhatsapp } from "react-icons/fa";
import LazyLoad from "react-lazyload";
import Tilt from "react-parallax-tilt";

import ProfilePicture from "../../assets/images/pp_with_linus.jpg";
import Social from "../Common/Social";

interface ProfileData {
  social: any[]; // Define more specific types if possible
  cv: any[];
}

interface AboutData {
  name: string;
  summary: string[];
  profiles: ProfileData;
  email: string;
  phone: string;
}

interface AboutProps {
  data: AboutData;
}

const About: React.FC<AboutProps> = ({ data }) => {
  const { summary, profiles, email, phone } = data;

  return (
    <React.Fragment>
      <section className="row about" id="about">
        <div className="col-md-12 title">
          <h2>
            <FaUser /> / About me
          </h2>
        </div>
        <div className="col-md-12">
          <div className="content">
            <div className="about-holder">
              <div className="inner-title">
                <br />
                {summary.map((element, idx) => {
                  if (element === "") {
                    return <br key={idx} />;
                  }
                  return <p key={idx}> {element} </p>;
                })}
              </div>
              <div className="inner-content profile">
                <div className="dl-btn">
                  <Social data={profiles.cv} />
                  <p>See / Download My CV</p>
                </div>
                <div className="img-profile">
                  <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} scale={1.1}>
                    <LazyLoad>
                      <Image
                        src={ProfilePicture}
                        roundedCircle
                        className="profile-pic"
                      />
                    </LazyLoad>
                  </Tilt>
                </div>
                <div className="fol-btn">
                  <Social data={profiles.social} />
                  <p>Follow Me On</p>
                </div>
              </div>
              <div className="info">
                <ul>
                  <li>
                    <div className="ico">
                      <a href={`mailto:${email}`}>
                        <FaEnvelope />
                      </a>
                    </div>
                    <p>
                      <a href={`mailto:${email}`}>{email}</a>
                    </p>
                  </li>
                  <li>
                    <div className="ico">
                      <a href={`tel:${phone}`}>
                        <FaPhone />
                      </a>
                    </div>
                    <p>
                      <a href={`tel:${phone}`}>{phone}</a>
                    </p>
                  </li>
                  <li>
                    <div className="ico">
                      <a href={`https://wa.me/${phone}`}>
                        <FaWhatsapp />
                      </a>
                    </div>
                    <p>
                      <a href={`https://wa.me/${phone}`}>WhatsApp</a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default About;
