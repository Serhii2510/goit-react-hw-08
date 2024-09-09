import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import css from './RegistrationPage.module.css';

const RegistrationPage = () => {
  return (
    <main>
      <h2 className={css.title}>Please register before entering</h2>
      <div className={css.wrapper}>
        <RegistrationForm />
      </div>
    </main>
  );
};

export default RegistrationPage;
