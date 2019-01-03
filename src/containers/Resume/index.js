import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Work from '../Common/Work'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Education from '../Common/Education'
import './styles.css'

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
              <Glyphicon glyph='briefcase' /> / Resume
            </h2>
          </div>
          <div className='col-md-12'>
            <div className='content'>
              <Work companies={work} />
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
