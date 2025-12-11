import React from 'react'
// import Tilt from 'react-parallax-tilt'
import './styles.css'

interface DashboardProps {
  name: string;
}

const Dashboard: React.FC<DashboardProps> = ({ name }) => {
  return (
    <React.Fragment>
      <section id='home' className='large-header'>
        <div className='overlay'>
          {/* <Tilt
            tiltMaxAngleX={25}
            tiltMaxAngleY={25}
            scale={1.1}
          > */}
            <div className='main-title'>
              <p><i>Hi, My Name is</i></p>
              <div style={{ display: 'inline-block' }}>
                <h1 className='typewriter'>{name}</h1>
              </div>
              <br />
              <br />
            </div>
          {/* </Tilt> */}
          <p className='arrow-container'>
            <i className='arrow down' />
          </p>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Dashboard
