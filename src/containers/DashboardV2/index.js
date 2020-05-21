import React, { Component } from 'react'
import Tilt from 'react-tilt'
// import Particles from 'react-particles-js'
import PropTypes from 'prop-types'
import './styles.css'
// import particlesConfig from '../../assets/particlesjs-config.json'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: props.name
    }
  }

  render () {
    const { name } = this.state
    return (
      <React.Fragment>
        <section id='home' className='large-header' >
          {/* <Particles
            params={particlesConfig}
          /> */}
          <div className='overlay'>
            <Tilt
              options={{
                max: 25,
                scale: 1.1
              }}
            >
              <div className='main-title'>
                <p><i>Hi, My Name is</i></p>
                <div style={{'display': 'inline-block'}}>
                  <h1 className='typewriter'>{name}</h1>
                </div>
                <br />
                <br />
                {/* <div className='content'>
                  <p><b>{ `${name || ''}` }</b></p>
                </div> */}
              </div>
            </Tilt>
            <p className='arrow-container'>
              <i class='arrow down' />
            </p>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

Dashboard.propTypes = {
  name: PropTypes.string.isRequired
}

export default Dashboard
