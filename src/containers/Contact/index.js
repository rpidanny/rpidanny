import React, { Component } from 'react'
import vcard from '../../assets/images/vcard.png'
import PropTypes from 'prop-types'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import './styles.css'

class Contact extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  componentWillReceiveProps (props) {
    this.setState({data: props.data})
  }

  render () {
    if (Object.keys(this.state.data).length > 0) {
      const { email, phone, location } = this.state.data
      return (
        <React.Fragment>
          <section className='row contact' id='contact'>
            <div className='col-md-12 title'>
              <h2>
                <Glyphicon glyph='envelope' /> / Contact
              </h2>
            </div>
            <div className='col-md-12'>
              <div className='content'>
                <div className='inner-title'>
                  <h3>get in touch with me</h3>
                  <p>Let me now if you're interested in working with me.</p>
                </div>
                <div className='inner-content contact-holder'>
                  {/* TODO: make qrcode dymanic or find alternative */}
                  <div className='address'>
                    <i className='glyphicon glyphicon-map-marker' />
                    <p>{`${location.city}, ${location.country}`}</p>
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
    return <div />
  }
}

Contact.propTypes = {
  data: PropTypes.object.isRequired
}

export default Contact
