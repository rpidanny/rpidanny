import "./styles.css";

import React, { useEffect, useRef, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";

const Header: React.FC = () => {
  const [hidden, setHidden] = useState(true);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const prev = prevScrollY.current;

      if (currentScrollY > prev || currentScrollY < 400) {
        if (!hidden) setHidden(true);
      } else {
        if (hidden) setHidden(false);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hidden]);

  return (
    <React.Fragment>
      {/* Simplify Navbar: no staticTop/fluid props as they might be deprecated or default. 
          Use standard bootstrap classes or styles if needed.
          Applying 'hidden' attribute or style based on state. 
      */}
      <Navbar
        collapseOnSelect
        expand="lg" // 'fluid' behavior often default or controlled by container. 'expand' is needed for Toggler.
        fixed="top"
        className={`custom-navbar ${hidden ? "hidden-navbar" : ""}`}
        style={{
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#resume">Resume</Nav.Link>
            <Nav.Link href="#interests">Interests</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
};

export default Header;
