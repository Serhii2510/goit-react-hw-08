import { FaAddressBook } from 'react-icons/fa';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <main>
      <div className={css.mainBlock}>
        <h1 className={css.title}>
          Welcome to Phonebook <FaAddressBook />
        </h1>
        <p className={css.text}>Create your own contacts list</p>
      </div>
    </main>
  );
};

export default HomePage;
