import fetch from 'isomorphic-fetch'
import React, { Component } from 'react'
import ReactGA from 'react-ga'
import ReactLoading from 'react-loading'
import Header from '../Common/Header'
import Dashboard from '../Dashboard'
import About from '../About'
import Resume from '../Resume'
import Contact from '../Contact'
import Footer from '../Common/Footer'
import './index.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      resumeData: {},
      quote: {}
    }

    ReactGA.initialize('UA-76263604-1')
    ReactGA.pageview(window.location.pathname)
  }

  getResume () {
    return fetch('/resume.json')
      .then(response => response.json())
  }

  getQuote () {
    return fetch('https://random-quotes-api.herokuapp.com')
      .then(response => response.json())
  }

  componentDidMount () {
    this.getResume()
      .then(data => this.setState({resumeData: data}))
      .catch(err => console.log(err))

    this.getQuote()
      .then(data => this.setState({quote: data}))
      .catch(err => console.log(err))
  }

  render () {
    if (Object.keys(this.state.resumeData).length > 0) {
      console.log(this.state.resumeData)
      const {basics, education, work} = this.state.resumeData
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
          <About data={basics} />
          <Resume education={education} work={work} />
          <Contact />
          <Footer quote={this.state.quote} />
        </div>
      )
    }
    return (
      <div className='loading-container' >
        <ReactLoading type='bubbles' color='#fff' height={'10%'} width={'10%'} className='mainLoader' />
      </div>
    )
  }
}

export default App
