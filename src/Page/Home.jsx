import styled from "styled-components";
import LeftWrapper from "../components/LeftBar/LeftBar";
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
// import fetchById, fetchGenres, fetchQuotes, fetchSchedules, fetchTopAnime, getAnimebyId, getQuotes, getTopAnime } from "../redux/thunk"
import { getSchedules, cleanUpSchdules, } from "../redux/schedulesSlice"
import { useInfiniteScroller } from '@pwn0x80/react-infinite-scroller';
import produce from 'immer';
import { assoc, isEmpty, pick, pipe, map } from 'ramda';
import { defaults } from "lodash";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Card from "../components/Card/Card"
import { fetchSchedules, fetchTopAnime } from "../redux/thunk";
import { getTopAnime } from "../redux/reducers";

const GridWrapper = styled.div`
display: grid;
grid-column:2/5;

  
  
grid-gap:9px;

/* display:grid; */

    /* font-size: 7px; */
/* grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); */
      grid-template-columns: repeat(auto-fill, minmax(min(400px/1, max(64px, 800px/5)), 1fr));
    /* grid-auto-rows: auto; */
/* grid-auto-columns:1px; */
/* grid-template-columns: repeat(3, 1fr); */
/* grid-template-columns: repeat(auto-fit, minmax(160px, 160px)); */
 /* grid-column: 1 / 6; /* adjustment */ */
  /* grid-row: 1 / 3;    /* adjustment */ */
    /* max-width: 1000px; */
/* grid-auto-columns: 75px; */
/* grid-auto-flow: column; */
/* grid-template-columns: repeat(auto-fit, 12rem); */
    /* grid-auto-rows: 200px; */
/* min-height: 0;  /* NEW */ */
  /* min-width: 0;  */
`;




const RightBar = styled.div`

grid-column:5/6;
/* display:grid; */
  
/* grid-auto-columns:130px; */
/* grid-auto-rows:320px; */
  /* grid-gap:1rem; */
/* grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); */
/* /* grid-template-columns: repeat(3,1fr); */ */
/*   gap:0.6rem; */
/* grid-template-columns: repeat(auto-fit, minmax(7rem, 11px)); */
/* max-width:100px; */
`;


const Wrapper = styled.div`
/* text-align:center; */
/* text-align:-webkit-center */
/* display: flex; */
display:grid;
/* free space remove imp */
  grid-auto-rows: 100px;
grid-template-columns: repeat(6, 20%);
/* grid-template-columns: repeat(auto-fit, minmax(160px, 160px)); */
`;
const LeftBar = styled.div`
grid-column:1/2;
`

//second Page

function Home() {
  //convert into useContext
  let customParams = {
    page: 1,
  }

  return (
    <Wrapper>
      <LeftWrapper customParams={customParams} />
      <MainWrapper customParams={customParams} />
      <TopAnimeList />
    </Wrapper >
  )
}
let MainWrapper = ({ customParams }) => {
  const schedulesData = useSelector(getSchedules)
  const [storeData, setStoreData] = useState({
    pagination: {},
    data: []
  });
  const dispatch = useDispatch()
  useEffect(() => {
    if (schedulesData.data == null) return
    if (customParams.page == 1) {
      setStoreData(
        produce((draft) => {
          draft.data = []
          draft.pagination = {}
        })
      )
    }
    setStoreData(
      produce((draft) => {
        draft.data.push(...schedulesData?.data)
        draft.pagination = schedulesData?.pagination
      })
    )
    return (
      () => dispatch(cleanUpSchdules())
    )
  }, [schedulesData])
  return (

    <MainPageWrape storeData={storeData} customParams={customParams} />

  )

}

let AnimeDetailPage = ({ children, clickTrigger }) => {
  let customprops = {
  }
  return React.Children.map((children, child =>
    React.cloneElement(child, {}))

  )
}

let MainPageWrape = ({ storeData, customParams }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { scrollFetch, setScrollFetch, InfiniteScroll } = useInfiniteScroller()
  useEffect(() => {
    if (storeData.pagination.has_next_page == false) return
    dispatch(fetchSchedules(customParams))
    customParams.page = customParams.page + 1
  }, [scrollFetch])
  let clickTrigger = (data) => () => {
    let id = data.mal_id
    navigate("/" + id)
  }
  return (
    <>
      <GridWrapper>
        {
          isEmpty(storeData) ? "loading" :
            storeData?.data?.map((data, keys) => {
              return (
                <>
                  <div >
                    <Link to={`/${data.mal_id}`} >
                      <InfiniteScroll len={storeData.data.length} >
                        <Card data={data} key={keys} />
                      </InfiniteScroll>
                    </Link>
                  </div>
                </>
              )
            })
        }

      </GridWrapper>

    </>
  )
}
let TopAnimeList = () => {
  const topAnimeList = useSelector(getTopAnime)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTopAnime({ limit: 10 }))
  }, [])


  return (
    <RightBar>
      {
        topAnimeList?.map((data, keys) => {
          return (
            <>
              <Card data={data} key={keys} />
            </>
          )

        })
      }

    </RightBar>
  )
}
export default Home;
