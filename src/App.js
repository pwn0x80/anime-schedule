import './App.css';
import styled from 'styled-components';
import AnimeDetail from "./components/AnimeDetail/AnimeDetail"
import { cleanUpSchdules, fetchById, fetchGenres, fetchQuotes, fetchSchedules, fetchTopAnime, getAnimebyId, getQuotes, getSchedules, getTopAnime } from "./redux/thunk"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import TopBar from './TopBar/TopBar';
import SearchList from './components/searchList/SearchList';
import Home from "./Page/Home"
import Subject from './services/networkCheckObserver';

import { useRef } from 'react';
import swDevs from './swDevs';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isOnlineCheck, isOnlineState } from './redux/isOnlineSlice';
// import { isOnline } from './redux/isOnlineSlice';
function App() {
  const dispatch = useDispatch()
  const isOnlineStatus = useSelector(isOnlineState)
  useEffect(() => {
    let updateOnlineStatus = {
      signal: function(e) {
        dispatch(isOnlineCheck(e._state))
      }

    }
    Subject.add(updateOnlineStatus)
    swDevs()
  }, [])
  return (
    <>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:id" element={<AnimeDetail />} />
          <Route path="/search" element={<SearchList />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
