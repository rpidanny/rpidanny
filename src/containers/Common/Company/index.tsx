import React from 'react'
import { FaBriefcase } from 'react-icons/fa'
import { VerticalTimelineElement } from 'react-vertical-timeline-component'
import './styles.css'

interface CompanyData {
  company: string;
  startDate: string;
  endDate: string;
  position: string;
  summary: string;
  website: string;
}

interface CompanyProps {
  data: CompanyData;
}

const Company: React.FC<CompanyProps> = ({ data }) => {
  const { company, startDate, endDate, position, summary, website } = data
  return (
    <VerticalTimelineElement iconStyle={{ display: 'none' }}>
      <div className='work-item'>
        <div className='work-ico'>
          <FaBriefcase />
        </div>
        <div className='work-desc'>
          <h4>
            <a href={website} className='no-underline' >{company}</a>
          </h4>
          <h5>{position}</h5>
          <h6>{startDate} - {endDate}</h6>
          <p>{summary}</p>
        </div>
      </div>
    </VerticalTimelineElement>
  )
}

export default Company
