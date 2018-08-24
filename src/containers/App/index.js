import fetch from 'isomorphic-fetch'
import React, { Component } from 'react'
import ReactGA from 'react-ga'
import ReactLoading from 'react-loading'
import Header from '../Common/Header'
import Dashboard from '../Dashboard'
import About from '../About'
import Resume from '../Resume'
// import Interests from '../Interests'
import Travel from '../Travel'
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

    ReactGA.initialize('UA-76263604-1', { testMode: true })
    ReactGA.pageview(window.location.pathname)
  }

  getResume () {
    return fetch('/resume.json')
      .then(response => response.json())
  }

  getQuote () {
    return fetch('https://ptdwwoy2xc.execute-api.us-east-1.amazonaws.com/prod/quotes/random')
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
      const {basics, education, work, travel} = this.state.resumeData
      return (
        <div className='App'>
          <Header />
          <Dashboard name={basics.name} quote={this.state.quote} />
          <About data={basics} />
          <Resume education={education} work={work} />
          {/* <Interests data={interests} /> */}
          <Travel countries={travel} />
          <Contact email={basics.email} />
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
