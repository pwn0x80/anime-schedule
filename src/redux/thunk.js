import { combineReducers, configureStore, createAsyncThunk, createReducer, createSlice, current } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import { buildQueries } from "@testing-library/react";
import { product } from "ramda";
import AnimeDetail from "../components/AnimeDetail/AnimeDetail";
import animeApi from "../services/animeapi.service"
import produce from "immer"
import { act } from "react-dom/test-utils";
export const fetchSchedules = createAsyncThunk(
  "anime/schedules",
  async (payload) => {
    return await animeApi.getSchedules(payload)
  }
)
export const fetchGenres = createAsyncThunk(
  "anime/genres",
  async (payload) => {
    return await animeApi.getGenres(payload)
  }
)
export const fetchTopAnime = createAsyncThunk(
  "anime/topAnime",
  async (payload) => {
    return await animeApi.getTopAnime(payload);
  }
)

export const fetchQuotes = createAsyncThunk(
  "anime/quotes",
  async (payload) => {
    return await animeApi.getQuotes()
  }
)
export const fetchById = createAsyncThunk(
  "anime/byId",
  async (payload) => {
    return await animeApi.geetAnimeById(payload)
  }
)

export const fetchAnimeSearch = createAsyncThunk(
  "anime/AnimeSearch",
  async (payload, action) => {
    return await animeApi.getAnimeSearch(payload)
  }
)
export const fetchAnimeSearchList = createAsyncThunk(
  "anime/AnimeSearchList",
  async (payload, action) => {
    return await animeApi.getAnimeSearch(payload)
  }
)








