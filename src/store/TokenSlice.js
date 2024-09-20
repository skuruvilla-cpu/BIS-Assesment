import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';

const apiURL = 'https://pre.bistrainer.com/rest/testapi/token';

const apiSecrets = {
    "clientID": "6502bc96-7514-11ef-93b8-00155dd31a80",
    "clientSecret": "e06923eddc18fbeba89b1665304f9407"
  }

export const getAPIToken = createAsyncThunk('data/getAPIToken', async () => {
  try {
      const response = await fetch(apiURL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(apiSecrets), // Make sure apiSecrets is defined
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      return {data};
  } catch (error) {
      console.error('Failed to fetch API token:', error);
  }
});

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    token: null, // Adjusted to hold a single token
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAPIToken.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(getAPIToken.fulfilled, (state, action) => {
          state.loading = false;
          state.token = action.payload; // Set the token directly
      })
      .addCase(getAPIToken.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message; // Use the error message directly
      });
    },
});

export default tokenSlice.reducer;