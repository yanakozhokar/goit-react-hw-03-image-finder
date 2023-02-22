import css from './Modal.module.css';

const Modal = ({ largeImageURL, closeModal }) => {
  return (
    <div className={css.Overlay} onClick={closeModal}>
      <div className={css.Modal}>
        <div className={css.ModalImageContainer}>
          <img className={css.ModalImage} src={largeImageURL} alt="Art" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
