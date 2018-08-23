import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      quote: {}
    }
  }

  componentWillReceiveProps (props) {
    this.setState({...props})
  }

  render () {
    const { quote } = this.state
    return (
      <React.Fragment>
        <section id='home' className='large-header' >
          <canvas id='animated-canvas' />
          <div className='overlay'>
            <div className='main-title'>
              {/* <h1 className='typewriter'>{name}</h1>
              <br />
              <br /> */}
              <p><i>{ quote.quote || '' }</i></p>
              <p><b>{ `-${quote.author || ''}` }</b></p>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

Dashboard.propTypes = {
  name: PropTypes.string.isRequired,
  quote: PropTypes.object
}

export default Dashboard
