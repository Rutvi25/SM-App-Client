import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  login: (userData) => {},
  logout: () => {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      console.log('login action');
      state.user = { ...action.payload };
    },
    logout(state) {
      console.log('logout action');
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
const auth = authSlice.reducer;
export default auth;
