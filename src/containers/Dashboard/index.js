import React, { Component } from 'react'
import Tilt from 'react-tilt'
import Particles from 'react-particles-js'
import PropTypes from 'prop-types'
import './styles.css'
import particlesConfig from '../../assets/particlesjs-config.json'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: props.name,
      quote: props.quote
    }
  }

  componentWillReceiveProps (props) {
    this.setState({quote: props.quote})
  }

  render () {
    const { quote } = this.state
    return (
      <React.Fragment>
        <section id='home' className='large-header' >
          <Particles
            params={particlesConfig}
          />
          <div className='overlay'>
            <Tilt
              options={{
                max: 25,
                scale: 1.1
              }}
            >
              <div className='main-title'>
                {/* <h1 className='typewriter'>{name}</h1>
                <br />
                <br /> */}
                <div className='content'>
                  <p><i>{ quote.quote || '' }</i></p>
                  <p><b>{ `-${quote.author || ''}` }</b></p>
                </div>
              </div>
            </Tilt>
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
