import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isOnlineCheck } from "./redux/isOnlineSlice";
import useCheckNetwork from "./services/useCheckNetwork";
import { Subject } from "./services/networkCheckObserver"
const useSwDevs = () => {
  let SW = null;
  let DB = null;

  let isOnline = 'onLine' in navigator && navigator.onLine;
  Subject.setState(isOnline)
  function networkTest() {
    navigator.serviceWorker.controller.postMessage({
      checkOnline: isOnline,
    });

  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('http://localhost:3000/serviceWorker.js', {
      updateViaCache: 'none',
      scope: '/',
    }).then(
      (registration) => {
        SW = registration.installing ||
          registration.waiting ||
          registration.active;
      },
      (error) => {
        console.log("service worker registration failed ", error);
      });
    navigator.serviceWorker.addEventListener('controllerchange', async () => {
      SW = navigator.serviceWorker.controller;
    });

    navigator.serviceWorker.addEventListener('message', ({ data }) => {
      console.log("got msg from sw", data)
      Subject.setState(data.isOnline)
      if ('isOnline' in data) {
        isOnline = data.isOnline;
        let check = isOnline ? "confirm online" : "confirm offline"
        console.log(check)
      }
    })
  } else {
    console.log("service worker are not supported")
  }
  return (networkTest)

}

export default useSwDevs 
