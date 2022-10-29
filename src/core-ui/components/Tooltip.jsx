import React, { useRef, useState } from "react"
import Portal from "./Portal"
import styled from "styled-components";
const StyledToolKit = styled.span`
  position: fixed;
  top: ${(p) => p.posRef.current.y}px;
  left: ${(p) => p.posRef.current.x}px;
  font-size: 12px;
  background-color: gold;
  color: white;
  padding: 7px 10px;
  border-radius: 4px;
  z-index: 99;
  display:inline-block;
  white-space: no-wrap;
  opacity: ${p => p.show};
`

const point = () => ({
  x: null,
  y: null,
  reset(p) {
    this.x = p.x;
    this.y = p.y;
  },

})

let position = (p) => ({
  current: p,
  swap() {
    if (this.current === "left") return "right";
    if (this.current === "right") return "left";
    if (this.current === "top") return "bottom";
    if (this.current === "bottom") return "top";
  },
  isHorizontal() {
    return this.current === "left" || this.current == "right";
  },
  isVertical() {
    return this.current === "top" || this.current === "bottom";
  }
})


let getPoint = (primaryBtn, floatingChild, placement, space) => {
  let recursiveCount = 0
  let pt = point();
  const bdys = {
    l: space,
    t: space,
    r: document.body.clientWidth - (floatingChild.clientWidth + space),
    b: window.innerHeight - (floatingChild.clientHeight + space)
  };
  const primaryBtnRect = primaryBtn.getBoundingClientRect()

  return (function recursive(placement) {
    recursiveCount++
    let pos = position(placement);
    switch (pos.current) {
      case "left":
        pt.x = primaryBtnRect.left - (floatingChild.offsetWidth + space);
        pt.y = primaryBtnRect.top + (primaryBtn.offsetHeight - floatingChild.offsetHeight) / 2;
        break;
      case "right":
        pt.x = primaryBtnRect.right + space;
        pt.y = primaryBtnRect.top + (primaryBtn.offsetHeight - floatingChild.offsetHeight) / 2;
        break;
      case "top":
        console.log("top")
        pt.x = primaryBtnRect.left + (primaryBtn.offsetWidth - floatingChild.offsetWidth) / 2;
        pt.y = primaryBtnRect.top - (floatingChild.offsetHeight + space);
        break;
      default:
        console.log("bottom")
        pt.x = primaryBtnRect.left + (primaryBtn.offsetWidth - floatingChild.offsetWidth) / 2;
        pt.y = primaryBtnRect.bottom + space;
    }

    console.log(pt.y, bdys.t, bdys.b)
    if (recursiveCount < 3)
      if (
        (pos.isHorizontal() && (pt.x < bdys.l || pt.x > bdys.r)) ||
        (pos.isVertical() && (pt.y < bdys.t || pt.y > bdys.b))
      ) {
        recursive(pos.swap())
      }
    return pt;
  })(placement);
}


// tooltipRef -- floating child
// e.currentTarget -- button onHover 

const Tooltip = ({ text, children,
  placement = "down",
  space = 1
}) => {
  const posRef = useRef({ x: 0, y: 0 });

  const [show, setShow] = useState(0);
  const tooltipRef = useRef()
  const handleOver = (e) => {
    console.log(tooltipRef.current)
    setShow(1);
    posRef.current = getPoint(e.currentTarget, tooltipRef.current, placement, space);
  };
  const handleOut = () => {
    setShow(0)
    posRef.current = () => ({ x: 0, y: 0 })
  }
  return (
    <>
      {React.cloneElement(children, {
        onMouseOver: handleOver,
        onMouseOut: handleOut
      })}
      <Portal
      >
        <StyledToolKit onMouseOut={handleOut}
          onMouseOver={handleOver}

          show={show} ref={tooltipRef} posRef={posRef} >{text}</StyledToolKit>
      </Portal>
    </>
  )
}

export default Tooltip
