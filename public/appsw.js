const APP = {
  SW: null,
  DB: null,
  // attemp to online value
  isOnline: 'onLine' in navigator && navigator.onLine




  , init() {
    APP.registerSW();
    //todo open db
  },
  registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/serviceWorker.js', {
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











      // listen for latest sw
      navigator.serviceWorker.addEventListener('controllerchange', async () => {
        APP.SW = navigator.serviceWorker.controller;
      });












      //listen for messages from the service worker
      navigator.serviceWorker.addEventListener('message', ({ data }) => {
        // agar kuch db se dekhne h tuh yaaha krskty hai 
        // https://gist.github.com/prof3ssorSt3v3/7724c092b7acd45048a2499c3ba223b4#file-app-js-L66
        console.log("got msg from sw", data)

        if ('isOnline' in data) {
          APP.isOnline = data.isOnline;
          let check = app.isOnline ? "confirm online" : "confirm offline"
          console.log(check)
        }

      });








    } else {
      console.log("service worker are not supported")
    }
  },

}

window.addEventListener('load', APP.init)


