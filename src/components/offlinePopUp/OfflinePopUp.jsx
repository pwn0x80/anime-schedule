import { useEffect, useState } from "react";
import styled from "styled-components"
import "./offline.css"
import Subject from '../../services/networkCheckObserver';
import cx from 'classnames';
import { useBooleanState, usePrevious } from 'webrix/hooks';
import { Link, Outlet } from "react-router-dom";
const Wrapper = styled.div`
/* postion:fixed; */
    display: ${(props) => props.offline ? "none" : "flex"};
    bottom: 0px;
    position: fixed;
    height: 100px;
    width: 100%;
    background-color: hsl(165deg 7% 11% / 90%);
    z-index: 1;
    flex-direction: row;
    justify-content: space-between;
`;

const OfflinePopUp = ({ children }) => {

  // let [online, isOnline] = useState(navigator.onLine);
  // const isOnlineStatus = useSelector(isOnlineState)
  const { value: online, setFalse: setOffline, setTrue: setOnline } = useBooleanState(navigator.onLine);
  // const previousOnline = usePrevious(online);

  // useEffect(() => {
  //   if (!online) { return void disableBodyScroll(document.body); }

  //   enableBodyScroll(document.body);
  // }, [online]);

  // const [net, setNet] = useState(navigator.onLine)
  // let setOnline = () => {
  //   setNet(true)
  // }
  // let setOffline = () => {
  //   setNet(false)
  // }

  useEffect(() => {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);





  // useEffect(() => {
  //   let updateOnlineStatus = {
  //     signal: function(e) {
  //       // dispatch(isOnlineCheck(e._state))
  //       isOnline(e._state)
  //     }
  //   }
  //   Subject.add(updateOnlineStatus)
  // }, [])
  // const setOnline = () => {
  //   console.log('We are online!');
  //   isOnline(true);
  // };
  // const setOffline = () => {
  //   console.log('We are offline!');
  //   isOnline(false);
  // };
  // useEffect(() => {
  //   window.addEventListener('offline', setOffline);
  //   window.addEventListener('online', setOnline);
  //   console.log("loaaaaaaaaaaaaadddddddddd")
  //   // cleanup if we unmount
  //   return () => {
  //     console.log("cleaaaaaaarrrrrrrrrrr")
  //     window.removeEventListener('offline', setOffline);
  //     window.removeEventListener('online', setOnline);
  //   }
  // }, []);

  return (
    <>

      <Wrapper offline={online} >
        <Link to="bookmark" >

          bookmark list
        </Link>


        OFFLINE MODE
      </Wrapper>

      {/* {children} */}
    </>
  )
}

export default OfflinePopUp
