import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './TokenSlice';
import userListReducer from './UserListSlice';

const store = configureStore({
  reducer: {
    token: tokenReducer,
    userList : userListReducer,
  },
});

export default store;