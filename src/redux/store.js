// import { animeSearchList, } from "./animeByIdSlice"
import { quotesReducer, topAnimeReducer, animeSearchReducer, } from "./reducers"
import produce from "immer"
import { schedulesSlice } from "./schedulesSlice";
import { combineReducers, configureStore, createAsyncThunk, createReducer, createSlice, current } from "@reduxjs/toolkit";
import { animebyIdSlice } from "./animeByIdSlice";

const combinedReducer = combineReducers({
  schedulesApi: schedulesSlice.reducer,
  quotesapi: quotesReducer,
  topAnimeList: topAnimeReducer,
  animeSearch: animeSearchReducer,
  animeById: animebyIdSlice.reducer
})

const rootReducer = (state, action) => {
  if (action?.type === 'animeById/cleanUpAnimeById') {
    state = produce(state, draft => {
      draft.animeById.animeDetail = ""
    })
  }
  if (action?.type === 'schedulesApi/cleanUpSchdules') {
    state = produce(state, draft => {
      draft.schedulesApi.schedules = []
    })
  }
  return combinedReducer(state, action)
}

export const store = configureStore({
  reducer: rootReducer

})

