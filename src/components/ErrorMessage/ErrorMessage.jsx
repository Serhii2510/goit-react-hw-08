import css from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return <p className={css.error}>Sorry about that! Something went wrong.</p>;
};

export default ErrorMessage;
