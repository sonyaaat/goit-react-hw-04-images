import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from '../Modal/Modal.module.css';
const Modal = ({ onClose, src }) => {
  useEffect(() => {
    const handleModal = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleModal);
    return document.removeEventListener('keydown', handleModal);
  }, [onClose]);

  const backdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={backdropClick}>
      <div className={css.Modal}>
        <img src={src} alt="largeImage" />
      </div>
    </div>
  );
};
Modal.propTypes = {
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Modal;
