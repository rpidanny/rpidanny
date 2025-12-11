import React from 'react'
import './styles.css'
import CCP from '../../../assets/images/certifications/CCP.png'
import CDVA from '../../../assets/images/certifications/CDVA.png'
import CSAA from '../../../assets/images/certifications/CSAA.png'
import CSOA from '../../../assets/images/certifications/CSOA.png'

const images: { [key: string]: string } = {
  'CCP.png': CCP,
  'CDVA.png': CDVA,
  'CSAA.png': CSAA,
  'CSOA.png': CSOA
}

/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} Array to split
 * @param chunkSize {Integer} Size of every group
 */
const chunkArray = (myArray: any[], chunkSize: number) => {
  const cloneArray = myArray.slice()
  const results = []

  while (cloneArray.length) {
    results.push(cloneArray.splice(0, chunkSize))
  }
  return results
}

interface CertificationsProps {
  certifications: any[];
}

const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {
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
                {group.map((cert: any, i: number) => {
                  return (
                    <div className={`col-md-${12 / group.length} certification`} key={i}>
                      <a href={cert.url} target='_blank' rel='noopener noreferrer' >
                        <img
                          src={images[cert.image] || ''}
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

export default Certifications
