import React, { Component } from 'react'
import Education from '../Common/Education'

class Resume extends Component {
  constructor (props) {
    super(props)
    this.state = {
      education: props.education
    }
  }
  render () {
    const { education } = this.state
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
              <div className='inner-title'>
                <h3>my Experiences</h3>
                <p>What I did in the past and what I am doing now.</p>
              </div>
              <div className='inner-content'>
                <div className='row'>
                  {/* Employment */}
                  <div className='col-md-6'>
                    <div className='work-item'>
                      <div className='work-ico'>
                        <i className='glyphicon glyphicon-briefcase' />
                      </div>
                      <div className='work-desc'>
                        <h4>
                            R&amp;D Engineer -
                          <a href='http://javra.com'>Javra Software</a>
                        </h4>
                        <h6>Feb 2016 - Present</h6>
                        <p>
                            My responsibility are to research on new
                            technologies and develop working prototypes based
                            on new technologies.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* End employment */}
                </div>
                <div className='row'>
                  {/* Employment */}
                  <div className='col-md-6'>
                    <div className='work-item'>
                      <div className='work-ico'>
                        <i className='glyphicon glyphicon-briefcase' />
                      </div>
                      <div className='work-desc'>
                        <h4>
                            IT Engineer -
                          <a href='http://spacesnepal.com'>
                              Spaces Magazine
                          </a>
                        </h4>
                        <h6>Oct 2015 - Dec 2015</h6>
                        <p>
                            Was responsible for maintaining the IT
                            infrastructure of the Company. While working here,
                            i started
                          <a href='http://us12.campaign-archive1.com/home/?u=61cc943052e189d4cf5088e2e&id=303611733c'>
                              Spaces Newsletter
                          </a>
                            ,
                          <a href='https://spacesnepalblog.wordpress.com'>
                              Spaces Blog
                          </a>{' '}
                            and researched on eCommerce platforms for the
                            company.{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* End employment */}
                  {/* Employment */}
                  <div className='col-md-6'>
                    <div className='work-item'>
                      <div className='work-ico'>
                        <i className='glyphicon glyphicon-briefcase' />
                      </div>
                      <div className='work-desc'>
                        <h4>
                            Firmware Intern -
                          <a href='http://rts.com.np'>
                              Real Time Solutions
                          </a>
                        </h4>
                        <h6>Nov 2014 - Feb 2015</h6>
                        <p>
                            During my time at
                          <a href='http://rts.com.np'>RTS</a>, i worked on
                            ZigBee Stack for NXP, USB implementation on EFM32
                            Microcontroller. I also gained a lot of experience
                            working ith RTOS.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* End employment */}
                </div>
                <div className='row'>
                  {/* Employment */}
                  <div className='col-md-6'>
                    <div className='work-item'>
                      <div className='work-ico'>
                        <i className='glyphicon glyphicon-briefcase' />
                      </div>
                      <div className='work-desc'>
                        <h4>
                            President -
                          <a href='http://robotics.keckist.edu.np/'>
                              Robotics Club Kathmandu Engineering College
                          </a>
                        </h4>
                        <h6>2012-2015</h6>
                        <p>
                            I've been a member of the
                          <a
                            href='http://robotics.keckist.edu.np'
                            title='Robotics Club'
                          >
                              Robotics Club
                          </a>{' '}
                            since 2012. Here i worked on numerous projects and
                            looked after projects done by other member as the
                            Project Coordinator. In the final year of college,
                            i managed the club as the President.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* End employment */}
                  {/* Employment */}
                  <div className='col-md-6'>
                    <div className='work-item'>
                      <div className='work-ico'>
                        <i className='glyphicon glyphicon-briefcase' />
                      </div>
                      <div className='work-desc'>
                        <h4>Workshops</h4>
                        <h6>2012 - 2015</h6>
                        <p>
                            I along with my friends from
                          <a
                            href='http://robotics.keckist.edu.np'
                            title='Robotics Club'
                          >
                              Robotics Club
                          </a>{' '}
                            have conducted various Workshops on Embedded
                            System and Robotics.{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* End employment */}
                </div>
                <div className='row'>
                  {/* Employment */}
                  <div className='col-md-6'>
                    <div className='work-item'>
                      <div className='work-ico'>
                        <i className='glyphicon glyphicon-briefcase' />
                      </div>
                      <div className='work-desc'>
                        <h4>Competitions</h4>
                        <h6>2011-Present</h6>
                        <p>
                            I've participated in a bunch of National Level
                            Robotics Competitions like Yantra and Techkriti.
                            I've also participated couple of times in other
                            technical events like Locus and MSTC.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* End employment */}
                </div>
              </div>

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

export default Resume
