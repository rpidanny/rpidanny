import read from '../../../data/books/read.json'
import toRead from '../../../data/books/to-read.json'
import currentlyReading from '../../../data/books/currently-reading'

export function getGraphData () {
  let books = []
  let bookNodes = {}
  let authorNodes = {}
  let publisherNodes = {}
  let nodes = []
  let links = []

  let rb = read.map(book => ({
    ...book,
    property: {
      shelf: 'read'
    }
  }))
  let crb = currentlyReading.map(book => ({
    ...book,
    property: {
      shelf: 'currently-reading'
    }
  }))
  let trb = toRead.map(book => ({
    ...book,
    property: {
      shelf: 'to-read'
    }
  }))

  // Merge all book lists into one
  books = crb.concat(rb).concat(trb)

  books.forEach(book => {
    const { author } = book.authors

    if (!bookNodes[book.id.$t]) {
      // Create Book Nodes
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
      // Create Author Nodes
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
      // Create Publisher Nodes
      if (!publisherNodes[book.publisher]) {
        publisherNodes[book.publisher] = {
          id: book.publisher,
          text: book.publisher,
          type: 'PUBLISHER'
        }
      }
      // Create Authoer --> Book relationship
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
      // Create Book --> Publisher relationship
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

      // Create Author --> Publisher relationship
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

  // Collect all nodes
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

  return {
    nodes,
    links
  }
}
