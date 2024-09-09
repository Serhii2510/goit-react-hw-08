import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';

import { FaPhoneAlt } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';

import css from './Contact.module.css';
import toast from 'react-hot-toast';
import { DeleteModal } from '../DeleteModal/DeleteModal';

const Contact = ({ id, name, number }) => {
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);

  const openModalDelete = () => setModalDeleteIsOpen(true);
  const closeModalDelete = () => setModalDeleteIsOpen(false);

  const dispatch = useDispatch();

  const onDeleteContact = id => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        toast.success('Contact has been deleted successfully!👌');
      });
  };

  return (
    <div className={css.contactBlock}>
      <ul className={css.list}>
        <li className={css.item}>
          <span className={css.icon}>
            <FaUser />
          </span>
          {name}
        </li>
        <li className={css.item}>
          <span className={css.icon}>
            <FaPhoneAlt />
          </span>
          {number}
        </li>
      </ul>
      <button type="button" className={css.btn} onClick={openModalDelete}>
        Delete
      </button>
      <DeleteModal
        isOpen={modalDeleteIsOpen}
        onRequestClose={closeModalDelete}
        onDelete={() => onDeleteContact(id)}
      />
    </div>
  );
};

export default Contact;
