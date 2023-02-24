import React, { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeydownCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydownCloseModal);
  }

  onClickCloseModal = event => {
    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  };

  onKeydownCloseModal = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div className={css.Overlay} onClick={this.onClickCloseModal}>
        <div className={css.Modal}>
          <div className={css.ModalImageContainer}>
            <img
              className={css.ModalImage}
              src={this.props.largeImageURL}
              alt="Art"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
