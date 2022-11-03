const version = 1;
let staticName = `staticCache-${version}`;
let dynamicName = `dynamicCache`;
let fontName = `fontCache`;
let imgName = `imageCache`;


let assets = ['appsw.js', '/', '/static/js/bundle.js', '/manifest.json', '/404.jsx', 'offline.html', '/fail.js']


let imgAssets = [
  '/static/media/logo2.e5effd520039a159ed40.webp',
  '/static/media/logo.640775df0cca6ee6a7d0.webp',
  '/favicon.ico',
  '/test.jpg'
]

self.addEventListener('install', (ev) => {
  ev.waitUntil(
    caches.open(staticName).then(cache => {
      cache.addAll(assets).then(() => {
        console.info("saved")
      },
        (err) => {
          // console.e("failed to updae ")
        }
      );
    })
      .then(() => {
        caches.open(imgName).then((cache) => {
          cache.addAll(imgAssets).then(
            () => {
              // console.log(`image has been updated`)
            },
            (err) => {
              // console.log("failed to updae ")
            }
          )
        })
      })
  )
});
self.addEventListener('activate', (ev) => {
  ev.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => {
          if (key != staticName && key != imgName) {
            return true;
          }
        })
          .map(key => caches.delete(key))
      );
    }))
});

self.addEventListener('fetch', (ev) => {
  ev.respondWith(
    caches.match(ev.request).then((cacheRes) => {

      return (
        fetch(ev.request)
          .then(fetchRes => {

            let type = fetchRes.headers.get('content-type');

            if ((type && type.match(/^text\/css/i)) ||
              ev.request.url.match(/fonts.googleapis.com/i)) {
              caches.open(dynamicName).then(cache => {
                cache.put(ev.request, fetchRes.clone());
                return fetchRes;
              })
            } else if (type && type.match(/^image\/webp/i) ||
              ev.request.url.match(/\.(jpe?g|png|gif|bmp|webp)$/i)
            ) {
              caches.open(imgName).then(cache => {
                cache.put(ev.request, fetchRes.clone()).then(cache => {
                  return fetchRes;
                })
              })
            } else {
              caches.open(dynamicName).then(cache => {
                cache.put(ev.request, fetchRes.clone()).then(() => {
                  return fetchRes;
                },
                  (err) => {
                    // console.log(err)
                  }
                );
              })
            }
            if (fetchRes.status == 404) {

              return caches.match('offline.html')
            }
            // save un dynamic cache 
            return fetchRes.clone()
          },
            (err) => {
              // network offline
              // return caches.match('offline.html')
              return cacheRes
              if (ev.request.url.match(/\.html/i)) {
                return caches.open(imgName).then((cache) => {
                  return cache.match('/static/media/logo.640775df0cca6ee6a7d0.webp')
                })
              }
            }
          )
      )
    })
  );

});


self.addEventListener('message', (ev) => {
  const { data } = ev
  if ('checkOnline' in data) {
    let url = '/test.jpg';
    let req = new Request(url, {
      method: 'HEAD',
    });
    ev.waitUntil(
      fetch(req).then(
        (response) => {
          // console.log('Able to get the test image headers');
          return sendMessage({ isOnline: true });
        },
        (err) => {
          // console.log('Failed to fetch image headers');
          return sendMessage({ isOnline: false });
        }
      )
    );
  }
});


const sendMessage = async (msg) => {
  let allClients = await clients.matchAll({ includeUncontrolled: true });
  return Promise.all(
    allClients.map((client) => {
      if ('isOnline' in msg) {
        console.log('tell the browser if online');
      }
      return client.postMessage(msg);
    })
  );
};
