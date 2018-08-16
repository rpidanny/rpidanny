import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
      <div className='col-md-6'>
        <div className='work-item'>
          <div className='work-ico'>
            <i className='glyphicon glyphicon-briefcase' />
          </div>
          <div className='work-desc'>
            <h4>
              {position} -
              <a href={website}>
                {company}
              </a>
            </h4>
            <h6>{startDate} - {endDate}</h6>
            <p>{summary}</p>
          </div>
        </div>
      </div>
    )
  }
}

Company.propTypes = {
  data: PropTypes.object.isRequired
}

export default Company
