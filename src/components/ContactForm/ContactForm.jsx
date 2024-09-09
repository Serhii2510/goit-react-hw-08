import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';

import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import css from './ContactForm.module.css';
import toast from 'react-hot-toast';

const ContactForm = () => {
  const ContactsValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short! Please type your name')
      .max(50, 'Too Long! Must be up to 50 symbols')
      .required('Name is required'),
    number: Yup.string()
      .min(3, 'Must be a valid phone number!')
      .max(50, 'Number is too Long!')
      .matches(
        /^[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
        'Phone number must match xxx-xx-xx'
      )
      .required('Phone number is required'),
  });

  const initialValues = {
    name: '',
    number: '',
  };

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const contactObject = {
      name: values.name,
      number: values.number,
    };

    dispatch(addContact(contactObject))
      .unwrap()
      .then(() => {
        toast.success('Contact has been added successfully! 👌');
      });

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactsValidationSchema}
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
          <span>Number</span>
          <Field
            className={css.input}
            type="tel"
            name="number"
            placeholder="xxx-xx-xx"
          />
          <ErrorMessage className={css.error} name="number" component="span" />
        </label>

        <button className={css.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
