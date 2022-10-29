import { createReducer } from "@reduxjs/toolkit"
import { fetchAnimeSearch, fetchAnimeSearchList, fetchQuotes, fetchTopAnime } from "./thunk"

let animeSearchInitialState = {
  searchDetail: [],
  searchDetailList: []
}


let animeSearchReducer = createReducer(animeSearchInitialState, (builder) => {
  builder.addCase(fetchAnimeSearch.fulfilled, (state, action) => {
    console.log(action)
    state.searchDetail = action.payload
  })
  builder.addCase(fetchAnimeSearchList.fulfilled, (state, action) => {
    state.searchDetailList = action.payload
  })
})




let quotesInitalState = {
  quotes: [],
}
const quotesReducer = createReducer(quotesInitalState, (builder) => {
  builder.addCase(fetchQuotes.fulfilled, (state, action) => {
    state.quotes = action.payload
  })
})

let topAnimeListInitalState = {
  topAnimeList: [],

}

const topAnimeReducer = createReducer(topAnimeListInitalState, (builder) => {
  builder.addCase(fetchTopAnime.fulfilled, (state, action) => {
    state.topAnimeList = action.payload.data
  })
})

export { quotesReducer, topAnimeReducer, animeSearchReducer, };

export const animeSearch = state => state.animeSearch.searchDetail
export const animeSearchList = state => state.animeSearch.searchDetailList
export const getTopAnime = state => state.topAnimeList.topAnimeList
export const getQuotes = state => state.quotesapi.quotes


