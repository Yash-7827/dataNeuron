import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { getCall } from '../../utils/apiCalls';

export interface CountDetails {
  updatedCount: number;
  addedCount: number;
}

const initialState: CountDetails = {
  updatedCount: 0,
  addedCount: 0,
};

export const count = createSlice({
  name: 'count',
  initialState,
  reducers: {
    setCountDetails: (state, action: PayloadAction<CountDetails>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const getTotalCount =
  (): AppThunk =>
  async (dispatch) => {
    try {
      const res = await getCall('count', {});   
      dispatch(setCountDetails(res.data.count));
      return { success: true, message: 'Permissions fetched successfully' };
    } catch (error) {
      return { success: false, message: 'An error occurred.' };
    }
  };

export const { setCountDetails } = count.actions;

export default count.reducer;
