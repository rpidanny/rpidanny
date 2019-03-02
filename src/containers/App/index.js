import fetch from 'isomorphic-fetch'
import React, { Component } from 'react'
import ReactGA from 'react-ga'
import { Launcher } from 'react-chat-window'

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
        <Launcher
          agentProfile={{
            teamName: 'Ask Me Stuffs About Me',
            // imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
            imageUrl: 'https://icons-for-free.com/free-icons/png/512/2624876.png'
          }}
          // onMessageWasSent={this._onMessageWasSent.bind(this)}
          // messageList={this.state.messageList}
          showEmoji={false}
        />
      </div>
    )
  }
}

export default App
