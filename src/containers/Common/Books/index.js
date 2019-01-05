import React, { Component } from 'react'
import Modal from 'react-modal'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Gallery from 'react-photo-gallery'
import { ForceD3 } from '../Graph'
// import BookShelf from '../BookShelf'

import favoriteBooks from '../../../data/books/favorites.json'
import { getGraphData } from './helper'

import './styles.css'

// Modal.setAppElement('#root')

const entityColors = {
  nodeTypes: {
    BOOK: '#336B87',
    AUTHOR: '#FB6542',
    PUBLISHER: '#7D4427'
  },
  bookShelf: {
    'read': '#FFBB00',
    'to-read': '#375E97',
    'currently-reading': '#3F681C'
  }
}

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

  componentDidMount () {
    // open modal for development
    this.openModal()
  }

  openModal () {
    this.setState({modalIsOpen: true})
  }

  afterOpenModal () {
    const rootElement = document.getElementById('root')
    if (rootElement) {
      rootElement.style.filter = 'blur(5px)'
    }
  }

  closeModal () {
    const rootElement = document.getElementById('root')
    if (rootElement) {
      rootElement.style.filter = 'blur(0px)'
    }
    this.setState({modalIsOpen: false})
  }

  render () {
    const { nodes, links } = getGraphData()
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
          <Glyphicon glyph='plus' /> Explore Books
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
            {/* <BookShelf books={readBooks} /> */}
            <ForceD3
              nodes={nodes}
              links={links}
              entityColors={entityColors}
              setPropertiesInfo={(data) => console.log(data)}
              selectedEntityTypes={[]}
              expandNode={node => {
                console.log(node)
                if (node.type === 'BOOK' || node.type === 'AUTHOR') {
                  window.open(node.link, '_blank')
                }
              }}
              exitHandler={this.closeModal}
            />
          </div>
        </Modal>
      </div>
    )
  }
}

export default Book
