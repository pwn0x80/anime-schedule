import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useSearchParams } from "react-router-dom";
import styled from "styled-components"
import { cleanUpAnimeById, getAnimebyId } from "../../redux/animeByIdSlice";
import { fetchById } from "../../redux/thunk";

const Wrapper = styled.div`
display:grid;
row-gap:2rem;
color:white;
-webkit-filter: blur(0px);
    -moz-filter: blur(0px);
    -o-filter: blur(0px);
    -ms-filter: blur(0px);
    filter: blur(0px);
grid-template-columns: repeat(1,1fr);
  
  
    @media(min-width:30em){
grid-template-columns: repeat(3,1fr);
`;

const BgWrapper = styled.div`

background:${(props) => `url(${props.url}) no-repeat  center`};
filter: blur(9px);
    position: absolute;
    width: 100vw;
    height: 92vh;
    background-size: cover;
background-position: center;

    /* transform: scale(1.4); */
`;
let BgColorWrapper = styled.div`
background: hsl(223deg 8% 18% / 35%);
height:92vh;


    /* transform: scale(1.4); */
width:100%;
    position: absolute;
`;
const Img = styled.img`

    place-self: center;
@media( min-width:30em){
    grid-row: 1/16;

}
/* justify-self: center; */
`;
const InfoWrapper = styled.div`
    @media(min-width:30em){

    grid-column: 1/4;
    }
`;
const SynopsisWrapper = styled.div`
    align-self: center;
@media( min-width:30em){

grid-column: 1/3;
    /* grid-row: 4/9; */
}
`;
const TitleWrapper = styled.div`
font-size:2.3rem;


    font-weight: bold;
/* font-size: 30px; */
`;
const InfoBlockWrapper = styled.div`
display: flex;
flex-wrap:wrap;
`;
const InfoBlock = styled.div`
border-radius:12px;
font-weight:bold;
margin-inline: 0.2rem;
border: 2px solid hsl(0deg 0% 100%);
padding-inline:1rem

`;
const AirWrapper = styled.div`

span{
  font-weight:bold;
text-transform: capitalize;
}

}
`;
const AnimeDetail = () => {
  const animeData = useSelector(getAnimebyId)
  const location = useLocation();
  const dispatch = useDispatch()
  useEffect(() => {
    let endpoint = window.location.pathname
    let animeId = endpoint.replace('/', '')
    dispatch(fetchById(animeId))
    return (
      () => dispatch(cleanUpAnimeById())
    )
  }, [location])
  return (
    <>
      <BgWrapper url={animeData?.images?.webp?.image_url} ></BgWrapper>
      <BgColorWrapper></BgColorWrapper>
      <Wrapper >
        <Img src={animeData?.images?.webp?.image_url} />
        <TitleWrapper>{animeData?.title}</TitleWrapper>
        <InfoWrapper>
          <InfoBlockWrapper>
            <InfoBlock>rank: {animeData?.rank}</InfoBlock>
            <InfoBlock>type: {animeData?.type}</InfoBlock>
            <InfoBlock>Status: {animeData?.airing ? "Currently airing" : "Finished Airing"}</InfoBlock>
            <InfoBlock>rate: {animeData?.rating}</InfoBlock>
            <InfoBlock>score: {animeData?.score}</InfoBlock>
            <InfoBlock>duration: {animeData?.duration}</InfoBlock>
          </InfoBlockWrapper>
        </InfoWrapper>
        <AirWrapper><span>aired from-</span> {animeData?.aired.from ? animeData?.aired.from : "???"}</AirWrapper>
        <AirWrapper><span>to-</span> {animeData?.aired.to ? animeData?.aired.from : "???"}</AirWrapper>
        <SynopsisWrapper>{animeData?.synopsis}</SynopsisWrapper>
      </Wrapper>
    </>
  )
}
export default AnimeDetail
