import React, { Component } from 'react'

class Dashboard extends Component {
  render () {
    return (
      <React.Fragment>
        <header id='dashboard'>
          <section id='large-header' className='large-header'>
            <canvas id='animated-canvas' />
            <div className='overlay'>
              <h1 id='main-title' className='animated rollIn main-title'>
                Abhishek Maharjan
              </h1>
            </div>
          </section>
        </header>
      </React.Fragment>
    )
  }
}

export default Dashboard
