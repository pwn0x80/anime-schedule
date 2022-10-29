import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useSearchParams } from "react-router-dom"
import styled from "styled-components"

import { useInfiniteScroller } from '@pwn0x80/react-infinite-scroller';
import { animeSearchList } from "../../redux/reducers"
import { fetchAnimeSearchList } from "../../redux/thunk";
const Wrapper = styled.div`
color:white;
display:inline-flex;
span{
      height: fit-content;
  font-weight: bold;
  
}
`;
let paramsQueryParser = (url) => {
  let urlyield = url.entries();
  let tmp = {};
  for (let [key, value] of urlyield) {
    tmp[key] = value
  }
  return tmp

}
const Img = styled.img`
width: 100px;
padding-inline:10px;
`;
const Infowrapper = styled.div`
display:flex;
    flex-wrap: wrap;
div{
  padding-inline: 0.2rem;
}
`;

const SearchList = () => {

  const { scrollFetch, setScrollFetch, InfiniteScroll } = useInfiniteScroller()
  const dispatch = useDispatch()
  const [params] = useSearchParams()
  const animeList = useSelector(animeSearchList)
  useEffect(() => {
    let url = new URLSearchParams(window.location.search);
    let urlobj = paramsQueryParser(url)
    dispatch(fetchAnimeSearchList(urlobj))
  }, [params])
  if (animeList?.data?.length == 0) {
    return (
      <>
        loading...
      </>
    )
  }
  return (
    <div >
      {
        animeList?.data?.map((e, keys) => {
          return (
            <Link to={`/${e.mal_id}`} >
              <InfiniteScroll len={animeList?.data?.length} >
                <div key={keys}>
                  <Wrapper>
                    <Img src={e.images.webp.large_image_url} />
                    <div>
                      <span>{e.title}</span>
                      <Infowrapper>
                        <div>Episodes: {e.episodes}</div>
                        <div>Duration: {e.duration}</div>
                        <div>type: {e.type}</div>
                      </Infowrapper>
                    </div>
                  </Wrapper>
                </div>
              </InfiniteScroll>
            </Link>
          )
        })
      }
    </div>
  )
}

export default SearchList
