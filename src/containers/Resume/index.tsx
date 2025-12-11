import React from 'react'
import Work from '../Common/Work'
import Certifications from '../Common/Certifications'
import { FaBriefcase, FaStar } from 'react-icons/fa'
import Education from '../Common/Education'
import './styles.css'

interface ResumeProps {
  education: any[];
  work: any[];
  certifications?: any[];
}

const Resume: React.FC<ResumeProps> = ({ education, work, certifications }) => {
  return (
    <React.Fragment>
      <section className='row resume' id='resume'>
        <div className='col-md-12 title'>
          <h2>
            <FaBriefcase /> / Resume
          </h2>
        </div>
        <div className='col-md-12'>
          <div className='content'>
            {certifications && <Certifications certifications={certifications} />}
            <div className='divider'>
              <span>
                <FaStar />
              </span>
            </div>
            <Work companies={work} />
            <div className='divider'>
              <span>
                <FaStar />
              </span>
            </div>
            <Education institutions={education} />
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Resume
