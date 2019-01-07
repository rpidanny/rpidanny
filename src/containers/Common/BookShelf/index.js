import React, { Component } from 'react'
import Gallery from 'react-photo-gallery'
import LazyImage from '../LazyImage'

class BookShelf extends Component {
  constructor (props) {
    super(props)
    this.state = {
      books: props.books
    }
  }

  componentWillReceiveProps (props) {
    this.setState({books: props.books})
  }

  render () {
    const { books } = this.state
    if (books.length > 0) {
      return <Gallery
        photos={this.state.books.map((book, idx) => ({
          ...book,
          src: book.small_image_url.replace(/.(s\/)/g, str => {
            const tmp = str.split('s/')
            if (tmp[0] < 58) {
              return tmp[0].concat('l/')
            }
            return str
          }),
          width: 98,
          height: 148,
          alt: book.title,
          key: idx
        }))}
        onClick={
          (event, obj) => {
            console.log(obj)
            window.open(obj.photo.link, '_blank')
          }
        }
        direction='column'
        margin={this.props.margin}
        columns={this.props.columns}
        ImageComponent={LazyImage}
      />
    }
    return (<div />)
  }
}

export default BookShelf
