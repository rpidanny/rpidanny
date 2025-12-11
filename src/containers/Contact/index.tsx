import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { FaEnvelope } from 'react-icons/fa'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import './styles.css'

interface ContactProps {
  email: string;
}

interface ValidationState {
  name: 'success' | 'error' | null;
  email: 'success' | 'error' | null;
  message: 'success' | 'error' | null;
}

const Contact: React.FC<ContactProps> = ({ email: myEmail }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [validation, setValidation] = useState<ValidationState>({
    name: null,
    email: null,
    message: null
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    let newValidation: 'success' | 'error' | null = null
    switch (name) {
      case 'name':
        newValidation = isEmpty(value) ? 'error' : 'success'
        setValidation(prev => ({ ...prev, name: newValidation }))
        break
      case 'email':
        newValidation = !isEmail(value) ? 'error' : 'success'
        setValidation(prev => ({ ...prev, email: newValidation }))
        break
      case 'message':
        newValidation = isEmpty(value) ? 'error' : 'success'
        setValidation(prev => ({ ...prev, message: newValidation }))
        break
      default:
        break
    }
  }

  const validateInputs = () => {
    const { name, email, message } = validation
    return name === 'success' && email === 'success' && message === 'success'
  }

  const sendEmail = () => {
    if (validateInputs()) {
      const { name, email, message } = formData
      const payload = {
        from: email,
        to: myEmail,
        subject: `Msg from: ${name}`,
        text: `Name: ${name}\n\nEmail: ${email}\n\nMessage: ${message}`
      }
      
      setIsLoading(true)
      fetch('https://dqf5ayzbgf.execute-api.eu-west-1.amazonaws.com/mabhishek/', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.status === 200) {
          response.json().then(data => {
            setIsLoading(false)
            setFormData({ name: '', email: '', message: '' })
            setValidation({ name: null, email: null, message: null })
            window.alert('Message Sent!')
            console.log(data)
          })
        } else {
          console.log(response)
          throw new Error('Email send failed.')
        }
      }).catch(() => {
        window.alert('Failed to send message. Please try sending me an email instead.')
        setIsLoading(false)
      })
    } else {
       const { name, email, message } = formData
       setValidation({
         name: isEmpty(name) ? 'error' : 'success',
         email: !isEmail(email) ? 'error' : 'success',
         message: isEmpty(message) ? 'error' : 'success'
       })
    }
  }

  return (
    <React.Fragment>
      <section className='row contact' id='contact'>
        <div className='col-md-12 title'>
          <h2>
            <FaEnvelope /> / Contact
          </h2>
        </div>
        <div className='col-md-12'>
          <div className='content'>
            <div className='inner-title'>
              <h3>get in touch with me</h3>
              <p>Let me now if you're interested in working with me.</p>
            </div>
            <div className='inner-content '>
              <div className='address'>
                <Form>
                  {/* Name */}
                  <Form.Group controlId='formHorizontalname'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Your Name'
                      name='name'
                      value={formData.name}
                      onChange={handleUserInput}
                      isValid={validation.name === 'success'}
                      isInvalid={validation.name === 'error'}
                    />
                  </Form.Group>
                  {/* Email */}
                  <Form.Group controlId='formHorizontalEmail'>
                     <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Email'
                      name='email'
                      value={formData.email}
                      onChange={handleUserInput}
                      isValid={validation.email === 'success'}
                      isInvalid={validation.email === 'error'}
                    />
                  </Form.Group>
                  {/* Message */}
                  <Form.Group controlId='formHorizontalMessage'>
                     <Form.Label>Message</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={4}
                      placeholder='Message'
                      name='message'
                      value={formData.message}
                      onChange={handleUserInput}
                      isValid={validation.message === 'success'}
                      isInvalid={validation.message === 'error'}
                    />
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Button
                      className='btnSend'
                      disabled={isLoading}
                      onClick={!isLoading ? sendEmail : undefined}
                    >
                      {isLoading ? 'Sending email....' : 'Send'}
                    </Button>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Contact
