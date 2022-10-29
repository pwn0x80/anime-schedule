import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import React, { useEffect } from 'react';
import { fetchSchedules, fetchGenres, fetchQuotes } from "../../redux/thunk.js"
import { getQuotes } from '../../redux/reducers.js';
let QuotesWrapper = styled.div`
background-color:green;
/* border-radius:5px; */
/* padding:12px; */
/* margin:12px; */
    max-width: 90%;
`;
const QuotesName = styled.div`
padding:6px;

`;
const QuotesAnime = styled.div`
font-size: 0.8rem;
padding: 5px;
`;

const LeftBar = styled.div`
grid-column:1/2;
`
const DayWrapper = styled.span`

    /* display: inline-block; */
display:grid;
    background-color:green;

/* grid-template-columns: repeat(3,1fr); */
  /* gap:9.9rem; */
    text-align:center;
/* grid-template-columns: repeat(auto-fit, minmax(6rem, 5px)); */

/* grid-template-columns: repeat(auto-fit, minmax(160px, 160px)); */

  grid-template-columns: repeat(auto-fit, minmax(min(100%/0, max(64px, 100%/3)), 1fr));
    font-size: 0.9rem;
    max-width: 90%;
/* max-width:400px; */

`;
const Day = styled.span`
/* padding:5px; */

padding:0.5rem;
`;




let Quotes = () => {
  const dispatch = useDispatch()
  const quotes = useSelector(getQuotes)
  useEffect(() => {
    dispatch(fetchQuotes())
  }, [])
  return (
    <QuotesWrapper>
      <QuotesName>
        {quotes.quote}
      </QuotesName>
      <QuotesAnime>
        {quotes.anime}
      </QuotesAnime>
    </QuotesWrapper>
  )
}





let callCurring = (...fns) => (...args) => {
  fns.forEach(fn => {
    fn(...args)
  })
}
let ClickWrapper = ({ children, day, getfetchday, resetPg }, props) => {
  const dispatch = useDispatch()
  let customprops = {
    onClick: callCurring(resetPg, day, getfetchday)
  }
  return React.Children.map(children, child =>
    React.cloneElement(child, { ...customprops }))
}



const LeftWrapper = ({ customParams }) => {
  let dispatch = useDispatch()
  let day = (param) => { customParams.filter = param.target.innerHTML }
  let getfetchday = () => {
    dispatch(fetchSchedules(customParams))
  }
  let getfetchgenres = () => {
    dispatch(fetchGenres(customParams))
  }
  let resetPg = (customParams) => () => {
    customParams.page = 1
  }
  return (
    <LeftBar>
      <DayWrapper>
        <ClickWrapper day={day} getfetchday={getfetchday} resetPg={resetPg(customParams)}  >
          <Day >Monday</Day>
          <Day>Tuesday</Day>
          <Day>Wednesday</Day>
          <Day>Thursday</Day>
          <Day>Friday</Day>
          <Day>Saturday</Day>
          <Day>Sunday</Day>
        </ClickWrapper>
      </DayWrapper>

      {/* <GenresWrapper> */}

      {/*   <ClickWrapper day={day} getfetchday={getfetchgenres} resetPg={resetPg} > */}
      {/*     <Genres>Adventure</Genres> */}
      {/*     <Genres>Comedy</Genres> */}
      {/*     <Genres>Horror</Genres> */}
      {/*     <Genres>Mystery</Genres> */}
      {/*     <Genres>Romance</Genres> */}
      {/*     <Genres>Sports</Genres> */}
      {/*     <Genres>supernatural</Genres> */}
      {/*     <Genres>suspense</Genres> */}
      {/*     <Genres>Childcare</Genres> */}
      {/*     <Genres>Detective</Genres> */}
      {/*     <Genres>School</Genres> */}

      {/*   </ClickWrapper> */}
      {/* </GenresWrapper> */}
      <Quotes />
    </LeftBar>

  )
}

export default LeftWrapper;
