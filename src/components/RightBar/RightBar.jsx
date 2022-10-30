import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getTopAnime } from "../../redux/reducers";
import { fetchTopAnime } from "../../redux/thunk";



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
width: 50px;
padding-inline:10px;
`;
const Infowrapper = styled.div`
display:flex;repeat(6,20%)
    flex-wrap: wrap;
div{
  padding-inline: 0.2rem;
}
`;


const RightBar = () => {
  const dispatch = useDispatch()
  const animeList = useSelector(getTopAnime)
  useEffect(() => {
    dispatch(fetchTopAnime({ limit: 10 }))
  }, [])
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
        animeList?.map((e, keys) => {
          return (
            <Link to={`/${e.mal_id}`} >
              <div key={keys}>
                <Wrapper>
                  <Img src={e.images.webp.large_image_url} />
                  <div>
                    <span>{e.title}</span>
                    <Infowrapper>
                      <div>Episodes: {e.episodes}</div>
                    </Infowrapper>
                  </div>
                </Wrapper>
              </div>
            </Link>
          )
        })
      }

    </div >

  )
}

export default RightBar
