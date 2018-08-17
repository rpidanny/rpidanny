import React, { Component } from 'react'
import Institution from '../Institution'
import PropTypes from 'prop-types'

class Education extends Component {
  constructor (props) {
    super(props)
    this.state = {
      institutions: props.institutions
    }
  }

  /**
   * Returns an array with arrays of the given size.
   *
   * @param myArray {Array} Array to split
   * @param chunkSize {Integer} Size of every group
   */
  chunkArray (myArray, chunkSize) {
    const cloneArray = myArray.slice()
    const results = []

    while (cloneArray.length) {
      results.push(cloneArray.splice(0, chunkSize))
    }
    return results
  }

  render () {
    const { institutions } = this.state
    const groups = this.chunkArray(institutions, 2)
    return (
      <div>
        <div className='inner-title'>
          <h3>My Education</h3>
          <p>
              The studies which partially made the developer that I am
              now.
          </p>
        </div>
        <div className='inner-content'>
          {
            groups.map((group, idx) => {
              return (
                <div className='row' key={idx} >
                  {group.map((inst, i) => <Institution data={inst} key={i} />)}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

Education.propTypes = {
  institutions: PropTypes.array.isRequired
}

export default Education
