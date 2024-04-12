import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FormikValues, useFormik } from 'formik';
import * as yup from 'yup';
import { User } from './UserDetails';
import { patchCall } from '../../utils/apiCalls';
import { UserDetails, getUserDetails } from '../../store/reducres/userReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { getTotalCount } from '../../store/reducres/countReducer';
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

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  name: yup.string().required('Name is required'),
  phoneNumber: yup
    .string()
    .min(10, 'Please enter a valid phone number')
    .max(10, 'Please enter a valid phone number')
    .required('Phone number is required'),
});

const UpdateUserModal = ({ open = false, handleClose }: { open: boolean; handleClose: () => void }) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();

  const storeUser: UserDetails = useAppSelector((state) => state.user);

  const handleSubmmit = async (values: FormikValues, userId: String) => {
    const resp = await patchCall('update', { ...values, userId });
    if (resp.success) {
      dispatch(getTotalCount());
      dispatch(getUserDetails(localStorage.getItem('user')));
      enqueueSnackbar("User updated successfully!", {
        variant: 'success',
      });
    }
  };

  useEffect(() => {
    dispatch(getUserDetails(localStorage.getItem('user')));
  }, []);

  const formik = useFormik({
    initialValues: {
      email: storeUser.email,
      name: storeUser.name,
      phoneNumber: storeUser.phoneNumber,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmmit(values, storeUser._id);
      handleClose();
    },
    enableReinitialize: true,
  });

  return (
    <>
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
    </>
  );
};

export default UpdateUserModal;
