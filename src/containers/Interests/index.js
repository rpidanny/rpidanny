import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Octicon, { Star } from '@githubprimer/octicons-react'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import './styles.css'

class Interests extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: props.interests
    }
  }
  render () {
    const { data } = this.state
    return (
      <React.Fragment>
        <section className='row interests' id='interests'>
          <div className='col-md-12 title'>
            <h2>
              <Glyphicon glyph='heart' /> / Interests
            </h2>
          </div>
          <div className='col-md-12'>
            <div className='content'>
              <div className='divider'>
                {/* <Glyphicon glyph='star' /> */}
                <Octicon icon={Star} />
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

Interests.propTypes = {
  data: PropTypes.array.isRequired
}

export default Interests
