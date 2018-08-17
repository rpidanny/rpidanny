import React, { Component } from 'react'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
// import Nav from 'react-bootstrap/lib/Nav'
// import Navbar from 'react-bootstrap/lib/Navbar'
// import NavItem from 'react-bootstrap/lib/NavItem'
import './styles.css'

class Header extends Component {
  render () {
    return (
      <React.Fragment>
        <Navbar collapseOnSelect staticTop fluid >
          <Navbar.Header>
            <button
              type='button'
              className='navbar-toggle collapsed'
              data-toggle='collapse'
              data-target='#bs-example-navbar-collapse-1'
            >
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar' />
              <span className='icon-bar' />
              <span className='icon-bar' />
            </button>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href='#home' >Home</NavItem>
              <NavItem eventKey={2} href='#about' >About</NavItem>
              <NavItem eventKey={3} href='#resume' >Resume</NavItem>
              <NavItem eventKey={4} href='#contact' >Contact</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {/* <header className='header navbar-style-underline'>

          <div className='container-fluid'>
            <div className='navbar-header'>
              <button
                type='button'
                className='navbar-toggle collapsed'
                data-toggle='collapse'
                data-target='#bs-example-navbar-collapse-1'
              >
                <span className='sr-only'>Toggle navigation</span>
                <span className='icon-bar' />
                <span className='icon-bar' />
                <span className='icon-bar' />
              </button>
            </div>
            <div className='collapse navbar-collapse'>
              <ul className='nav navbar-nav'>
                <li className='active nav-home'>
                  <a href='#home' className='goto'>
                    <span>Home</span>
                  </a>
                </li>
                <li className='nav-about'>
                  <a href='#about' className='goto'>
                    <span>About me</span>
                  </a>
                </li>
                <li className='nav-resume'>
                  <a href='#resume' className='goto'>
                    <span>Resume</span>
                  </a>
                </li>
                <li className='nav-contact'>
                  <a href='#contact' className='goto'>
                    <span>Contact</span>
                  </a>
                </li>
                <li className='nav-contact'>
                  <a href='http://travel.abhishek.pro.np'>
                    <span>Travel</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </header> */}
      </React.Fragment>
    )
  }
}

export default Header
