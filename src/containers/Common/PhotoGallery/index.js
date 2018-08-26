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
    return <Gallery photos={this.state.photos} />
  }
}

export default App
