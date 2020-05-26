const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';
const assets = [
    '/index.html',
    '/vendor/js/app.js',
    '/js/ui.js',
    '/vendor/js/materialize.min.js',
    '/vendor/css/login.css',
    '/vendor/css/main.css',
    '/vendor/css/materialize.min.css',
    '/vendor/css/modal.css',
    '/vendor/css/style2.css',
    '/vendor/css/styles.css',
    '/vendor/css/util.css',
    '/vendor/img/4q.png',
    '/vendor/img/blueticket.png',
    '/vendor/img/greenticket.png',
    '/vendor/img/ISI_logo.png',
    '/vendor/img/isi_logo1.png',
    '/vendor/img/ISI_logoaaa.png',
    '/vendor/img/ISIC.png',
    '/vendor/img/ISIlOGO.png',
    '/vendor/img/ISILOGO3.png',
    '/vendor/img/LoginPic1',
    '/vendor/img/LoginPic2',
    '/vendor/img/logo.png',
    '/vendor/img/logobaby.png',
    '/vendor/img/logobranco.png',
    '/vendor/img/LOGOF.png',
    '/vendor/img/LOGOFF.png',
    '/vendor/img/logofinal2020.png',
    '/vendor/img/logoninfo.png',
    '/vendor/img/logooooo.png',
    '/vendor/img/ninfo.png',
    '/vendor/img/orangeticket.png',
    '/vendor/img/purpleticket.png',
    '/vendor/img/qrcode.png',
    '/vendor/img/qua.png',
    '/vendor/img/qualidades.png',
    '/vendor/img/whitelogo.png',
    '/vendor/img/whitelogo2.png',
    '/vendor/img/yellowticket.png',
    '/vendor/img/icons/icon-72x72.png',
    '/vendor/img/icons/icon-96x96.png',
    '/vendor/img/icons/icon-128x128.png',
    '/vendor/img/icons/icon-144x144.png',
    '/vendor/img/icons/icon-152x152.png',
    '/vendor/img/icons/icon-192x192.png',
    '/vendor/img/icons/icon-384x384.png',
    '/vendor/img/icons/icon-384x384.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    'https://gmgoamodcdcjnbaobigkjelfplakmdhh/include.preload.js.map',
    '/vendor/pages/fallback.html'
];

// cache size limit function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    });
};

// install event
self.addEventListener('install', evt => {
    //console.log('service worker installed');
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});

// activate event
self.addEventListener('activate', evt => {
    //console.log('service worker activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            //console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});

// fetch event
self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    // check cached items size
                    limitCacheSize(dynamicCacheName, 15);
                    return fetchRes;
                })
            });
        }).catch(() => {
            if (evt.request.url.indexOf('.html') > -1) {
                return caches.match('/vendor/pages/fallback.html');
            }
        })
    );
});