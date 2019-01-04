import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import PhotoGallery from '../Common/PhotoGallery'
import WorldMap from '../Common/WorldMap'
import Books from '../Common/Books'
import './styles.css'

class Interests extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: props.data
    }
  }

  componentWillReceiveProps (props) {
    this.setState({data: props.data})
  }

  render () {
    const { photography, travel, shelves } = this.state.data
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
                    <h3><Glyphicon glyph='book' /> Books</h3>
                    <p>
                      Some of my favorite books:
                    </p>
                  </div>
                  <Books shelves={shelves} />
                </div>
                <div className='col-md-12'>
                  <div className='divider'>
                    <span>
                      <i class='glyphicon glyphicon-star' />
                    </span>
                  </div>
                </div>
                <div className='col-md-12'>
                  <div className='inner-title'>
                    <h3><Glyphicon glyph='camera' /> Photography</h3>
                    <p>
                      Some random photos that i took.
                    </p>
                  </div>
                  <PhotoGallery photos={photography.photos} />
                </div>
                <div className='col-md-12'>
                  <div className='divider'>
                    <span>
                      <i class='glyphicon glyphicon-star' />
                    </span>
                  </div>
                </div>
                <div className='col-md-12'>
                  <div className='inner-title'>
                    <h3><Glyphicon glyph='plane' /> Travel</h3>
                    <p>
                      Countries visited so far: <i><b>{travel.countriesVisited.length}</b></i>
                    </p>
                  </div>
                  <WorldMap countries={travel.countriesVisited} />
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
  data: PropTypes.object.isRequired
}

export default Interests
