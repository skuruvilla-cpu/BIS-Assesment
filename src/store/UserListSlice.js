import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

const apiURL = 'https://pre.bistrainer.com/rest/testapi/users';

export const getUserList = createAsyncThunk('data/getUserList', async (tokenData, { getState }) => {
  try {
      console.log(tokenData.data.access_token)
      const response = await fetch(apiURL, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${tokenData.data.access_token}`,
          },
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return {data};
  } catch (error) {
      console.error('Failed to fetch User List:', error);
  }
});

const userListSlice = createSlice({
  name: 'userList',
  initialState: {
    token: null, // Adjusted to hold a single token
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
          state.loading = false;
          state.users = action.payload; // Set the token directly
      })
      .addCase(getUserList.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message; // Use the error message directly
      });
    },
});

export default userListSlice.reducer;