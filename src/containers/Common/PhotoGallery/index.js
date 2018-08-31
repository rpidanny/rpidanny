import React, { Component } from 'react'
import Gallery from 'react-photo-gallery'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      photos: props.photos
    }
  }
  render () {
    return <Gallery photos={this.state.photos.map(photo => ({
      src: require(`../../../assets/images/photography/${photo.src}`),
      width: photo.width,
      height: photo.height
    }))} />
  }
}

export default App
