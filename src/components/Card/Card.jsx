import { forwardRef } from "react";
import styled from "styled-components";


const CardWrapper = styled.div`
/* grid-auto-row:10px; */
/* grid-columns:3rem; */
/* height:50px; */

 /* max-width: 100%; */
/* width:min(20vw,50vw); */
/* min-width:160px; */
/* min-height:200px; */
    /* width: 11vw; */
/* height:30vw; */
  /* width: 500px;  // assume this is the default size */
/* width: 80%; */
/* min-width:auto; */
/* max-width:auto; */
/* min-height:100%; */
/* height:190px; */
/* min-width:100%; */
/* max-width: 100%; */
  /* width: 500px; */

/* grid-auto-columns: 7px; */

    /* position:absolute; */
    /* width: calc(30% - 14px); */

    `;
const Wrapper = styled.div`
/* display:grid; */
overflowWrap: 'break-word'; 
color: hsl(0deg 0% 100%);
width:160px;
  height: 220px;

    background: hsl(223deg 8% 18%);
border-radius:15px;


    /* text-align: -webkit-center; */
/* display:grid; */
/* grid-template-columns: repeat(auto-fill, minmax(186px, 1fr)); */
    /* grid-auto-rows: 200px; */
`;

const Image = styled.img`
    width:  160px;
    height:170px;

border-radius:15px;
    /* max-height:10px; */
    /* position:relative; */
    /* object-fit: contain; */
  `;

const Card = forwardRef((props, ref) => {
  const { data } = props;
  // console.log(data.images?.webp?.image_url)
  return (
    <Wrapper>
      <CardWrapper ref={ref} >
        <Image src={data.images.webp.large_image_url} />
      </CardWrapper>
      <div style={{ overflowWrap: 'break-word', width: '160px' }} >
        <span>{data.title} </span>
      </div>
    </Wrapper >
  )
})

export default Card
