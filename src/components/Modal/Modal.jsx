import React, { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.onKeydownCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.onKeydownCloseModal);
  }

  render() {
    return (
      <div className={css.Overlay} onClick={this.props.onClickCloseModal}>
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
