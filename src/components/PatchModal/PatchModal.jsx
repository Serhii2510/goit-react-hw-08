import Modal from 'react-modal';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { patchContact } from '../../redux/contacts/operations';
import toast from 'react-hot-toast';
import css from './PatchModal.module.css';

export const PatchModal = ({ id, name, number, isOpen, onRequestClose }) => {
  Modal.setAppElement('#root');

  const PatchValidationSchema = Yup.object().shape({
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
    name,
    number,
  };

  const dispatch = useDispatch();

  const handleSubmit = values => {
    dispatch(
      patchContact({
        id,
        name: values.name,
        number: values.number,
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Contact has been updated successfully!👌');
      });

    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={PatchValidationSchema}
      >
        <Form className={css.form}>
          <p className={css.descr}>
            You can update this contact name or phone number
          </p>
          <label className={css.label}>
            <span>Name</span>
            <Field className={css.input} type="text" name="name" />
            <ErrorMessage className={css.error} name="name" component="span" />
          </label>

          <label className={css.label}>
            <span>Number</span>
            <Field className={css.input} type="tel" name="number" />
            <ErrorMessage
              className={css.error}
              name="number"
              component="span"
            />
          </label>

          <button className={css.btn} type="submit">
            Update contact
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};
