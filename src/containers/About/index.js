import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'
import ProfilePicture from '../../assets/images/abhishek1.jpg'
import Image from 'react-bootstrap/lib/Image'
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
              <span className='glyphicon glyphicon-user' /> / About me
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
                <p>
                  <i>
                    "People who are really serious about software should make
                    their own hardware"
                  </i>
                </p>
                <p>
                  <b> - Alan Kay </b>
                </p>
              </div>
              <div className='inner-content profile'>
                <div className='img-profile'>
                  <img src={ProfilePicture} className='rounded-circle' />
                </div>
                <Social data={profiles} />
                {/* <div className='dl-btn'>
                    <div className='ico'>
                      <a
                        className='no-underline'
                        href='https://github.com/rpidanny'
                      >
                        <span className='saucisson'>Q</span>
                      </a>
                    </div>
                    <div className='ico'>
                      <a
                        className='no-underline'
                        href='https://np.linkedin.com/in/abhishek-maharjan-5b401999'
                      >
                        <span className='saucisson'>j</span>
                      </a>
                    </div>
                    <div className='ico'>
                      <a href='file/resume.pdf' target='_blank'>
                        <i className='glyphicon glyphicon-floppy-disk' />
                      </a>
                    </div>
                    <p>See / Download My CV</p>
                  </div>
                  <div className='fol-btn'>
                    <div className='ico'>
                      <a
                        className='no-underline'
                        href='https://www.facebook.com/tsukuyomi'
                      >
                        <span className='saucisson'>b</span>
                      </a>
                    </div>
                    <div className='ico'>
                      <a
                        className='no-underline'
                        href='https://plus.google.com/+AbhishekMaharjan'
                      >
                        <span className='saucisson'>c</span>
                      </a>
                    </div>
                    <div className='ico'>
                      <a
                        className='no-underline'
                        href='https://www.youtube.com/channel/UCaJzQopUr58rZwpW8y3q6xA'
                      >
                        <span className='saucisson'>r</span>
                      </a>
                    </div>
                    <div className='ico'>
                      <a
                        className='no-underline'
                        href='https://instagram.com/rpidanny'
                      >
                        <span className='saucisson'>x</span>
                      </a>
                    </div>
                    <p>Follow Me On</p>
                  </div> */}
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
