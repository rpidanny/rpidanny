import React, { Component } from 'react'
import './styles.css'

class Dashboard extends Component {
  render () {
    return (
      <React.Fragment>
        <section id='large-header' className='large-header'>
          <canvas id='animated-canvas' />
          <div className='overlay'>
            <h1 id='main-title' className='animated rollIn main-title'>
              Abhishek Maharjan
            </h1>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

export default Dashboard
