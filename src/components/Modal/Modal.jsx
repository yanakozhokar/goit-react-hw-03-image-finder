import css from './Modal.module.css';

const Modal = ({ largeImageURL, onClickCloseModal }) => {
  return (
    <div className={css.Overlay} onClick={onClickCloseModal}>
      <div className={css.Modal}>
        <div className={css.ModalImageContainer}>
          <img className={css.ModalImage} src={largeImageURL} alt="Art" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
