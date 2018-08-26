import React, { Component } from 'react'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
// import Nav from 'react-bootstrap/lib/Nav'
// import Navbar from 'react-bootstrap/lib/Navbar'
// import NavItem from 'react-bootstrap/lib/NavItem'
import './styles.css'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hidden: true
    }
    this.scrollY = 0
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentWillMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll (e) {
    const { hidden } = this.state
    window.scrollY > this.prev || window.scrollY < 400 ? !hidden && this.setState(
      { hidden: true }
    ) : hidden && this.setState({ hidden: false })
    this.prev = window.scrollY
  }

  render () {
    return (
      <React.Fragment>
        <Navbar collapseOnSelect staticTop fluid hidden={this.state.hidden} >
          {/* <Navbar.Header>
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
          </Navbar.Header> */}
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href='#home' >Home</NavItem>
              <NavItem eventKey={2} href='#about' >About</NavItem>
              <NavItem eventKey={3} href='#resume' >Resume</NavItem>
              <NavItem eventKey={4} href='#interests' >Interests</NavItem>
              {/* <NavItem eventKey={5} href='#travel' >Travel</NavItem> */}
              <NavItem eventKey={6} href='#contact' >Contact</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    )
  }
}

export default Header
