import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';

import { FaPhoneAlt } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';

import css from './Contact.module.css';
import toast from 'react-hot-toast';
import { DeleteModal } from '../DeleteModal/DeleteModal';
import { PatchModal } from '../PatchModal/PatchModal';

const Contact = ({ id, name, number }) => {
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [modalPatchIsOpen, setModalPatchIsOpen] = useState(false);
  const openModalDelete = () => setModalDeleteIsOpen(true);
  const closeModalDelete = () => setModalDeleteIsOpen(false);
  const openModalPatch = () => setModalPatchIsOpen(true);
  const closeModalPatch = () => setModalPatchIsOpen(false);

  const dispatch = useDispatch();

  const onDeleteContact = () => {
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
      <div className={css.btnBlock}>
        <button
          type="button"
          className={css.btnUpdate}
          onClick={openModalPatch}
        >
          <FaPen />
        </button>
        <button
          type="button"
          className={css.btnDelete}
          onClick={openModalDelete}
        >
          <FaRegTrashAlt />
        </button>
      </div>

      <DeleteModal
        isOpen={modalDeleteIsOpen}
        onRequestClose={closeModalDelete}
        onDelete={() => onDeleteContact(id)}
      />
      <PatchModal
        id={id}
        name={name}
        number={number}
        isOpen={modalPatchIsOpen}
        onRequestClose={closeModalPatch}
      />
    </div>
  );
};

export default Contact;
