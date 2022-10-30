import { forwardRef } from "react";
import styled from "styled-components";


const CardWrapper = styled.div`

    `;
const CardContainer = styled.div`
/* display:grid; */
overflowWrap: 'break-word'; 
color: hsl(0deg 0% 100%);
width:min(12rem, 100%);
  /* height: 220px; */
    background: hsl(223deg 8% 18%);
border-radius:15px;

`;

const CardImage = styled.div`
background: url(${(props) => props.imgUrl});
    height:170px !important;
    background-size:cover;
  `;

const Card = forwardRef((props, ref) => {
  const { data } = props;
  // console.log(data.images?.webp?.image_url)
  return (
    <CardContainer>
      <CardImage imgUrl={data.images.webp.large_image_url}>
      </CardImage>
      <div style={{ overflowWrap: 'break-word', width: '160px' }} >
        <span>{data.title} </span>
      </div>
    </CardContainer >
  )
})

export default Card
