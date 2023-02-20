import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img className={css.ImageGalleryItemImage} src={webformatURL} alt="Art" />
    </li>
  );
};

export default ImageGalleryItem;
