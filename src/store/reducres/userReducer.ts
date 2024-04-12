import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { getCall } from '../../utils/apiCalls';

export interface UserDetails {
  name: String;
  email: String;
  phoneNumber: String;
  count: Number;
  _id: String;
}

const initialState: UserDetails = {
  name: '',
  email: '',
  phoneNumber: '',
  count: 0,
  _id: '',
};

export const users = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserDetails>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const getUserDetails =
  (id: String | null): AppThunk =>
  async (dispatch) => {
    try {
      const res = await getCall('getuser', { _id: id });
      dispatch(setUserDetails(res.data.data));
      return { success: true, message: 'Permissions fetched successfully' };
    } catch (error) {
      return { success: false, message: 'An error occurred.' };
    }
  };

export const { setUserDetails } = users.actions;

export default users.reducer;
