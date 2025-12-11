import React from 'react'
import { VerticalTimeline } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import Company from '../Company'

interface WorkProps {
  companies: any[]; // Use CompanyData[] if exported
}

const Work: React.FC<WorkProps> = ({ companies }) => {
  return (
    <div>
      <div className='inner-title'>
        <h3>My Experiences</h3>
        <p>What I did in the past and what I am doing now.</p>
      </div>
      <div className='inner-content'>
        <VerticalTimeline>
          {
            companies.map((company, i) => <Company data={company} key={i} />)
          }
        </VerticalTimeline>
      </div>
    </div>
  )
}

export default Work
