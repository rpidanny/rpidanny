import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import { VerticalTimelineElement } from 'react-vertical-timeline-component'
import './styles.css'
class Company extends Component {
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
    const {company, startDate, endDate, position, summary, website} = this.state.data
    return (
      <VerticalTimelineElement iconStyle={{display: 'none'}}>
        <div className='work-item'>
          <div className='work-ico'>
            <Glyphicon glyph='briefcase' />
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
}

Company.propTypes = {
  data: PropTypes.object.isRequired
}

export default Company
