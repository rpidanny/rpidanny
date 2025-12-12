import "react-photo-album/masonry.css";
import "./styles.css";

import React, { lazy, Suspense, useEffect, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import PhotoAlbum from "react-photo-album";

import favoriteBooks from "../../../data/books/favorites.json";
import readBooks from "../../../data/books/read.json";
import Fallback from "../Fallback";
import LazyImage from "../LazyImage";

const BookShelf = lazy(() => import("../BookShelf"));

// Modal.setAppElement('#root') // Should be moved to useEffect or top level

const Books: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  // const [height, setHeight] = useState(window.innerHeight)

  const updateDimensions = () => {
    setWidth(window.innerWidth);
    // setHeight(window.innerHeight)
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const openModal = (modalIndex: number) => {
    setModalIsOpen(true);
    setSelectedModal(modalIndex);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const getColumnCount = () => {
    if (width >= 1_200) return 6;
    if (width >= 960) return 5;
    if (width >= 720) return 4;
    // Return 3 columns for widths between 480 and 720
    if (width >= 480) return 3;
    // Return 2 columns for smaller mobile screens
    return 2;
  };

  const getModalContent = (selected: number) => {
    if (selected === 0) {
      return (
        <Suspense fallback={<Fallback />}>
          <div className="modalHeader">
            <h2>Read Books</h2>
            <button
              className="closeButton"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
          </div>
          <div className="bookShelf">
            <BookShelf
              books={readBooks}
              margin={10}
              columns={width > 600 ? getColumnCount() + 1 : getColumnCount()}
            />
          </div>
        </Suspense>
      );
    }
    return null;
  };

  return (
    <div>
      <PhotoAlbum
        layout="masonry"
        photos={favoriteBooks.map((book, idx) => ({
          ...book,
          src: book.image_url.replace(/_SX98_./g, ""),
          width: 98,
          height: 148,
          alt: book.title,
          key: idx.toString(),
        }))}
        onClick={({ photo }) => {
          console.log(photo);
          window.open((photo as any).link, "_blank");
        }}
        columns={getColumnCount()}
        spacing={10}
        render={{
          image: (imageProps) => <LazyImage imageProps={imageProps} />,
        }}
      />
      <div className="bookActions">
        <span className="books_link" onClick={() => openModal(0)}>
          <FaPlus /> More Books
        </span>
        <span
          className="books_link"
          onClick={() =>
            window.open(
              "https://rpidanny.github.io/goodreads-explorer/user/88517742/viz/stats",
              "_blank",
            )
          }
        >
          <FaPlus /> Explore Books
        </span>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="booksModal"
        overlayClassName="ModalOverlay"
        contentLabel="Books"
        ariaHideApp={false}
        closeTimeoutMS={300}
      >
        <div className="bookModalContent">{getModalContent(selectedModal)}</div>
      </Modal>
    </div>
  );
};

export default Books;
