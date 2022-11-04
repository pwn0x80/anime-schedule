import React, { useCallback, useEffect, useRef, useState } from "react";
import "./TopBar.css";

import { Link, useNavigate } from "react-router-dom";
// import { AiOutlineMenu } from "react-icons/ai"
import IconMiddleware from "../core-ui/icons"
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";
import { animeSearch } from "../redux/reducers";
import { fetchAnimeSearch } from "../redux/thunk";
import Bookmark from "../components/bookmark/Bookmark";


let SearchListtopbar = styled.div`
position:absolute;
background-color:red;
  
    width: min(16vw, 30vmax );
  height: 200px;
  border-radius: 20px;
  background-color: white;
  padding-block: 0.4rem;
  padding-inline: 16px;

    overflow-y: auto;
`;
const SearchItem = styled.div`

`;

const SuggestionPopup = styled.div`
display:${(prop) => prop.isvisible ? "" : "none"}
`;

let debounced = (fn, timeout) => {
  let settime;
  return function(...arg) {
    clearTimeout(settime)
    settime = setTimeout(() => {
      fn.apply(this, arg)
    }, timeout)

  }
}

export default function() {

  const searchAnimeList = useSelector(animeSearch);
  const dispatch = useDispatch()
  const [searchString, setSearchString] = useState()
  const navigate = useNavigate()

  let [isVisible, setVisible] = useState(false);
  const ref = useRef()
  const showSuggestion = () => setVisible(true);
  const hideSuggestion = () => setVisible(false);
  let keypress = (e) => {
    if (e.key === "Enter") {
      hideSuggestion()
      navigate("search?q=" + searchString)
    }

  }

  const handleClick = (e) => {

    let navBartoggle = ref.current.getAttribute('data-visible');
    if (ref.current.getAttribute('data-visible') === 'true') {
      ref.current.setAttribute('data-visible', 'false');
    } else if (ref.current.getAttribute('data-visible') === 'false') {

      ref.current.setAttribute('data-visible', 'true');
    }
  };

  useEffect(() => {
    window.addEventListener("mouseup", clickOutside);

    return () => {
      window.removeEventListener("mouseup", clickOutside);
    };
  }, []);

  const clickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      hideSuggestion();
    }
  };
  const searchTrigger = (e) => {
    let customConfig = {
      q: e.target.value,
      limit: 5
    }
    dispatch(fetchAnimeSearch(customConfig))

  }
  let debouncetrigger = useCallback((debounced(searchTrigger, 3000)), [])
  return (
    <div className="top--wrapper">
      <div className="inner--left--wrapper">
        <Link to="/">
          <div className="animationlogo"> </div>
        </Link>
        <Link to="/">
          <div className="logoText">
            <span id="ascedance">S <span id="icolor">C</span><span>HE</span><span id="forum" >DUL</span>E</span>
            <div id="forum">A<span className="dimO" >N</span>I<span className="ushape">M</span>E</div>
          </div>
        </Link>
      </div>
      {/* search bar */}
      <div className="search--wrapper--box" ref={ref} >
        <div>
          <div className="search--wrapper">
            < IconMiddleware Icon={"searchIcon"} color="green" />
            <input className="searchInputTopbar" placeholder="search..." onChange={(e) => { debouncetrigger(e); setSearchString(e.target.value); showSuggestion() }
            } onKeyPress={keypress} />

          </div>

          <SuggestionPopup isvisible={isVisible} >
            <SearchListtopbar  >
              {
                searchAnimeList?.data?.map((e) => {

                  return (
                    <Link to={`/${e.mal_id}`}>
                      <SearchItem>{e.title} <hr /> </SearchItem>
                    </Link>
                  )
                })
              }
            </SearchListtopbar>
          </SuggestionPopup>
        </div>
      </div>
      <div className="mob-nav-bar" style={{ color: "white" }} onClick={handleClick}  >
      </div>

      <div className={"nav--wrapper"} ref={ref} data-visible="false" >
        <div className="ranklist--wrapper">
          <div className="inner--left--wrapper">
            <Link to={"/bookmark"}>
              <div className="iconName">
                < IconMiddleware Icon={"awardIcon"} classStyle={('rankerList')} />
                <span className="spanText">Bookmark</span>
              </div>
            </Link>
            <div className="iconName">
              < IconMiddleware Icon={"trendingIcon"} classStyle={('rankerList')} />
              <span className="spanText">Popular</span>
            </div>
            <div className="iconName">
              < IconMiddleware Icon={"randomIcon"} classStyle={('rankerList')} />
              <span className="spanText">Popular</span>
            </div>
          </div>
        </div>
        <div className="right--wrapper">
          <div className="inner--left--wrapper">
          </div>
        </div>
        <div className="upload--wrapper" >
          <div className="inner--left--wrapper">
          </div>
        </div>
      </div>

    </div >
  );
}
