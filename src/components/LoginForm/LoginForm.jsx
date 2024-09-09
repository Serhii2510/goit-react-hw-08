import { useDispatch, useSelector } from 'react-redux';
import { apiLogin } from '../../redux/auth/operations';
import { selectAuthError } from '../../redux/auth/selectors';

import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import css from './LoginForm.module.css';
import toast, { Toaster } from 'react-hot-toast';

const LoginForm = () => {
  const LoginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Must be a valid email!')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long!')
      .max(60, 'Password is too Long! Must be up to 60 symbols')
      .required('Password is required'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);

  const handleSubmit = (values, actions) => {
    dispatch(apiLogin(values))
      .unwrap()
      .then(() => {
        console.log('success');

        toast.success('Successfully logged in! 👌');
      })
      .catch(error => {
        console.log('error');

        toast.error(`Oops, some error occured... ${error}`);
      });

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={LoginValidationSchema}
    >
      <Form className={css.form}>
        <label className={css.label}>
          <span>Email</span>
          <Field
            className={css.input}
            type="email"
            name="email"
            placeholder="example@gmail.com"
          />
          <ErrorMessage className={css.error} name="email" component="span" />
        </label>

        <label className={css.label}>
          <span>Password</span>
          <Field
            className={css.input}
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <ErrorMessage
            className={css.error}
            name="password"
            component="span"
          />
        </label>

        <button className={css.btn} type="submit">
          Log in
        </button>
        {error && (
          <p className={css.errorText}>Oops, some error occured... {error}</p>
        )}
        <Toaster />
      </Form>
    </Formik>
  );
};

export default LoginForm;
