import React from "react"
import { BsAward } from "react-icons/bs"

const AwardBadge = ({ child, Icon, color, size }) => {

  console.log(child);
  return (

    <React.Fragment >
      < Icon style={{ color: color, fontSize: size }} />
    </React.Fragment>

  )
}


const Common = ({ color, size }) => {
  return (
    <>
      <AwardBadge Icon={BsAward} color={color} size={size} />

    </>
  )
}
export default Common


