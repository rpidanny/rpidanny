import React, { Component } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography
} from 'react-simple-maps'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import worldMap from '../../assets/world-50m.json'
import './styles.css'

class Travel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visitedCountries: []
    }
  }

  componentWillReceiveProps (props) {
    this.setState({visitedCountries: props.countries})
  }

  getFillColor (country, visitedCountries) {
    if (visitedCountries.indexOf(country) > -1) {
      return '#f97c39'
    }
    return '#999999'
  }

  getHoverColor (country, visitedCountries) {
    if (visitedCountries.indexOf(country) > -1) {
      return '#d05000'
    }
    return '#263238'
  }

  render () {
    const { visitedCountries } = this.state
    if (visitedCountries.length > 0) {
      return (
        <React.Fragment>
          <section className='row travel' id='travel' >
            <div className='col-md-12 title'>
              <h2>
                <Glyphicon glyph='plane' /> / Travel
              </h2>
            </div>
            <div className='col-md-12'>
              <div className='content travelMap' >
                <div className='inner-title'>
                  <p>
                    Countries visited so far: <i><b>{visitedCountries.length}</b></i>
                  </p>
                </div>
                <ComposableMap
                  projectionConfig={{
                    scale: 220,
                    rotation: [0, 0, 0],
                    yOffset: 70
                  }}
                  width={980}
                  height={551}
                  style={{
                    width: '100%',
                    height: 'auto'
                  }}
                >
                  <Geographies geography={worldMap} >
                    {(geographies, projection) => geographies.map((geography, i) => (
                      <Geography
                        key={i}
                        geography={geography}
                        projection={projection}
                        onClick={this.handleClick}
                        style={{
                          default: {
                            fill: this.getFillColor(geography.properties.NAME, visitedCountries),
                            stroke: '#607D8B',
                            strokeWidth: 0.75,
                            outline: 'none'
                          },
                          hover: {
                            fill: this.getHoverColor(geography.properties.NAME, visitedCountries),
                            stroke: '#607D8B',
                            strokeWidth: 0.75,
                            outline: 'none'
                          },
                          pressed: {
                            fill: '#263238',
                            stroke: '#607D8B',
                            strokeWidth: 0.75,
                            outline: 'none'
                          }
                        }}
                      />
                    ))}
                  </Geographies>
                </ComposableMap>
              </div>
            </div>
          </section>
        </React.Fragment>
      )
    }
    return <div />
  }
}

export default Travel
