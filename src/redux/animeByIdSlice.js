import { createSlice } from "@reduxjs/toolkit"
import { fetchById } from "./thunk"


let animeByIdInitialState = {
  animeDetail: "",
}

let animebyIdSlice = createSlice({
  name: "animeById",
  initialState: animeByIdInitialState,
  reducers: {
    cleanUpAnimeById(state) {
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchById.fulfilled, (state, action) => {
      state.animeDetail = action.payload
    }).addCase((fetchById.pending, (state, action) => {
    }))
  }

})

export const getAnimebyId = state => state.animeById.animeDetail.data
export const { cleanUpAnimeById } = animebyIdSlice.actions
export { animebyIdSlice }
