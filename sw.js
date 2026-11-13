const CACHE_NAME = "hearth-wonder-math-hub-v18";
const NETWORK_TIMEOUT_MS = 2500;
const CORE_SHELL_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.svg",
  "./hub/hub.css",
  "./hub/hub-art.js",
  "./hub/hub.js",
  "./shared/pwa-register.js",
  "./shared/grades-registry.js",
  "./shared/audio-engine.js",
  "./shared/cpa-primitives.js",
  "./shared/vendor/three/three.min.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isAppShellRequest(request, url) {
  if (url.pathname.includes("/vendor/")) return false;
  if (request.mode === "navigate") return true;
  return /\.(?:html|js|css|json)$/.test(url.pathname) || url.pathname.endsWith("/");
}

async function putInCache(request, response) {
  if (!response || response.status !== 200 || response.type !== "basic") return;
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
}

async function matchAppShellCache(request) {
  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;
  if (request.mode === "navigate") {
    return caches.match("./index.html");
  }
  return undefined;
}

async function networkFirstWithTimeout(request, event) {
  const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timerId = controller ? setTimeout(() => controller.abort(), NETWORK_TIMEOUT_MS) : null;

  try {
    const fetchOpts = controller
      ? { cache: "no-cache", credentials: "same-origin", signal: controller.signal }
      : { cache: "no-cache", credentials: "same-origin" };
    const response = await fetch(request.url, fetchOpts);

    if (response && response.status === 200 && response.type === "basic") {
      event.waitUntil(putInCache(request.url, response.clone()));
      return response;
    }

    const cached = await matchAppShellCache(request);
    return cached || response;
  } catch (err) {
    const cached = await matchAppShellCache(request);
    if (cached) return cached;
    throw err;
  } finally {
    if (timerId !== null) clearTimeout(timerId);
  }
}

async function buildRangeResponse(cachedResponse, rangeHeader) {
  const buffer = await cachedResponse.arrayBuffer();
  const total = buffer.byteLength;
  const match = /bytes=(\d+)-(\d*)/.exec(rangeHeader || "");

  if (!match) {
    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": cachedResponse.headers.get("Content-Type") || "audio/wav",
        "Content-Length": String(total),
        "Accept-Ranges": "bytes"
      }
    });
  }

  const start = Math.min(Number(match[1]), Math.max(0, total - 1));
  const rawEnd = match[2] ? Math.min(Number(match[2]), total - 1) : total - 1;
  const end = Math.max(start, rawEnd);
  const sliced = buffer.slice(start, end + 1);

  return new Response(sliced, {
    status: 206,
    statusText: "Partial Content",
    headers: {
      "Content-Type": cachedResponse.headers.get("Content-Type") || "audio/wav",
      "Content-Range": `bytes ${start}-${end}/${total}`,
      "Content-Length": String(sliced.byteLength),
      "Accept-Ranges": "bytes"
    }
  });
}

async function cacheFirstMedia(request, event) {
  const rangeHeader = request.headers.get("range");
  const cached = await caches.match(request.url, { ignoreSearch: true });
  if (cached) {
    return rangeHeader ? buildRangeResponse(cached, rangeHeader) : cached;
  }

  const response = await fetch(request);
  if (response && response.status === 200 && response.type === "basic") {
    event.waitUntil(putInCache(request, response.clone()));
  } else if (rangeHeader && response && response.status === 206 && response.type === "basic") {
    // Warm full 200 copy in cache for offline Safari audio playback
    event.waitUntil(
      fetch(request.url)
        .then((fullResp) => putInCache(request.url, fullResp))
        .catch(() => {})
    );
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith("/sw.js")) return;

  if (isAppShellRequest(request, url)) {
    event.respondWith(networkFirstWithTimeout(request, event));
  } else {
    event.respondWith(cacheFirstMedia(request, event));
  }
});
