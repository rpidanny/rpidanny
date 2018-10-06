import fetch from 'isomorphic-fetch'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import {Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import './styles.css'

class Contact extends Component {
  constructor (props) {
    super(props)
    this.handleUserInput = this.handleUserInput.bind(this)
    this.getValidationState = this.getValidationState.bind(this)
    this.validateInputs = this.validateInputs.bind(this)
    this.sendEmail = this.sendEmail.bind(this)
    this.state = {
      myEmail: props.email,
      name: '',
      email: '',
      message: '',
      nameValidation: null,
      emailValidation: null,
      messageValidation: null,
      isLoading: false
    }
  }

  getValidationState () {
    const length = this.state.name.length
    if (length > 1) return 'success'
    else if (length > 5) return 'warning'
    else if (length > 0) return 'error'
    return null
  }

  componentWillReceiveProps (props) {
    this.setState({ myEmail: props.email })
  }

  handleUserInput (e) {
    const validaton = {}
    const update = {
      [e.target.name]: e.target.value
    }
    switch (e.target.name) {
      case 'name':
        if (isEmpty(e.target.value)) {
          validaton.nameValidation = 'error'
        } else {
          validaton.nameValidation = 'success'
        }
        break
      case 'email':
        if (!isEmail(e.target.value)) {
          validaton.emailValidation = 'error'
        } else {
          validaton.emailValidation = 'success'
        }
        break
      case 'message':
        if (isEmpty(e.target.value)) {
          validaton.messageValidation = 'error'
        } else {
          validaton.messageValidation = 'success'
        }
        break
      default:
        break
    }
    this.setState(prev => ({...prev, ...validaton, ...update}))
  }

  validateInputs () {
    const { nameValidation, emailValidation, messageValidation } = this.state
    return (nameValidation === 'success' && emailValidation === 'success' && messageValidation === 'success')
  }

  sendEmail () {
    const {myEmail, name, email, message} = this.state
    if (this.validateInputs()) {
      const payload = {
        from: 'Contact Me',
        to: myEmail,
        subject: `Msg from: ${email}`,
        text: `Name: ${name}\n\nEmail: ${email}\n\nMessage: ${message}`
      }
      // Send Email
      this.setState({isLoading: true})
      fetch('https://us-central1-mailer-69581.cloudfunctions.net/mail/', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.status === 200) {
          response.json().then(data => {
            this.setState({
              isLoading: false,
              email: '',
              name: '',
              message: ''
            })
            window.alert('Message Sent!')
            console.log(data)
          })
        } else {
          console.log(response)
          throw new Error('Email send failed.')
        }
      }).catch(() => {
        window.alert('Failed to send message. Please try sending me an email instead.')
        this.setState({isLoading: false})
      })
    } else {
      const validations = {}
      if (isEmpty(name)) {
        validations.nameValidation = 'error'
      }
      if (!isEmail(email)) {
        validations.emailValidation = 'error'
      }
      if (isEmpty(message)) {
        validations.messageValidation = 'error'
      }
      this.setState(prev => ({...prev, ...validations}))
    }
  }

  render () {
    const { isLoading, nameValidation, emailValidation, messageValidation } = this.state
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
              {/* <div className='inner-content contact-holder'> */}
              <div className='inner-content '>
                <div className='address'>
                  <Form horizontal>
                    {/* Name */}
                    <FormGroup
                      controlId='formHorizontalname'
                      validationState={nameValidation}
                    >
                      <ControlLabel>Name</ControlLabel>
                      <FormControl
                        type='text'
                        placeholder='Your Name'
                        name='name'
                        value={this.state.name}
                        onChange={this.handleUserInput}
                      />
                    </FormGroup>
                    {/* Email */}
                    <FormGroup
                      controlId='formHorizontalEmail'
                      validationState={emailValidation}
                    >
                      <ControlLabel>Email</ControlLabel>
                      <FormControl
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={this.state.email}
                        onChange={this.handleUserInput}
                      />
                    </FormGroup>
                    {/* Message */}
                    <FormGroup
                      controlId='formHorizontalMessage'
                      validationState={messageValidation}
                    >
                      <ControlLabel>Message</ControlLabel>
                      <FormControl
                        componentClass='textarea'
                        rows={4}
                        placeholder='Message'
                        name='message'
                        value={this.state.message}
                        onChange={this.handleUserInput}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Button
                        className='btnSend'
                        disabled={isLoading}
                        onClick={!isLoading ? this.sendEmail : null}
                      >
                        Send
                      </Button>
                    </FormGroup>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

Contact.propTypes = {
  email: PropTypes.string.isRequired
}

export default Contact
