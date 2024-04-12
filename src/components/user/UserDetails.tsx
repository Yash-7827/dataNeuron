import { useEffect, useState } from 'react';
import { getCall } from '../../utils/apiCalls';
import AddUserForm from './AddUserForm';
import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import UpdateUserModal from './UpdateUserModal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUserDetails, setUserDetails } from '../../store/reducres/userReducer';
import { getTotalCount } from '../../store/reducres/countReducer';

const useStyles = makeStyles({
  mlLg: {
    marginLeft: '15px',
  },
});

export interface User {
  name: String;
  phoneNumber: String;
  email: String;
  _id: String;
}

const UserDetails = () => {
  const styles = useStyles();

  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const user: any = useAppSelector((state) => state.user);

  const handleModalClose = () => {
    setUpdateModalOpen(false);
    setAddModalOpen(false);
  };

  useEffect(() => {
    dispatch(getUserDetails(localStorage.getItem('user')));
    dispatch(getTotalCount());
  }, []);

  const { _id, __v, count, ...secondObject } = user;

  return (
    <>
      <Box>
        {Object.keys(secondObject!).map((item) => {
          return <h4 style={{ color: 'black' }}>{`${item} : ${user[item as keyof User]}`}</h4>;
        })}
        <Button variant="contained" onClick={() => setUpdateModalOpen(true)}>
          Update
        </Button>
        <Button variant="contained" className={styles.mlLg} onClick={() => setAddModalOpen(true)}>
          Add
        </Button>
        <UpdateUserModal open={updateModalOpen} handleClose={handleModalClose} />
        <AddUserForm open={addModalOpen} handleClose={handleModalClose} />
      </Box>
    </>
  );
};

export default UserDetails;
