import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

class Institution extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: props.data
    }
  }

  getYear (date) {
    return date.split('-')[0]
  }

  render () {
    const {institution, startDate, endDate, studyType, area} = this.state.data
    return (
      <div className='col-md-6'>
        <div className='work-item'>
          <Glyphicon glyph='education' />
          <div className='work-desc'>
            <h4>
              {institution}
            </h4>
            <h6>{this.getYear(startDate)} - {this.getYear(endDate)}</h6>
            <p>
              {studyType} : {area}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

Institution.propTypes = {
  data: PropTypes.object.isRequired
  // startDate: PropTypes.string.isRequired,
  // endDate: PropTypes.string.isRequired,
  // studyType: PropTypes.string.isRequired,
  // area: PropTypes.string.isRequired
}

export default Institution
