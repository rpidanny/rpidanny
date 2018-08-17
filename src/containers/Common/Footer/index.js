import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      quote: {}
    }
  }

  componentWillReceiveProps (props) {
    this.setState({quote: props.quote})
  }

  render () {
    const { quote, author } = this.state.quote
    return (
      <footer className='footer'>
        <div className='quotes'>
          <div className='quote-body'>
            <blockquote> {quote} </blockquote>
          </div>
          <div className='quote-by'> {author} </div>
        </div>
      </footer>
    )
  }
}

Footer.propTypes = {
  quote: PropTypes.object.isRequired
}

export default Footer
