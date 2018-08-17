import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getSocialIcon } from '../../../util'
import './styles.css'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: props.data
    }
  }

  render () {
    const {network, url} = this.state.data
    return (
      <div className='ico'>
        <a className='no-underline' href={url}>
          <span className='saucisson'>{getSocialIcon(network)}</span>
        </a>
      </div>
    )
  }
}

Profile.propTypes = {
  data: PropTypes.object.isRequired
}

export default Profile
