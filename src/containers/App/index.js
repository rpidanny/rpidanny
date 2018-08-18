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
      .then(resume => {
        this.setState({ resumeData: resume })
        return this.getQuote()
      })
      .then(quote => this.setState({ quote }))
      .catch(err => console.log(err))
  }

  render () {
    if (Object.keys(this.state.resumeData).length > 0) {
      const {basics, education, work} = this.state.resumeData
      return (
        <div className='App'>
          <Header />
          <Dashboard />
          <About data={basics} />
          <Resume education={education} work={work} />
          <Contact data={basics} />
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
