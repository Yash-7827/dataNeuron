import { Action, configureStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import userReducer from './reducres/userReducer';
import countReducer from './reducres/countReducer';
// import companyReducer from './reducers/companyReducer';
// import handledUsersReducer from './reducers/handledUsersReducer';
// import projectsReducer from './reducers/projectsReducer';
// import singleProjectReducer from './reducers/singleProjectReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    count: countReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
