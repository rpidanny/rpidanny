import React, { Component } from 'react'
import Modal from 'react-modal'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Gallery from 'react-photo-gallery'
import { ForceD3 } from '../Graph'
// import BookShelf from '../BookShelf'

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
    let books = []
    let bookNodes = {}
    let authorNodes = {}
    let publisherNodes = {}
    let nodes = []
    let links = []
    // let readBooks = []
    let favoriteBooks = []

    if (shelves.length > 0) {
      let readBooks = shelves.filter(shelf => shelf.shelf === 'read')[0].books.map(book => ({
        ...book,
        property: {
          shelf: 'read'
        }
      }))
      let currentlyReading = shelves.filter(shelf => shelf.shelf === 'currently-reading')[0].books.map(book => ({
        ...book,
        property: {
          shelf: 'currently-reading'
        }
      }))
      let toRead = shelves.filter(shelf => shelf.shelf === 'to-read')[0].books.map(book => ({
        ...book,
        property: {
          shelf: 'to-read'
        }
      }))
      favoriteBooks = shelves.filter(shelf => shelf.shelf === 'favorites')[0].books

      books = readBooks.concat(currentlyReading).concat(toRead)

      books.forEach(book => {
        const { author } = book.authors

        if (!bookNodes[book.id.$t]) {
          bookNodes[book.id.$t] = {
            ...book,
            id: book.id.$t,
            occurence: 1,
            text: book.title,
            type: 'BOOK',
            typeOccirence: 1,
            thumbnail_url: book.image_url
            // thumbnail_url: null
            // thumbnail_url: 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png'
          }
          if (!authorNodes[author.id]) {
            authorNodes[author.id] = {
              ...author,
              id: author.id,
              text: author.name,
              occurence: 1,
              type: 'AUTHOR',
              typeOccirence: 1,
              thumbnail_url: author.image_url.$t
            }
          }
          if (!publisherNodes[book.publisher]) {
            publisherNodes[book.publisher] = {
              id: book.publisher,
              text: book.publisher,
              type: 'PUBLISHER'
            }
          }
          // Authoer --> Book
          links.push({
            source: author.id,
            sourceType: 'AUTHOR',
            target: book.id.$t,
            targetType: 'BOOK',
            type: 'AUTHOR_OF',
            typeOccirence: 1,
            property: {
              publicationYear: book.publication_year,
              publicationMonth: book.publication_month,
              publicationDay: book.publication_day
            }
          })
          // Book --> Publisher
          links.push({
            source: book.id.$t,
            sourceType: 'BOOK',
            target: book.publisher,
            targetType: 'PUBLISHER',
            type: 'PUBLISHED_BY',
            typeOccirence: 1,
            property: {
              publicationYear: book.publication_year,
              publicationMonth: book.publication_month,
              publicationDay: book.publication_day
            }
          })

          // Author --> Publisher
          links.push({
            source: author.id,
            sourceType: 'AUTHOR',
            target: book.publisher,
            targetType: 'PUBLISHER',
            type: 'WORKS_WITH',
            typeOccirence: 1,
            property: {
              publicationYear: book.publication_year,
              publicationMonth: book.publication_month,
              publicationDay: book.publication_day
            }
          })
        }
      })

      nodes = Object.values(bookNodes)
        .concat(Object.values(authorNodes))
        .concat(Object.values(publisherNodes))
        .map((node, idx) => ({
          ...node,
          index: idx,
          x: 0,
          y: 0,
          fx: null,
          fy: null
        }))
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
