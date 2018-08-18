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
              <NavItem eventKey={5} href='https://travel.abhishek.pro.np' >Travel</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    )
  }
}

export default Header
