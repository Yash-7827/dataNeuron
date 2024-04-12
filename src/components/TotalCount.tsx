import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getTotalCount } from '../store/reducres/countReducer';
import { Button, List, ListItem } from '@mui/material';

const TotalCount = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.count);
  useEffect(() => {
    dispatch(getTotalCount());
  });

  return (
    <>
      <List>
        <ListItem>Added Count: {count.addedCount}</ListItem>
        <ListItem>Updated Count: {count.updatedCount}</ListItem>
        <ListItem>Total Count: {count.addedCount + count.updatedCount}</ListItem>
        <ListItem>
          <Button variant="contained" onClick={() => dispatch(getTotalCount())}>
            Refresh
          </Button>
        </ListItem>
      </List>
    </>
  );
};

export default TotalCount;
