const CACHE_NAME = `cache-混音助手`;

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll([
            '/',
            '/index.html',
            '/favicon.ico',
            '/avatar.jpg',
            '/bg.jpeg',
            '/detect-bpm.js',
            '//cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css',
            '//cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js',
            '//www.googletagmanager.com/gtag/js?id=G-HNJVWCDF58',
            '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4648087201834829'
        ]);
    })());
});

self.addEventListener('fetch', event => {
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);

        // Get the resource from the cache.
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
            return cachedResponse;
        } else {
            try {
                // If the resource was not in the cache, try the network.
                const fetchResponse = await fetch(event.request);
                console.dir(cache);
                // Save the resource in the cache and return it.
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
            } catch (e) {
                console.log(e);
                // The network failed.
            }
        }
    })());
});