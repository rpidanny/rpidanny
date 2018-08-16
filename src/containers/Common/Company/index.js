import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import { VerticalTimelineElement } from 'react-vertical-timeline-component'

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
      <VerticalTimelineElement
        className='vertical-timeline-element--work'
        date={`${startDate} - ${endDate}`}
        iconStyle={{ background: '#2d2d2d', color: '#fff', width: '30px', height: '30px' }}
        icon={<Glyphicon glyph='star' />}
      >
        <h3 className='vertical-timeline-element-title'><a href={website}>{company}</a></h3>
        <h4 className='vertical-timeline-element-subtitle'>{position}</h4>
        <p>
          {summary}
        </p>
      </VerticalTimelineElement>
      // <div className='col-md-6'>
      //   <div className='work-item'>
      //     <div className='work-ico'>
      //       <i className='glyphicon glyphicon-briefcase' />
      //     </div>
      //     <div className='work-desc'>
      //       <h4>
      //         {position} - <a href={website}>{company}</a>
      //       </h4>
      //       <h6>{startDate} - {endDate}</h6>
      //       <p>{summary}</p>
      //     </div>
      //   </div>
      // </div>
    )
  }
}

Company.propTypes = {
  data: PropTypes.object.isRequired
}

export default Company
