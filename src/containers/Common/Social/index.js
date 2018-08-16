import React, { Component } from 'react'
import Profile from '../Profile'
import PropTypes from 'prop-types'

class Social extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: props.data
    }
  }

  render () {
    const profiles = this.state.data
    return (
      <div className='fol-btn'>
        {
          profiles.map((profile, idx) => <Profile data={profile} key={idx} />)
        }
      </div>
    )
  }
}

Social.propTypes = {
  data: PropTypes.array.isRequired
}

export default Social
