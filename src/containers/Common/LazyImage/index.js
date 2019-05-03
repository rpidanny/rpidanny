import React from 'react'
import LazyLoad from 'react-lazyload'

import './styles.css'

const separation = 0.1

const style = {
  backgroundColor: '#eee',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative'
}

const imgStyle = {
  transition: 'transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s'
}

const LazyImage = ({
  index,
  onClick,
  photo,
  margin,
  direction,
  top,
  left
}) => {
  if (direction === 'column') {
    style.position = 'absolute'
    style.left = left
    style.top = top
  }
  const width = Math.floor((1 - separation) * photo.width)
  const height = Math.floor((1 - separation) * photo.height)
  return (
    <div
      style={{ margin, height, width, ...style }}
      className='lazy-image'
    >
      <LazyLoad>
        <img
          style={
            {
              ...imgStyle,
              height,
              width
            }
          }
          {...photo}
          onClick={e => onClick(e, { index, photo })}
          alt={photo.alt}
        />
      </LazyLoad>
    </div>
  )
}

export default LazyImage
