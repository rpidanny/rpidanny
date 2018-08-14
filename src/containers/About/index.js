import React, { Component } from 'react'
import './styles.css'
import ProfilePicture from '../../assets/images/abhishek1.jpg'

class About extends Component {
  render () {
    return (
      <React.Fragment>
        <header id='home'>
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
                  <h3>Abhishek Maharjan</h3>
                  <p>
                    <br />{' '}
                  </p>
                  <p>
                    I'm an Electronics Engineer who loves all kinds of
                    technologies. I'm not tied to just software or hardware. I
                    think software and hardware are two halves of a whole.
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
                    <img
                      src={ProfilePicture}
                      width={200}
                      height={200}
                      alt='Abhishek Maharjan'
                      className='img-circle img-thumbnail'
                      title='Sandboarding at Sharjah Desert'
                    />
                  </div>
                  <div className='dl-btn'>
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
                  </div>
                </div>
              </div>
            </div>
          </section>
        </header>
      </React.Fragment>
    )
  }
}

export default About
