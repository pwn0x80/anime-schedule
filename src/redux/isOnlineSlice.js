import { createSlice } from "@reduxjs/toolkit";


let isOnlineSlice = createSlice({
  name: "onlineCheck",
  initialState: { isOnline: true },
  reducers: {
    isOnlineCheck(state, action) {
      state.isOnline = action.payload


    }
  }
})



export const isOnlineState = state => state.isOnline.isOnline
export const { isOnlineCheck } = isOnlineSlice.actions;
export { isOnlineSlice }
