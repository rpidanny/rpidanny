import React, { Component } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography
} from 'react-simple-maps'
import { scaleLinear } from 'd3-scale'
import worldMap from '../../assets/world-50m.json'

const wrapperStyles = {
  width: '100%',
  maxWidth: 980,
  margin: '0 auto'
}

const popScale = scaleLinear()
  .domain([0, 100000000, 1400000000])
  .range(['#CFD8DC', '#607D8B', '#37474F'])

class Travel extends Component {
  render () {
    return (
      <React.Fragment>
        <section className='row travel' >
          <div style={wrapperStyles}>
            <ComposableMap
              projectionConfig={{
                scale: 180,
                rotation: [-11, 0, 0]
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
                        fill: popScale(geography.properties.pop_est),
                        stroke: '#607D8B',
                        strokeWidth: 0.75,
                        outline: 'none'
                      },
                      hover: {
                        fill: '#263238',
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
        </section>
      </React.Fragment>
    )
  }
}

export default Travel
