import React, { Component } from 'react'
import Image from 'react-bootstrap/lib/Image'
import Tilt from 'react-tilt'
import PropTypes from 'prop-types'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import './styles.css'
import ProfilePicture from '../../assets/images/pp_with_linus.jpg'
import Social from '../Common/Social'

class About extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: props.data
    }
  }

  render () {
    const {name, summary, profiles, email, phone} = this.state.data
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
              <div className='about-holder'>
                <div className='inner-title'>
                  <h3>Hi</h3>
                  <h3>my name is </h3>
                  <h2>{name}</h2>
                  {
                    summary.map(element => (
                      <p > {element} </p>
                    ))
                  }
                </div>
                <div className='inner-content profile'>
                  <div className='dl-btn'>
                    <Social data={profiles.cv} />
                    <p>See / Download My CV</p>
                  </div>
                  <div className='img-profile'>
                    <Tilt
                      options={{ max: 25 }}
                    >
                      <Image src={ProfilePicture} alt={name} circle />
                    </Tilt>
                  </div>
                  <div className='fol-btn'>
                    <Social data={profiles.social} />
                    <p>Follow Me On</p>
                  </div>
                </div>
                <div className='info'>
                  <ul>
                    <li>
                      <div className='ico'>
                        <a href={`mailto:${email}`}>
                          <i className='glyphicon glyphicon-envelope' />
                        </a>
                      </div>
                      <p><a href={`mailto:${email}`}>{email}</a></p>
                    </li>
                    <li>
                      <div className='ico'>
                        <a href={`tel:${phone}`}>
                          <i className='glyphicon glyphicon-earphone' />
                        </a>
                      </div>
                      <p><a href={`tel:${phone}`}>{phone}</a></p>
                    </li>
                    <li>
                      <div className='ico'>
                        <a href={`https://wa.me/${phone}`}>
                          <span className='saucisson'>U</span>
                        </a>
                      </div>
                      <p>
                        <a href={`https://wa.me/${phone}`} >WhatsApp</a>
                      </p>
                    </li>
                  </ul>
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
