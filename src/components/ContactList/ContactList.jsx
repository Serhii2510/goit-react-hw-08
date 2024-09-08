import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contactsSlice.js';

import Contact from '../Contact/Contact';
import css from './ContactList.module.css';

const ContactList = () => {
  const filteredContactsList = useSelector(selectFilteredContacts);

  return (
    <ul className={css.list}>
      {filteredContactsList.map(contact => (
        <li className={css.item} key={contact.id}>
          <Contact
            id={contact.id}
            name={contact.name}
            number={contact.number}
          />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
