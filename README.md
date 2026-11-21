# Brzina vozila (PWA)

Mjerenje brzine vozila iz videa pomoću širine hrvatske (EU) registarske pločice (520 mm).
Radi u pregledniku (GitHub Pages), sve se obrađuje na uređaju.

**Trenutna verzija: 0.5 beta**
Verzija je ispisana na prvoj stranici aplikacije (ispod gumba). Uz svaku promjenu raste broj verzije i dopisuje se ovdje.

## Datoteke u repozitoriju
- `index.html` – cijela aplikacija
- `sw.js` – service worker (predmemorija; modeli se preuzimaju jednom)
- `manifest.webmanifest`, `icon.svg`
- `ort/` – ONNX Runtime (wasm)
- `models/` – `yolov8n.onnx` (detekcija vozila), `cct_xs_v1_global.onnx` + `plate_config.yaml` (čitanje registracije)

## Kako se koristi
1. Prva stranica: **Snimi video** ili **Odaberi video**.
2. Aplikacija sama traži vozila koja prilaze (preko cijelog zaslona, s podacima o kvaliteti videa).
3. Za svako vozilo ponudi fotografiju preko cijelog zaslona:
   - korak 1/2: zumiranje (pomak jednim prstom, dva prsta zumiraju) → **Potvrdi zoom**;
   - korak 2/2: okvir pločice – povuci unutar okvira za pomak, bijele točke mijenjaju veličinu, povlačenje izvan okvira crta novi → **OK – izmjeri**;
   - **Ponudi novu fotku** nudi bližu fotku istog vozila, **Preskoči vozilo** ide dalje.
4. Mjerenje (video se polako reproducira uz traku napretka), zatim ekran s rezultatima i popisom (CSV izvoz).

## Povijest promjena

### 0.5 beta
- Graf udaljenosti u vremenu crta se uživo kao sloj preko videa tijekom koraka 2/3 (praćenje pločice); na kraju se prikaže s pravcem i brzinom (oko 2 s), prije prelaska na rezultate.
- Graf je uklonjen s ekrana rezultata.

### 0.4.5 beta
- Uzrok zapinjanja na "0 sličica" na Androidu: preglednik je izgubio čitanje odabrane datoteke (greška videa 2, MEDIA_ERR_NETWORK). Video se sada pri odabiru kopira u memoriju aplikacije, pa ne ovisi o izvornoj datoteci.
- Ako je video u grešci, automatski se ponovno učitava prije mjerenja i tijekom čitanja sličica; greške videa upisuju se u log.

### 0.4.4 beta
- Tipka **📋 Log** (gore desno, vidljiva na svakom zaslonu): dnevnik rada s podacima o uređaju i stanju videa, tipka Kopiraj za slanje na analizu.
- Prije svakog sljedećeg mjerenja video se ponovno učitava iz odabrane datoteke (svjež dekoder) – pokušaj uklanjanja zapinjanja na "0 sličica".
- Dijagnostika čitanja sličica u logu (stanje videa svake 2 s).

### 0.4.3 beta
- Popravljeno zapinjanje kod drugog i sljedećih mjerenja ("0 sličica pročitano"): premotavanje na početak isječka ima vremensko ograničenje, a ako 3 s nakon pokretanja nema sličica, reprodukcija se automatski ponovno pokreće (uz rezervno čitanje preko rAF-a).

### 0.4.2 beta
- Zaslon ostaje upaljen tijekom pretrage i mjerenja (Wake Lock), da se mjerenje ne prekine kad se zaslon ugasi.
- Pri čitanju sličica prikazuje se broj sličica, postotak i proteklo vrijeme; poruka ako prve sličice ne stignu.

### 0.4.1 beta
- Učitavanje videa: prije novog učitavanja oslobađa se prethodni video (dekoder), automatski drugi pokušaj ako prvi ne uspije, a poruka o grešci sada navodi kod greške preglednika, tip i veličinu datoteke.
- Nakon neuspjelog učitavanja vraća se na prvu stranicu.

### 0.4 beta
- Uvedeno označavanje verzija (0.x beta) i ovaj README.
- Zaslon označavanja: samo tri tipke (Ponudi novu fotku, Preskoči vozilo, Potvrdi zoom / OK – izmjeri); maknute tipke +, −, ⤢, ◎ i strelice.
- Nema više međuekrana s opcijama između pretrage i odabira pločice.
- Mjerenje: video se prikazuje preko cijelog zaslona (na mobitelu je prije zapinjalo jer je video bio skriven), traka napretka u 3 koraka (čitanje sličica, praćenje pločice, čitanje registracije).
- Spremljeni isječak vozila proširen prema dolje (pločica je ponekad ispadala iz isječka pa mjerenje nije uspijevalo).
- `sw.js`: aplikacija se uvijek traži svježa s mreže.

### Prije 0.4 (čarobnjak)
- Prva stranica sa samo dva izbora; podaci o kvaliteti videa (UHD/HD, razlučivost, sl/s, trajanje, veličina).
- Označavanje preko cijelog zaslona u dva koraka (zoom, pa okvir) s pomicanjem okvira i ručkama za veličinu.
- Fotke za označavanje spremaju se tijekom pretrage (ne ovise o premotavanju videa); pretraga preko cijelog zaslona.
- Automatsko traženje vozila (YOLOv8n), predlaganje fotki, čitanje registracije (OCR), ručke za promjenu veličine okvira.

## Poznata ograničenja
- Testirano na sintetičkom videu u računalnom Chromeu; testiranje na stvarnim snimkama s mobitela je u tijeku.
- Detekcija vozila prepoznaje vozilo tek od oko 190 px širine (4K); moguće poboljšanje: dijeljenje slike na dva dijela.
- Točnost je najbolja uz 4K snimku i fiksni mobitel (stativ).
