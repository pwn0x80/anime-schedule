import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { isOnlineCheck } from "../redux/isOnlineSlice"

const useCheckNetwork = () => {

  let dispatch = new useDispatch()
  console.log("insioe hook")
  useEffect(() => {
    dispatch(isOnlineCheck({ payload: false }))
  }, [])
}

export default useCheckNetwork


