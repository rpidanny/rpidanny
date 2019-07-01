import React from 'react'

import PropTypes from 'prop-types'

import './styles.css'

/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} Array to split
 * @param chunkSize {Integer} Size of every group
 */
const chunkArray = (myArray, chunkSize) => {
  const cloneArray = myArray.slice()
  const results = []

  while (cloneArray.length) {
    results.push(cloneArray.splice(0, chunkSize))
  }
  return results
}

const Certifications = (props) => {
  const { certifications } = props
  const groups = chunkArray(certifications, 3)
  return (
    <div>
      <div className='inner-title'>
        <h3>Certifications</h3>
        <p>Officially certified in</p>
      </div>
      <div className='inner-content certifications'>
        {
          groups.map((group, idx) => {
            return (
              <div className='row' key={idx} style={{ marginBottom: 0 }} >
                {group.map((cert, i) => {
                  return (
                    <div className={`col-md-${12 / group.length} certification`}>
                      <a href={cert.url} target='_blank' rel='noopener noreferrer' >
                        <img
                          src={require(`../../../assets/images/certifications/${cert.image}`)}
                          alt={cert.title}
                        />
                      </a>
                    </div>
                  )
                })}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

Certifications.propTypes = {
  certifications: PropTypes.array.isRequired
}

export default Certifications
