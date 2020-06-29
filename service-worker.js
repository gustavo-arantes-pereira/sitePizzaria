var CACHE_NAME = 'cache-tp-v1';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        'css/estilopizzaria.css',
        'js/script.js',
      ]);
    })
  );
});

self.addEventListener('activate', function activator(event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) {
          if (CACHE_NAME.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if(response){
        // Êxito no cache - retorna a resposta 
        return response;
      }

      // IMPORTANTE: Clone a solicitação (request). Uma solicitação é uma corrente (stream) e
      // será consumida uma única vez. Enquanto consumimos ela uma vez para o cache e
      // outra para o navegador para buscar (fetch), precisamos clonar a resposta (response)
      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(
        function(response) {
          // Confere se recebemos uma resposta (response) válida
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }          

          // IMPORTANTE: Clone a resposta. Uma resposta também é uma corrente (stream)
          var responseToCache = response.clone();

          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseToCache);
          });

          return response;
        }
      );
    })
  );
});
