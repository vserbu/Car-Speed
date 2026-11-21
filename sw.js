const C='brzina-v2',F=['./','index.html','manifest.webmanifest','icon.svg'];
const BIG=/\/(models|ort)\//;   // modeli i ONNX Runtime: velike datoteke, najprije iz predmemorije
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET'||new URL(r.url).origin!==location.origin) return;
  if(BIG.test(r.url)){
    e.respondWith(caches.open(C).then(c=>c.match(r).then(h=>h||fetch(r).then(n=>{ if(n.ok) c.put(r,n.clone()); return n }))));
  }else{
    e.respondWith(fetch(r).then(n=>{ if(n.ok){const cp=n.clone(); caches.open(C).then(c=>c.put(r,cp))} return n }).catch(()=>caches.match(r)));
  }
});
