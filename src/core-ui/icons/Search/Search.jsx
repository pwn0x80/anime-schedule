import { AiOutlineSearch } from "react-icons/ai";
import React from "react";
const Search = ({ color, size }) => {
  return (
    <React.Fragment >
      <AiOutlineSearch style={{ color: color, fontSize: size }} />
    </React.Fragment>
  )

}

export default Search
