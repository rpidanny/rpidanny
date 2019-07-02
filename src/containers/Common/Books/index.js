import React, { Component, lazy, Suspense } from 'react'
import Modal from 'react-modal'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Gallery from 'react-photo-gallery'

import Fallback from '../Fallback'
import LazyImage from '../LazyImage'

import favoriteBooks from '../../../data/books/favorites.json'
import readBooks from '../../../data/books/read.json'


import './styles.css'

const BookShelf = lazy(() => import('../BookShelf'))
// Modal.setAppElement('#root')

class Book extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      selectedModal: 0,
      shelves: [],
      width: window.outerWidth,
      height: window.outerHeight
    }
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
    this.getColumnCount = this.getColumnCount.bind(this)
  }

  componentDidMount () {
    // open modal for development
    // this.openModal(2)
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
  }

  updateDimensions () {
    this.setState({
      width: window.outerWidth,
      height: window.outerHeight
    })
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

  getColumnCount () {
    const { width } = this.state
    // if (width >= 1500) return 7
    if (width >= 959) return 6
    if (width >= 768) return 5
    if (width >= 480) return 4
    if (width >= 240) return 3
    return 2
  }

  render () {
    const { selectedModal } = this.state

    return (
      <div>
        <Gallery
          photos={favoriteBooks.map((book, idx) => ({
            ...book,
            // src: book.image_url.replace(/.(s\/)/g, str => {
            //   const tmp = str.split('s/')
            //   if (tmp[0] < 58) {
            //     return tmp[0].concat('l/')
            //   }
            //   return str
            // }),
            src: book.image_url.replace(/_SX98_./g, ''),
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
          columns={this.getColumnCount()}
          margin={0}
          ImageComponent={LazyImage}
        />
        <div className='bookActions'>
          <span className='books_link' onClick={() => this.openModal(0)}>
            <Glyphicon glyph='plus' /> More Books
          </span>
          {/* <span className='books_link' onClick={() => this.openModal(1)}> */}
          <span className='books_link' onClick={() => window.open('https://gre.abhishek.pro.np/user/88517742/viz/rgraph', '_blank')}>
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
            columns={context.getColumnCount() + 1}
          />
        </div>
      </Suspense>
    )
  }
}

export default Book
