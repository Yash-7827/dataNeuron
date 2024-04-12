import { FormikValues, useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, Modal, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { postCall } from '../../utils/apiCalls';
import { getTotalCount } from '../../store/reducres/countReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUserDetails } from '../../store/reducres/userReducer';
import { enqueueSnackbar } from 'notistack';

const useStyles = makeStyles({
  root: {
    borderRadius: '6px',
    margin: 'auto',
    width: 400,
    backgroundColor: 'white',
    padding: '32px',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  form: {
    '&.MuiFormControl-root': {
      padding: '0',
      marginTop: '20px',
      '& .MuiFormHelperText-root': {},
    },
  },
  mtLg: {
    marginTop: '20px',
  },
});

//Validation schema using yup for add user form
const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  name: yup.string().required('Name is required'),
  phoneNumber: yup
    .string()
    .min(10, 'Please enter a valid phone number')
    .max(10, 'Please enter a valid phone number')
    .required('Phone number is required'),
});

const AddUserForm = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {
  const dispatch = useAppDispatch();
  const styles = useStyles();

  //form submit handler
  const handleSubmit = async (values: FormikValues) => {
    const resp = await postCall('add', values);
    if (resp.success) {
      dispatch(getUserDetails(localStorage.getItem('user')));
      dispatch(getTotalCount());
      enqueueSnackbar("User added successfully!", {
        variant: 'success',
      });
    }
  };

  //formik is a package for automatic handling of controlled inputs, form submission and error text
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      phoneNumber: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
      resetForm();
      handleClose();
    },
  });

  return (
    //MUI Modal
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.root}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            className={styles.form}
            id="name"
            name="name"
            label="Full Name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            className={styles.form}
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            className={styles.form}
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            type="text"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          <Button color="primary" variant="contained" fullWidth type="submit" className={styles.mtLg}>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddUserForm;
