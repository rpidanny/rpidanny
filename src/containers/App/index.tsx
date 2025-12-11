import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga4'

import Dashboard from '../DashboardV2'
import About from '../About'
import Resume from '../Resume'
import Interests from '../Interests'
import Contact from '../Contact'
import Footer from '../Common/Footer'

import resumeData from '../../data/resume.json'

import { quotesAPI } from './URLs'

import './index.css'

ReactGA.initialize('UA-76263604-1', { testMode: process.env.NODE_ENV === 'test' })

interface Quote {
  quote: string;
  author: string;
}

const App: React.FC = () => {
  const [quote, setQuote] = useState<Quote>({
    quote: 'People who are really serious about software should make their own hardware',
    author: 'Alan Kay'
  })

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search })

    const fetchQuote = async () => {
      try {
        const response = await fetch(quotesAPI)
        const data = await response.json()
        if (data && data.quote && data.author) {
             setQuote(data)
        }
      } catch (err) {
        console.error('Error fetching quote:', err)
      }
    }

    fetchQuote()
  }, [])

  const { basics, education, work, interests, certifications } = resumeData

  return (
    <div className='App'>
      <Dashboard name={basics.name} />
      <About data={basics} />
      <Resume education={education} work={work} certifications={certifications} />
      <Interests data={interests} />
      <Contact email={basics.email} />
      <Footer quote={quote} />
    </div>
  )
}

export default App
