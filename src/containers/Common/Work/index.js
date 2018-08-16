import React, { Component } from 'react'
import { VerticalTimeline } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import Company from '../Company'
import PropTypes from 'prop-types'

class Work extends Component {
  constructor (props) {
    super(props)
    this.state = {
      companies: props.companies
    }
  }

  /**
   * Returns an array with arrays of the given size.
   *
   * @param myArray {Array} Array to split
   * @param chunkSize {Integer} Size of every group
   */
  chunkArray (myArray, chunkSize) {
    const results = []

    while (myArray.length) {
      results.push(myArray.splice(0, chunkSize))
    }
    return results
  }

  render () {
    const { companies } = this.state
    // const groups = this.chunkArray(companies, 2)
    return (
      <div>
        <div className='inner-title'>
          <h3>My Experiences</h3>
          <p>What I did in the past and what I am doing now.</p>
        </div>
        <div className='inner-content'>
          <VerticalTimeline>
            {
              // groups.map((group, idx) => {
              //   return (
              //     <div className='row' key={idx} >
              //       {group.map((inst, i) => <Company data={inst} key={i} />)}
              //     </div>
              //   )
              // })
              companies.map((company, i) => <Company data={company} key={i} />)
            }
          </VerticalTimeline>
        </div>
      </div>
    )
  }
}

Work.propTypes = {
  companies: PropTypes.array.isRequired
}

export default Work
