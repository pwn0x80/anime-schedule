import './App.css';
import styled from 'styled-components';
import AnimeDetail from "./components/AnimeDetail/AnimeDetail"
import { cleanUpSchdules, fetchById, fetchGenres, fetchQuotes, fetchSchedules, fetchTopAnime, getAnimebyId, getQuotes, getSchedules, getTopAnime } from "./redux/thunk"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import TopBar from './TopBar/TopBar';
import SearchList from './components/searchList/SearchList';
import Home from "./Page/Home"

function App() {
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
