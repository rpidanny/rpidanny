import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import PhotoGallery from '../Common/PhotoGallery'
import WorldMap from '../Common/WorldMap'
import './styles.css'

class Interests extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: props.interests,
      countries: props.countries
    }
  }
  render () {
    const { countries } = this.state
    return (
      <React.Fragment>
        <section className='row interests' id='interests'>
          <div className='col-md-12 title'>
            <h2>
              <Glyphicon glyph='heart' /> / Interests
            </h2>
          </div>
          <div className='col-md-12'>
            <div className='content'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='inner-title'>
                    <h3>Photography</h3>
                    <p>
                      Some random photos that i took.
                    </p>
                  </div>
                  <PhotoGallery />
                </div>
                <div className='divider'>
                  <Glyphicon glyph='star' />
                </div>
                <div className='col-md-12'>
                  <div className='inner-title'>
                    <h3>Travel</h3>
                    <p>
                      Countries visited so far: <i><b>{countries.length}</b></i>
                    </p>
                  </div>
                  <WorldMap countries={countries} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

Interests.propTypes = {
  data: PropTypes.array.isRequired
}

export default Interests
