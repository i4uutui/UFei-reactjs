import { createSlice } from '@reduxjs/toolkit'
import { getItem } from '@/assets/js/storage.js';

export const storeSlice = createSlice({
  name: 'counter',
  initialState: {
    sideBar: getItem('sideBar'),
    userInfo: getItem('userInfo'),
    sideView: getItem('sideView'),
  },
  reducers: {
    setSideBar: (state, { payload }) => {
      state.sideBar = payload;
    },
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    setSideView: (state, { payload }) => {
      state.sideView = payload;
    },
    reset: (state) => {
      state = {
        sideBar: getItem('sideBar'),
        userInfo: getItem('userInfo'),
        sideView: getItem('sideView'),
      }
    }
  }
})

export const { 
  setSideBar,
  setUserInfo,
  setSideView,
  reset
} = storeSlice.actions

export default storeSlice.reducer