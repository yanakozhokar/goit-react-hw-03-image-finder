import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, openModal, largeImageURL }) => {
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => openModal(largeImageURL)}
    >
      <img className={css.ImageGalleryItemImage} src={webformatURL} alt="Art" />
    </li>
  );
};

export default ImageGalleryItem;
