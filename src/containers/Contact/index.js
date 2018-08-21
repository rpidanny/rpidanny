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
      data: {},
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
    }
    this.setState(prev => ({...prev, ...validaton, ...update}))
  }

  validateInputs () {
    const { nameValidation, emailValidation, messageValidation } = this.state
    return (nameValidation === 'success' && emailValidation === 'success' && messageValidation === 'success')
  }

  sendEmail () {
    console.log(this.state)
    const {name, email, message} = this.state
    if (this.validateInputs()) {
      
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
                        placeholder='Name'
                        name='name'
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
                        onChange={this.handleUserInput}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Button
                        bsStyle='primary'
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
  data: PropTypes.object.isRequired
}

export default Contact
