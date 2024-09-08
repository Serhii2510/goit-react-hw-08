import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';

import { FaPhoneAlt } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';

import css from './Contact.module.css';

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
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
      <button
        type="button"
        className={css.btn}
        onClick={() => onDeleteContact(id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Contact;
