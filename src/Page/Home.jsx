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

import RightBar from "../components/RightBar/RightBar";
const SidebarWrapper = styled.div`
display:none;
    @media(min-width:50em){
display:block;
    }
`;

const GridWrapper = styled.div`
display: grid;
grid-gap:0.5rem;
grid-column: 1/6;
      grid-template-columns: repeat(auto-fill, minmax(min(400px/1, max(64px, 800px/5)), 1fr));
    @media(min-width:50em){
grid-column:2/5;
}
`;

const Wrapper = styled.div`
display:grid;
  grid-auto-rows: 100px;
grid-template-columns: repeat(6, 20%);
`;
const LeftBar = styled.div`
grid-column:1/2;
`;
const TopanimeWrapper = styled.div`
display: none;

`;
const RightBarcss = styled.div`
grid-column:1/2;
`;

function Home() {
  let customParams = {
    page: 1,
  }

  return (
    <Wrapper>
      <SidebarWrapper>
        <LeftWrapper customParams={customParams} />

      </SidebarWrapper>
      <MainWrapper customParams={customParams} />

      <SidebarWrapper>
        <RightBar />
      </SidebarWrapper>
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
export default Home;
