import React, { Component } from 'react'
import Header from '../Common/Header'
import Dashboard from '../Dashboard'
import About from '../About'
import Resume from '../Resume'
import Contact from '../Contact'
import Footer from '../Common/Footer'
import './index.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <Header />
        <Dashboard />
        <About />
        <Resume />
        <Contact />
        <Footer />
      </div>
    )
  }
}

export default App
