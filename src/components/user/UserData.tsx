import { useEffect, useState } from 'react';
import { getCall, postCall } from '../../utils/apiCalls';
import AddUserForm from './AddUserForm';
import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import UserDetails from './UserDetails';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUserDetails } from '../../store/reducres/userReducer';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
    }
});

const UserData = () => {
    const styles = useStyles();
    const dispatch = useAppDispatch();
  const [count, setCount] = useState<{
    updated: 0,
    added: 0,
  }>();

  const user = useAppSelector(state => state.user);

  const fetchCount = async () => {
    const resp = await getCall('count', {});
    if (resp.success) {
      const added = resp.data.added;
      const updated = resp.data.updated;
      setCount({added: added, updated: updated});
    }
  };

  useEffect(() => {
    dispatch(getUserDetails(localStorage.getItem('user')));
  }, [user]);

  return (
    <Box className={styles.root}>
      <UserDetails />
      {count && (
        <div style={{ color: 'black' }}>
          <h2>Updated Count: {count.updated}</h2>
          <h2>Added Count: {count.added}</h2>
          <h2>Total Count: {count.updated + count.added}</h2>
          <Box>
        <Button>Update</Button>
        <Button onClick={fetchCount}>Count</Button>
      </Box>
        </div>
      )}
      
    </Box>
  );
};

export default UserData;
