import React, { Component, lazy, Suspense } from 'react'
import Modal from 'react-modal'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Gallery from 'react-photo-gallery'

import Fallback from '../Fallback'
import LazyImage from '../LazyImage'

import favoriteBooks from '../../../data/books/favorites.json'
import readBooks from '../../../data/books/read.json'

import { getGraphDataV2 } from './helper'

import './styles.css'

const BookShelf = lazy(() => import('../BookShelf'))
const NetworkGraph = lazy(() => import('../NetworkGraph'))
// Modal.setAppElement('#root')

class Book extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      selectedModal: 0,
      shelves: []
    }
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount () {
    // open modal for development
    // this.openModal(2)
  }

  openModal (selectedModal) {
    this.setState({
      modalIsOpen: true,
      selectedModal
    })
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
    const { selectedModal } = this.state

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
          direction='column'
          columns={5}
          margin={0}
          ImageComponent={LazyImage}
        />
        <div className='bookActions'>
          <span className='books_link' onClick={() => this.openModal(0)}>
            <Glyphicon glyph='plus' /> More Books
          </span>
          <span className='books_link' onClick={() => this.openModal(1)}>
            <Glyphicon glyph='plus' /> Explore Books
          </span>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          className='booksModal'
          overlayClassName='ModalOverlay'
          contentLabel='Books'
        >
          <div className='bookModalContent'>
            { getModalContent(selectedModal, this) }
          </div>
        </Modal>
      </div>
    )
  }
}

const getModalContent = (selectedModal, context) => {
  if (selectedModal === 0) {
    return (
      <Suspense fallback={<Fallback />} >
        <div className='bookShelf' >
          <BookShelf
            books={readBooks}
            margin={0}
            columns={7}
          />
        </div>
      </Suspense>
    )
  } else if (selectedModal === 1) {
    const { nodes, links } = getGraphDataV2()
    return (
      <Suspense fallback={<Fallback />} >
        <NetworkGraph
          nodes={nodes}
          links={links}
          onClick={event => console.log('Click', event)}
          onDoubleClick={event => console.log('Double Click', event)}
          clusterRadiusScale={1.2}
          cluster
        />
      </Suspense>
    )
  }
}

export default Book
