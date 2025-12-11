import React, { CSSProperties } from 'react'
import LazyLoad from 'react-lazyload'

import './styles.css'

const baseStyle: CSSProperties = {
  backgroundColor: '#eee',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  height: '100%'
}

const defaultImgStyle: CSSProperties = {
  transition: 'transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s',
  display: 'block',
  width: '100%',
  height: '100%'
}

interface LazyImageProps {
  photo?: any;
  imageProps?: any;
  wrapperStyle?: CSSProperties;
  onClick?: (event: React.MouseEvent) => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  imageProps,
  wrapperStyle,
  onClick
}) => {
  return (
    <div
      style={{ ...baseStyle, ...wrapperStyle }}
      className='lazy-image'
      onClick={onClick}
    >
      <LazyLoad offset={200} once>
        <img
          {...imageProps}
          style={{ ...defaultImgStyle, ...(imageProps?.style || {}) }}
          alt={imageProps?.alt || ''}
        />
      </LazyLoad>
    </div>
  )
}

export default LazyImage
