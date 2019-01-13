import React, { Component } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography
} from 'react-simple-maps'
import worldMap from '../../../assets/world-50m.json'
import './styles.css'

class Travel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      countries: props.countries,
      spanStyle: {
        opacity: 0
      }
    }
  }

  componentWillReceiveProps (props) {
    this.setState({countries: props.countries})
  }

  getFillColor (country, countries) {
    if (countries.indexOf(country) > -1) {
      return '#92c14d'
    }
    return '#999999'
  }

  getHoverColor (country, countries) {
    if (countries.indexOf(country) > -1) {
      return '#62912d'
    }
    return '#263238'
  }

  render () {
    const { countries, country, spanStyle } = this.state
    if (countries && countries.length > 0) {
      return (
        <div>
          <React.Fragment>
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
                    onMouseEnter={(country) => {
                      this.setState({
                        country: country.properties.NAME
                      })
                    }}
                    onMouseOver={(event) => {
                      this.setState({
                        spanStyle: {
                          opacity: 1,
                          left: event.clientX - ((window.screen.availWidth - 960) / 2),
                          top: event.clientY
                        }
                      })
                    }}
                    onMouseOut={(country, event) => {
                      this.setState({
                        spanStyle: {
                          opacity: 0
                        }
                      })
                    }}
                    style={{
                      default: {
                        fill: this.getFillColor(geography.properties.NAME, countries),
                        stroke: '#607D8B',
                        strokeWidth: 0.75,
                        outline: 'none'
                      },
                      hover: {
                        fill: this.getHoverColor(geography.properties.NAME, countries),
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
          </React.Fragment>
          <span className='countryTooltip' style={spanStyle}>{country}</span>
        </div>
      )
    }
    return <div />
  }
}

export default Travel
