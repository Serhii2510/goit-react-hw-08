import LoginForm from '../../components/LoginForm/LoginForm';
import css from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <main>
      <h2 className={css.title}>Please, login with your email and password</h2>
      <div className={css.wrapper}>
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
