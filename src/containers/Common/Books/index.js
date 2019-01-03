import React, { Component } from 'react'
import Modal from 'react-modal'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Gallery from 'react-photo-gallery'
import BookShelf from '../BookShelf'

import './styles.css'

// Modal.setAppElement('#root')

class Book extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      shelves: []
    }
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentWillReceiveProps (props) {
    this.setState({shelves: props.shelves})
  }

  openModal () {
    this.setState({modalIsOpen: true})
  }

  afterOpenModal () {
    document.getElementById('root').style.filter = 'blur(5px)'
  }

  closeModal () {
    document.getElementById('root').style.filter = 'blur(0px)'
    this.setState({modalIsOpen: false})
  }

  render () {
    const { shelves } = this.state
    // let currentlyReading = []
    let readBooks = []
    let favoriteBooks = []
    if (shelves.length > 0) {
      readBooks = shelves.filter(shelf => shelf.shelf === 'read')[0].books
      // currentlyReading = shelves.filter(shelf => shelf.shelf === 'currently-reading')[0].books
      favoriteBooks = shelves.filter(shelf => shelf.shelf === 'favorites')[0].books
    }
    return (
      <div>
        <Gallery
          photos={favoriteBooks.map((book, idx) => ({
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
          direction='row'
        />
        <span className='books_link' onClick={this.openModal}>
          <Glyphicon glyph='plus' /> More Books
        </span>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          // style={customStyles}
          className='booksModal'
          overlayClassName='ModalOverlay'
          contentLabel='Books'
        >
          <div className='bookModalContent'>
            <BookShelf books={readBooks} />
          </div>
        </Modal>
      </div>
    )
  }
}

export default Book
