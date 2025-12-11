import React from 'react'
import PhotoAlbum from 'react-photo-album'
import 'react-photo-album/masonry.css'
import LazyImage from '../LazyImage'

interface BookShelfProps {
  books: any[];
  margin: number;
  columns: number;
}

const BookShelf: React.FC<BookShelfProps> = ({ books, margin, columns }) => {
  if (books.length > 0) {
    return (
        <PhotoAlbum
            layout="masonry"
            photos={books.map((book, idx) => ({
                ...book,
                src: book.image_url.replace(/_SX98_./g, ''),
                width: 98,
                height: 148,
                alt: book.title,
                key: idx.toString()
            }))}
            onClick={({ photo }) => {
                console.log(photo)
                window.open((photo as any).link || '', '_blank')
            }}
            spacing={margin}
            columns={columns}
            render={{
                image: (imageProps) => (
                    <LazyImage imageProps={imageProps} />
                )
            }}
        />
    )
  }
  return <div />
}

export default BookShelf
