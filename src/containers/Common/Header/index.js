import React, { Component } from 'react'
import './styles.css'

class Header extends Component {
  render () {
    return (
      <React.Fragment>
        {/* generated code */}
        <header className='header navbar-style-underline'>

          <div className='container-fluid'>
            {/* Brand and toggle get grouped for better mobile display */}
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
            {/* Collect the nav links, forms, and other content for toggling */}
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
            {/* /.navbar-collapse */}
          </div>
          {/* /.container-fluid */}
        </header>
      </React.Fragment>
    )
  }
}

export default Header
