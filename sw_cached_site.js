const cacheName = "v2";
const cacheAssets = ["/index.html", "/js/main.js"];

//Service workers are installed
self.addEventListener("install", (e) => {
  console.log("Service Workers are installed");
  e.waitUtil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("Service Workers: Caching files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

//Remove unwanted caches
const cleanUnwantedCaches = (e) => {
  e.waitUtil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Caches");
            return caches.delete(cache);
          }
        })
      );
    })
  );
};

//Service workers are activated
self.addEventListener("activate", (e) => {
  console.log("Service Workers are activated");
  cleanUnwantedCaches(e);
});

//Call Fetch Event
self.addEventListener("fetch", (e) => {
  console.log("Service Worker: Fetching");
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        //Make clone of response
        const resClone = res.clone();
        //Open a cache
        caches.open(cacheName).then((cache) => {
          //Add the response to the cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch((err) => caches.match(e.request).then((res) => res))
  );
});
