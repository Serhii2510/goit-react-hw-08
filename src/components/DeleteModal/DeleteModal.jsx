import Modal from 'react-modal';
import css from './DeleteModal.module.css';

export const DeleteModal = ({ isOpen, onRequestClose, onDelete }) => {
  Modal.setAppElement('#root');

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <div className={css.wrapper}>
        <p className={css.descr}>Are you sure to delete this contact?</p>
        <div className={css.btnWrapper}>
          <button
            className={css.btnCancel}
            type="button"
            onClick={onRequestClose}
          >
            No, cancel
          </button>
          <button className={css.btnDelete} type="button" onClick={onDelete}>
            Yes, delete
          </button>
        </div>
      </div>
    </Modal>
  );
};
