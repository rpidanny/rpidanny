import fetch from 'isomorphic-fetch'
import React, { Component } from 'react'
import ReactGA from 'react-ga'
import Dashboard from '../Dashboard'
import About from '../About'
import Resume from '../Resume'
import Interests from '../Interests'
import Contact from '../Contact'
import Footer from '../Common/Footer'

import resumeData from '../../data/resume.json'

import { quotesAPI, booksAPI } from './URLs'

import './index.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      resumeData: {},
      quote: {
        quote: 'People who are really serious about software should make their own hardware',
        author: 'Alan Kay'
      }
    }

    ReactGA.initialize('UA-76263604-1', { testMode: true })
    ReactGA.pageview(window.location.pathname)
  }

  getQuote () {
    return fetch(quotesAPI)
      .then(response => response.json())
  }

  getBooks () {
    return fetch(booksAPI).then(response => response.json())
  }

  componentDidMount () {
    this.getQuote()
      .then(quote => {
        this.setState({ quote })
      })
      .catch(err => console.log(err))
  }

  render () {
    const {basics, education, work, interests} = resumeData
    const { quote } = this.state
    return (
      <div className='App'>
        <Dashboard name={basics.name} quote={quote} />
        <About data={basics} />
        <Resume education={education} work={work} />
        <Interests data={interests} />
        <Contact email={basics.email} />
        <Footer quote={quote} />
      </div>
    )
  }
}

export default App
