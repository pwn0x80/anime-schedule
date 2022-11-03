import { useDispatch } from "react-redux";
import { isOnlineCheck } from "./redux/isOnlineSlice";
import useCheckNetwork from "./services/useCheckNetwork";

const APP = {
  SW: null,
  DB: null,
  isOnline: 'onLine' in navigator && navigator.onLine
  ,
  onlineTest: function() {
  }
  ,
  networkTest() {
    navigator.serviceWorker.controller.postMessage({
      checkOnline: APP.isOnline,
    });

  }
  , init() {

    window.addEventListener('online', APP.goneOnline);
    window.addEventListener('offline', APP.goneOffline);
    APP.registerSW();
    //todo open db

  },
  goneOnline(ev) {
    APP.isOnline = true;
  },
  goneOffline(ev) {
    APP.isOffline = false;
  },
  registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('http://localhost:3000/serviceWorker.js', {
        updateViaCache: 'none',
        scope: '/',
      }).then(
        (registration) => {
          APP.SW = registration.installing ||
            registration.waiting ||
            registration.active;
        },
        (error) => {
          console.log("service worker registration failed ", error);
        });











      navigator.serviceWorker.addEventListener('controllerchange', async () => {
        APP.SW = navigator.serviceWorker.controller;
      });












      navigator.serviceWorker.addEventListener('message', ({ data }) => {
        console.log("got msg from sw", data)

        if ('isOnline' in data) {
          APP.isOnline = data.isOnline;
          let event = new Event("custom")
          event.dispatchEvent(event)
          let check = APP.isOnline ? "confirm online" : "confirm offline"
          console.log(check)
        }

      })


    } else {
      console.log("service worker are not supported")
    }
  }

}


export default function swDev() {

  document.addEventListener("custom", function(event) { // (1)
    alert("Hello from " + event.target.tagName); // Hello from H1
  });
  let swUrl = 'http://localhost:3000/serviceWorker.js';

  window.addEventListener('load', APP.init)

}


export function serverTrigger() {
  console.log("inside swDev")
  console.log(APP.onlineTest())
  console.log(APP.networkTest())

}


