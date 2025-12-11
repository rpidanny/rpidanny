import React, { CSSProperties } from 'react'
import LazyLoad from 'react-lazyload'

import './styles.css'

const separation = 0.1

const baseStyle: CSSProperties = {
  backgroundColor: '#eee',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative'
}

const imgStyle: CSSProperties = {
  transition: 'transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s'
}

interface LazyImageProps {
  index: number;
  onClick: (e: any, obj: any) => void;
  photo: any;
  margin?: number | string;
  direction: string;
  top?: number;
  left?: number;
}

const LazyImage: React.FC<LazyImageProps> = ({
  index,
  onClick,
  photo,
  margin,
  direction,
  top,
  left
}) => {
  let style: CSSProperties = { ...baseStyle }
  if (direction === 'column') {
    style = { ...style, position: 'absolute', left, top }
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
          onClick={(e) => onClick(e, { index, photo })}
          alt={photo.alt}
        />
      </LazyLoad>
    </div>
  )
}

export default LazyImage
