import { createSlice } from "@reduxjs/toolkit"
import { fetchGenres, fetchSchedules } from "./thunk"



let schedulesInitialState = {
  schedules: [],
}

let schedulesSlice = createSlice({
  name: 'schedulesApi',
  initialState: schedulesInitialState,
  reducers: {
    cleanUpSchdules(state) {
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSchedules.fulfilled, (state, action) => {
      state.schedules = action.payload
    }).addCase(fetchSchedules.rejected, (state, action) => {
      console.log("reject")
    })
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
    })
  }
})


export { schedulesSlice }
export const { cleanUpSchdules } = schedulesSlice.actions
export const getSchedules = state => state.schedulesApi.schedules
