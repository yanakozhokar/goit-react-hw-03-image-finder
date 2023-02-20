import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(({ id, webformatURL }) => (
        <li key={id} className={css.ImageGalleryItem}>
          <img
            className={css.ImageGalleryItemImage}
            src={webformatURL}
            alt="Art"
          />
        </li>
        // <ImageGalleryItem key={id} image={webformatURL} />
      ))}
    </ul>
  );
};

export default ImageGallery;
