import React, { Component } from 'react'
import Image from 'react-bootstrap/lib/Image'
import PropTypes from 'prop-types'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import './styles.css'
import ProfilePicture from '../../assets/images/abhishek1.jpg'
import Social from '../Common/Social'

class About extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: props.data
    }
  }

  render () {
    const {name, summary, profiles} = this.state.data
    return (
      <React.Fragment>
        <section className='row about' id='about'>
          <div className='col-md-12 title'>
            <h2>
              <Glyphicon glyph='user' /> / About me
            </h2>
          </div>
          <div className='col-md-12'>
            <div className='content'>
              <div className='inner-title'>
                <h3>Hi</h3>
                <h3>my name is </h3>
                <h3>{name}</h3>
                <p>
                  <br />{' '}
                </p>
                <p>
                  {summary}
                  <br />
                  <br />
                </p>
              </div>
              <div className='inner-content profile'>
                <div className='img-profile'>
                  <Image src={ProfilePicture} alt={name} circle />
                </div>
                <div className='dl-btn'>
                  <Social data={profiles.cv} />
                  <p>See / Download My CV</p>
                </div>
                <div className='fol-btn'>
                  <Social data={profiles.social} />
                  <p>Follow Me On</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

About.propTypes = {
  data: PropTypes.object.isRequired
}

export default About
