import Common from "./Icon/Common"

import { IoFilterOutline } from 'react-icons/io5';
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai"
import { BsFillCloudUploadFill } from "react-icons/bs"
import { FaRandom } from "react-icons/fa"
import { BiTrendingUp } from "react-icons/bi"
import { BsAward } from "react-icons/bs"
let isIconInclude = (Icon) => {
  if (Icon == 'awardIcon')
    return BsAward;
  if (Icon == 'trendingIcon')
    return BiTrendingUp;
  if (Icon == 'randomIcon')
    return FaRandom;
  if (Icon == 'uploadIcon')
    return BsFillCloudUploadFill;
  if (Icon == 'searchIcon')
    return AiOutlineSearch;
  if (Icon == 'filterIcon')
    return IoFilterOutline;

}
const IconMiddleware = ({ Icon, color, size, classStyle }) => {
  let ret = isIconInclude(Icon);
  return (
    <>
      {
        (ret) ?
          <Common Icon={ret} color={color} size={size} classStyle={classStyle} />
          : ""
      }
    </>
  )
}
export default IconMiddleware
export { default as SearchIcon } from "./Search"
