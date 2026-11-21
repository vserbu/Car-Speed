# Brzina vozila (PWA)

Mjerenje brzine vozila iz videa pomoću širine hrvatske (EU) registarske pločice (520 mm).
Radi u pregledniku (GitHub Pages), sve se obrađuje na uređaju.

**Trenutna verzija: 0.4 beta**
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
