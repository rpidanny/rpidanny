import React from 'react'
import { FaGraduationCap } from 'react-icons/fa'

interface InstitutionData {
  institution: string;
  startDate: string;
  endDate: string;
  studyType: string;
  area: string;
}

interface InstitutionProps {
  data: InstitutionData;
}

const Institution: React.FC<InstitutionProps> = ({ data }) => {
  const { institution, startDate, endDate, studyType, area } = data

  const getYear = (date: string) => {
    return date.split('-')[0]
  }

  return (
    <div className='col-md-6'>
      <div className='work-item'>
        <FaGraduationCap />
        <div className='work-desc'>
          <h4>
            {institution}
          </h4>
          <h6>{getYear(startDate)} - {getYear(endDate)}</h6>
          <p>
            {studyType} : {area}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Institution
