import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user:{},
  selectedTrip: {},
};

const mySlice = createSlice({
  name: 'mySlice',
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setSelectedTrip(state, action) {
      state.selectedTrip = action.payload;
    },
  },
});

export const { setUser, setSelectedTrip, setAccessToken } = mySlice.actions;
// export const { actions } = mySlice;
export default mySlice.reducer;
