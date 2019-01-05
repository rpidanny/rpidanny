import fetch from 'isomorphic-fetch'
import React, { Component } from 'react'
import ReactGA from 'react-ga'
// import ReactLoading from 'react-loading'
// import Header from '../Common/Header'
import Dashboard from '../Dashboard'
import About from '../About'
import Resume from '../Resume'
import Interests from '../Interests'
// import Travel from '../Travel'
import Contact from '../Contact'
import Footer from '../Common/Footer'

import resumeData from '../../resume.json'

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
      },
      shelves: []
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
    // this.setState({ resumeData })
    this.getQuote()
      .then(quote => {
        this.setState({ quote })
      })
      .catch(err => console.log(err))
    this.getBooks()
      .then(shelves => {
        this.setState({ shelves })
      })
      .catch(err => console.log(err))
  }

  render () {
    const {basics, education, work, interests} = resumeData
    const { quote, shelves } = this.state
    return (
      <div className='App'>
        {/* <Header /> */}
        <Dashboard name={basics.name} quote={quote} />
        <About data={basics} />
        <Resume education={education} work={work} />
        <Interests data={{...interests, shelves}} />
        {/* <Travel countries={travel} /> */}
        <Contact email={basics.email} />
        <Footer quote={quote} />
      </div>
    )
    // return (
    //   <div className='loading-container' >
    //     <ReactLoading type='bubbles' color='#fff' height={'10%'} width={'10%'} className='mainLoader' />
    //   </div>
    // )
  }
}

export default App
