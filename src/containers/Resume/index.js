import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Work from '../Common/Work'
import Education from '../Common/Education'

class Resume extends Component {
  constructor (props) {
    super(props)
    this.state = {
      education: props.education,
      work: props.work
    }
  }
  render () {
    const { education, work } = this.state
    return (
      <React.Fragment>
        <section className='row resume' id='resume'>
          <div className='col-md-12 title'>
            <h2>
              <span className='glyphicon glyphicon-briefcase' /> / Resume
            </h2>
          </div>
          {/* Experience */}
          <div className='col-md-12'>
            <div className='content'>
              <Work companies={work} />

              {/* mY Education.... */}
              <div className='divider'>
                <span>
                  <i className='glyphicon glyphicon-star' />
                </span>
              </div>
              <Education institutions={education} />
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

Resume.propTypes = {
  education: PropTypes.array.isRequired,
  work: PropTypes.array.isRequired
}

export default Resume
