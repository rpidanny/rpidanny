import React, { Component } from 'react'
import Modal from 'react-modal'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Gallery from 'react-photo-gallery'
import BookShelf from '../BookShelf'

import './styles.css'

Modal.setAppElement('#root')

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
    let currentlyReading = []
    let readBooks = []
    let favoriteBooks = []
    if (shelves.length > 0) {
      readBooks = shelves.filter(shelf => shelf.shelf === 'read')[0].books
      currentlyReading = shelves.filter(shelf => shelf.shelf === 'currently-reading')[0].books
      favoriteBooks = shelves.filter(shelf => shelf.shelf === 'favorites')[0].books
    }
    return (
      <div>
        <p>
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
        </p>
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
          {/* <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form> */}
        
          {/* <div id="gr_grid_widget_1546505381">
            <h2>
              <a style="text-decoration: none;" rel="nofollow" href="https://www.goodreads.com/review/list/88517742-abhishek?shelf=read&utm_medium=api&utm_source=grid_widget">Abhishek's books</a>
            </h2>
            <div class="gr_grid_container">
              <div class="gr_grid_book_container"><a title="The Egg" rel="nofollow" href="https://www.goodreads.com/book/show/17563539-the-egg"><img alt="The Egg" border="0" src="https://images.gr-assets.com/books/1431492647s/17563539.jpg" /></a></div>
              <div class="gr_grid_book_container"><a title="Free Will" rel="nofollow" href="https://www.goodreads.com/book/show/13259270-free-will"><img alt="Free Will" border="0" src="https://images.gr-assets.com/books/1532072045s/13259270.jpg" /></a></div>
              <div class="gr_grid_book_container"><a title="Freakonomics: A Rogue Economist Explores the Hidden Side of Everything (Freakonomics, #1)" rel="nofollow" href="https://www.goodreads.com/book/show/1202.Freakonomics"><img alt="Freakonomics: A Rogue Economist Explores the Hidden Side of Everything" border="0" src="https://images.gr-assets.com/books/1327909092s/1202.jpg" /></a></div>
              <div class="gr_grid_book_container"><a title="Homo Deus: A Brief History of Tomorrow" rel="nofollow" href="https://www.goodreads.com/book/show/31138556-homo-deus"><img alt="Homo Deus: A Brief History of Tomorrow" border="0" src="https://images.gr-assets.com/books/1468760805s/31138556.jpg" /></a></div>
              <div class="gr_grid_book_container"><a title="How I Killed Pluto and Why It Had It Coming" rel="nofollow" href="https://www.goodreads.com/book/show/7963278-how-i-killed-pluto-and-why-it-had-it-coming"><img alt="How I Killed Pluto and Why It Had It Coming" border="0" src="https://images.gr-assets.com/books/1320532443s/7963278.jpg" /></a></div>
              <div class="gr_grid_book_container"><a title="How Google Works" rel="nofollow" href="https://www.goodreads.com/book/show/23158207-how-google-works"><img alt="How Google Works" border="0" src="https://images.gr-assets.com/books/1422538855s/23158207.jpg" /></a></div>
              <div class="gr_grid_book_container"><a title="Thinking, Fast and Slow" rel="nofollow" href="https://www.goodreads.com/book/show/11468377-thinking-fast-and-slow"><img alt="Thinking, Fast and Slow" border="0" src="https://images.gr-assets.com/books/1317793965s/11468377.jpg" /></a></div>
              <div class="gr_grid_book_container"><a title="The First Fifteen Lives of Harry August" rel="nofollow" href="https://www.goodreads.com/book/show/35066358-the-first-fifteen-lives-of-harry-august"><img alt="The First Fifteen Lives of Harry August" border="0" src="https://images.gr-assets.com/books/1493966668s/35066358.jpg" /></a></div>
              <div class="gr_grid_book_container"><a title="Just for Fun: The Story of an Accidental Revolutionary" rel="nofollow" href="https://www.goodreads.com/book/show/160171.Just_for_Fun"><img alt="Just for Fun: The Story of an Accidental Revolutionary" border="0" src="https://images.gr-assets.com/books/1440830026s/160171.jpg" /></a></div>
              <div class="gr_grid_book_container"><a title="Sapiens: A Brief History of Humankind" rel="nofollow" href="https://www.goodreads.com/book/show/23692271-sapiens"><img alt="Sapiens: A Brief History of Humankind" border="0" src="https://images.gr-assets.com/books/1420585954s/23692271.jpg" /></a></div>
              <div class="gr_grid_book_container"><a title="The Idea Factory: Bell Labs and the Great Age of American Innovation" rel="nofollow" href="https://www.goodreads.com/book/show/11797471-the-idea-factory"><img alt="The Idea Factory: Bell Labs and the Great Age of American Innovation" border="0" src="https://images.gr-assets.com/books/1338504885s/11797471.jpg" /></a></div>
              <div class="gr_grid_book_container"><a title="Zero to One: Notes on Startups, or How to Build the Future" rel="nofollow" href="https://www.goodreads.com/book/show/18050143-zero-to-one"><img alt="Zero to One: Notes on Startups, or How to Build the Future" border="0" src="https://images.gr-assets.com/books/1414347376s/18050143.jpg" /></a></div>
              <div class="gr_grid_book_container"><a title="No Place to Hide: Edward Snowden, the NSA, and the U.S. Surveillance State" rel="nofollow" href="https://www.goodreads.com/book/show/18213403-no-place-to-hide"><img alt="No Place to Hide: Edward Snowden, the NSA, and the U.S. Surveillance State" border="0" src="https://images.gr-assets.com/books/1383352779s/18213403.jpg" /></a></div>
              <div class="gr_grid_book_container"><a title="The Millionaire Next Door: The Surprising Secrets of America's Wealthy" rel="nofollow" href="https://www.goodreads.com/book/show/998.The_Millionaire_Next_Door"><img alt="The Millionaire Next Door: The Surprising Secrets of America's Wealthy" border="0" src="https://images.gr-assets.com/books/1348313018s/998.jpg" /></a></div>
              <div class="gr_grid_book_container"><a title="Digital Fortress" rel="nofollow" href="https://www.goodreads.com/book/show/11125.Digital_Fortress"><img alt="Digital Fortress" border="0" src="https://images.gr-assets.com/books/1360095966s/11125.jpg" /></a></div>
              <div class="gr_grid_book_container"><a title="Ready Player One (Ready Player One, #1)" rel="nofollow" href="https://www.goodreads.com/book/show/9969571-ready-player-one"><img alt="Ready Player One" border="0" src="https://images.gr-assets.com/books/1500930947s/9969571.jpg" /></a></div>
              <div class="gr_grid_book_container"><a title="Smartcuts: How Hackers, Innovators, and Icons Accelerate Success" rel="nofollow" href="https://www.goodreads.com/book/show/20910174-smartcuts"><img alt="Smartcuts: How Hackers, Innovators, and Icons Accelerate Success" border="0" src="https://images.gr-assets.com/books/1405868185s/20910174.jpg" /></a></div>
              <div class="gr_grid_book_container"><a title="Artemis" rel="nofollow" href="https://www.goodreads.com/book/show/34928122-artemis"><img alt="Artemis" border="0" src="https://images.gr-assets.com/books/1494273579s/34928122.jpg" /></a></div>
              <div class="gr_grid_book_container"><a title="The Martian" rel="nofollow" href="https://www.goodreads.com/book/show/18007564-the-martian"><img alt="The Martian" border="0" src="https://images.gr-assets.com/books/1413706054s/18007564.jpg" /></a></div>
              <div class="gr_grid_book_container"><a title="Rich Dad, Poor Dad" rel="nofollow" href="https://www.goodreads.com/book/show/69571.Rich_Dad_Poor_Dad"><img alt="Rich Dad, Poor Dad" border="0" src="https://images.gr-assets.com/books/1388211242s/69571.jpg" /></a></div>
              <br style="clear: both" /><br /><a class="gr_grid_branding" style="font-size: .9em; color: #382110; text-decoration: none; float: right; clear: both" rel="nofollow" href="https://www.goodreads.com/user/show/88517742-abhishek">Abhishek's favorite books »</a>
              <noscript><br />Share <a rel="nofollow" href="/">book reviews</a> and ratings with Abhishek, and even join a <a rel="nofollow" href="/group">book club</a> on Goodreads.</noscript>
            </div>

          </div> */}
          {/* <script src="https://www.goodreads.com/review/grid_widget/88517742?cover_size=&hide_link=&hide_title=&num_books=20&order=&shelf=&sort=&widget_id=1546505381" type="text/javascript" charset="utf-8"></script> */}

        </Modal>
      </div>
    )
  }
}

export default Book
