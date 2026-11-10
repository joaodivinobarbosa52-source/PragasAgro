// PragaTrack — Service Worker (funciona 100% offline após a 1ª abertura com internet)
const VERSION = "v9";
const CACHE = "pragatrack-" + VERSION;
const TILES = "pragatrack-tiles";
const MAX_TILES = 1200;

// Arquivos do app (mesma origem)
const CORE = [
  "./",
  "./index.html",
  "./app.js",
  "./pests-db.js",
  "./pest-icons.js",
  "./pest-photos.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];

// Bibliotecas externas que o index.html carrega — sem elas o app não abre offline
const CDN = [
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js",
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js",
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"
];

// Opcionais: se algum não existir no servidor, a instalação NÃO falha
const OPTIONAL = [
  "./icon.svg"
];

// Guarda um arquivo sem derrubar a instalação se ele falhar
async function safeAdd(cache, url, noCors){
  try{
    const req = noCors ? new Request(url, {mode:"no-cors"}) : new Request(url, {cache:"reload"});
    const resp = await fetch(req);
    if(resp && (resp.ok || resp.type === "opaque")) await cache.put(url, resp);
    return true;
  }catch(e){ return false; }
}

self.addEventListener("install", e=>{
  e.waitUntil((async ()=>{
    const cache = await caches.open(CACHE);
    await Promise.all([
      ...CORE.map(u=>safeAdd(cache, u, false)),
      ...OPTIONAL.map(u=>safeAdd(cache, u, false)),
      ...CDN.map(u=>safeAdd(cache, u, true))
    ]);
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", e=>{
  e.waitUntil((async ()=>{
    const keys = await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE && k!==TILES).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

async function trimTiles(){
  const cache = await caches.open(TILES);
  const keys = await cache.keys();
  if(keys.length > MAX_TILES){
    await Promise.all(keys.slice(0, keys.length - MAX_TILES).map(k=>cache.delete(k)));
  }
}

self.addEventListener("fetch", e=>{
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);

  // 1) Tiles do mapa: usa o que já foi visto; se não tem e está online, baixa e guarda
  if(url.hostname.endsWith("tile.openstreetmap.org") || url.hostname === "server.arcgisonline.com"){
    e.respondWith((async ()=>{
      const cache = await caches.open(TILES);
      const hit = await cache.match(req);
      if(hit) return hit;
      try{
        const resp = await fetch(req);
        if(resp && (resp.ok || resp.type === "opaque")){
          cache.put(req, resp.clone());
          trimTiles();
        }
        return resp;
      }catch(err){
        return new Response("", {status:504, statusText:"offline"});
      }
    })());
    return;
  }

  // 2) Bibliotecas externas: cache primeiro
  if(CDN.includes(req.url)){
    e.respondWith(caches.match(req.url).then(hit => hit || fetch(req).then(resp=>{
      const copy = resp.clone();
      caches.open(CACHE).then(c=>c.put(req.url, copy));
      return resp;
    })));
    return;
  }

  // 3) Arquivos do próprio app: abre do cache e atualiza em segundo plano
  if(url.origin === self.location.origin){
    e.respondWith((async ()=>{
      const cache = await caches.open(CACHE);
      const hit = await cache.match(req, {ignoreSearch:true});
      const net = fetch(req).then(resp=>{
        if(resp && resp.status === 200) cache.put(req, resp.clone());
        return resp;
      }).catch(()=>null);
      if(hit){ e.waitUntil(net); return hit; }
      const resp = await net;
      if(resp) return resp;
      if(req.mode === "navigate"){
        const home = await cache.match("./index.html");
        if(home) return home;
      }
      return new Response("Offline", {status:503, statusText:"offline"});
    })());
  }
  // Demais pedidos (Firebase, IA, etc.) seguem direto para a rede.
});
