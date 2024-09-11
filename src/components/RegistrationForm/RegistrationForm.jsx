import { useDispatch, useSelector } from 'react-redux';
import { apiRegister } from '../../redux/auth/operations';
import { selectAuthError } from '../../redux/auth/selectors';

import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

import css from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  const RegistrationValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short! Please type your name')
      .max(50, 'Too Long! Must be up to 50 symbols')
      .required('Username is required'),
    email: Yup.string()
      .email('Must be a valid email!')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long!')
      .max(60, 'Password is too Long! Must be up to 60 symbols')
      .required('Password is required'),
  });

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);

  const handleSubmit = (values, actions) => {
    dispatch(apiRegister(values));

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={RegistrationValidationSchema}
    >
      <Form className={css.form}>
        <label className={css.label}>
          <span>Name</span>
          <Field
            className={css.input}
            type="text"
            name="name"
            placeholder="John Smith"
          />
          <ErrorMessage className={css.error} name="name" component="span" />
        </label>

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
          Register
        </button>
        {error && (
          <p className={css.errorText}>Oops, some error occured... {error}</p>
        )}
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
