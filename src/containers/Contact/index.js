import React, { Component } from 'react'
import vcard from '../../assets/images/vcard.png'

class Contact extends Component {
  render () {
    return (
      <React.Fragment>
        <header id='contact'>
          <section className='row contact' id='contact'>
            <div className='col-md-12 title'>
              <h2>
                <span className='glyphicon glyphicon-envelope' /> / Contact
              </h2>
            </div>
            <div className='col-md-12'>
              <div className='content'>
                <div className='inner-title'>
                  <h3>get in touch with me</h3>
                  <p>Let me now if you're interested in working with me.</p>
                </div>
                <div className='inner-content contact-holder'>
                  <div className='address'>
                    <i className='glyphicon glyphicon-map-marker' />
                    <p>Lalitpur, Nepal.</p>
                    <br />
                    <img
                      src={vcard}
                      alt='qr code'
                      width={300}
                      className='img-thumbnail'
                    />
                    <br />
                    <br />
                  </div>
                  <div className='info'>
                    <ul>
                      <li>
                        <div className='ico'>
                          <i className='glyphicon glyphicon-envelope' />
                        </div>
                        <p>abhishekmaharjan1993@gmail.com</p>
                      </li>
                      <li>
                        <div className='ico'>
                          <i className='glyphicon glyphicon-earphone' />
                        </div>
                        <p>+977-9849286595</p>
                      </li>
                      <li>
                        <div className='ico'>
                          <a href='skype:abhitachi'>
                            <span className='saucisson'>g</span>
                          </a>
                        </div>
                        <p>
                          <a href='skype:abhitachi'>
                            abhitachi
                          </a>
                        </p>
                      </li>
                    </ul>
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

export default Contact
