import React, { useState, useEffect, Suspense, lazy } from 'react'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'
import Gallery from 'react-photo-gallery'

import Fallback from '../Fallback'
import LazyImage from '../LazyImage'

import favoriteBooks from '../../../data/books/favorites.json'
import readBooks from '../../../data/books/read.json'

import './styles.css'

const BookShelf = lazy(() => import('../BookShelf'))

// Modal.setAppElement('#root') // Should be moved to useEffect or top level

const Books: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedModal, setSelectedModal] = useState(0)
  const [width, setWidth] = useState(window.outerWidth)
  // const [height, setHeight] = useState(window.outerHeight)

  const updateDimensions = () => {
    setWidth(window.outerWidth)
    // setHeight(window.outerHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const openModal = (modalIndex: number) => {
    setModalIsOpen(true)
    setSelectedModal(modalIndex)
  }

  const afterOpenModal = () => {
    const rootElement = document.getElementById('root')
    if (rootElement) {
      rootElement.style.filter = 'blur(5px)'
    }
  }

  const closeModal = () => {
    const rootElement = document.getElementById('root')
    if (rootElement) {
      rootElement.style.filter = 'blur(0px)'
    }
    setModalIsOpen(false)
  }

  const getColumnCount = () => {
    if (width >= 959) return 6
    if (width >= 768) return 5
    if (width >= 480) return 4
    if (width >= 240) return 3
    return 2
  }

  const getModalContent = (selected: number) => {
    if (selected === 0) {
      return (
        <Suspense fallback={<Fallback />} >
          <div className='bookShelf' >
            <BookShelf
              books={readBooks}
              margin={0}
              columns={getColumnCount() + 1}
            />
          </div>
        </Suspense>
      )
    }
    return null
  }

  return (
    <div>
      <Gallery
        photos={favoriteBooks.map((book, idx) => ({
          ...book,
          src: book.image_url.replace(/_SX98_./g, ''),
          width: 98,
          height: 148,
          alt: book.title,
          key: idx.toString()
        }))}
        onClick={
          (_, obj) => {
            console.log(obj)
            window.open((obj.photo as any).link, '_blank')
          }
        }
        direction='column'
        columns={getColumnCount()}
        margin={0}
        renderImage={(props) => <LazyImage {...props} onClick={props.onClick || (() => {})} />}
      />
      <div className='bookActions'>
        <span className='books_link' onClick={() => openModal(0)}>
          <FaPlus /> More Books
        </span>
        <span className='books_link' onClick={() => window.open('https://gre.abhishek.pro.np/user/88517742/viz/rgraph', '_blank')}>
          <FaPlus /> Explore Books
        </span>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className='booksModal'
        overlayClassName='ModalOverlay'
        contentLabel='Books'
        ariaHideApp={false} // Since we are managing blur manually
      >
        <div className='bookModalContent'>
          { getModalContent(selectedModal) }
        </div>
      </Modal>
    </div>
  )
}

export default Books
