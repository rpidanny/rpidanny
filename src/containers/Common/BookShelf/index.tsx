import React from 'react'
import Gallery from 'react-photo-gallery'
import LazyImage from '../LazyImage'

interface BookShelfProps {
  books: any[];
  margin: number;
  columns: number;
}

const BookShelf: React.FC<BookShelfProps> = ({ books, margin, columns }) => {
  if (books.length > 0) {
    return (
        <Gallery
            photos={books.map((book, idx) => ({
                ...book,
                src: book.image_url.replace(/_SX98_./g, ''),
                width: 98,
                height: 148,
                alt: book.title,
                key: idx.toString()
            }))}
            onClick={(_, obj) => {
                console.log(obj)
                window.open((obj.photo as any).link || '', '_blank')
            }}
            direction='column'
            margin={margin}
            columns={columns}
            renderImage={(props) => <LazyImage {...props} onClick={props.onClick || (() => {})} />}
        />
    )
  }
  return <div />
}

export default BookShelf
