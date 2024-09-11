import { useDispatch, useSelector } from 'react-redux';
import { apiLogin } from '../../redux/auth/operations';
import { selectAuthError } from '../../redux/auth/selectors';

import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

import css from './LoginForm.module.css';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
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
        toast.success('Successfully logged in! 👌');
      })
      .catch(error => {
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
          <div className={css.inputWrapper}>
            <Field
              className={css.input}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
            />
            <span className={css.btnToggle} onClick={handleToggle}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
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
      </Form>
      <Toaster />
    </Formik>
  );
};

export default LoginForm;
