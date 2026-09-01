// ===================== ESTADO & PERSISTÊNCIA =====================
const LOGO_B64 = "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";
const STORE_KEY = "pragascout_assessments_v1";
const SETTINGS_KEY = "pragascout_settings_v1";

function loadAssessments(){
  try{ return JSON.parse(localStorage.getItem(STORE_KEY)) || []; }catch(e){ return []; }
}
function saveAssessments(list){
  localStorage.setItem(STORE_KEY, JSON.stringify(list));
}
function loadSettings(){
  try{ return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || { aiEndpoint:"", thresholds:{} }; }
  catch(e){ return { aiEndpoint:"", thresholds:{} }; }
}
function saveSettingsToStore(s){ localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); }

const PEST_PHOTOS_KEY = "pragascout_pest_photos_v1";
function loadPestPhotos(){
  try{ return JSON.parse(localStorage.getItem(PEST_PHOTOS_KEY)) || {}; }catch(e){ return {}; }
}
function savePestPhotosToStore(p){ localStorage.setItem(PEST_PHOTOS_KEY, JSON.stringify(p)); }
function pestPhotoKey(cultura, pestId){ return cultura+":"+pestId; }
function getCustomPestPhoto(cultura, pestId){ return pestPhotos[pestPhotoKey(cultura,pestId)] || null; }

// Retorna o conteúdo visual (foto própria salva OU foto de referência do manual OU ilustração) de uma praga
function pestVisualInnerHTML(cultura, pestId){
  const custom = getCustomPestPhoto(cultura, pestId);
  if(custom) return `<img src="${custom}" style="width:100%;height:100%;object-fit:cover;display:block;">`;
  const refs = (typeof getReferencePhotos === "function") ? getReferencePhotos(pestId) : [];
  if(refs.length) return `<img src="${refs[0]}" style="width:100%;height:100%;object-fit:cover;display:block;" loading="lazy">`;
  return getDefaultPestIcon(pestId);
}
// Retorna um bloco já dimensionado (para usar em listas)
function getPestVisualHTML(cultura, pestId, sizePx){
  const s = sizePx || 44;
  return `<div class="pest-thumb" style="width:${s}px;height:${s}px;">${pestVisualInnerHTML(cultura,pestId)}</div>`;
}

let settings = loadSettings();
let assessments = loadAssessments();
let pestPhotos = loadPestPhotos();
let pestDetailTarget = null; // { cultura, pestId } — praga aberta no modal de detalhe

// working state for an assessment being built
let draft = null; // { id, cultura, fazenda, talhao, estadio, responsavel, data, pontos: [] }
let currentAssessmentId = null;
let homeCrop = "soja";
let guiaCrop = "soja";
let coletaMap = null, coletaMarkers = [];
let kmlLayerGroup = null, kmlLayerGroupRes = null;
let resMap = null;
let coletaUserMarker = null, resUserMarker = null;
let coletaWatchId = null;
let lastLiveLat = null, lastLiveLng = null, lastLiveAcc = null;

// ===================== LOCALIZAÇÃO ATUAL (GPS ao vivo no mapa) =====================
function ensureUserMarkerStyle(){
  if(document.getElementById("user-marker-style")) return;
  const style = document.createElement("style");
  style.id = "user-marker-style";
  style.textContent = `
    .user-loc-dot{width:14px;height:14px;border-radius:50%;background:#4a90d9;border:2.5px solid #fff;box-shadow:0 0 0 3px rgba(74,144,217,.4);position:relative;}
    .user-loc-dot::after{content:'';position:absolute;inset:-9px;border-radius:50%;border:2px solid rgba(74,144,217,.55);animation:userLocPulse 1.8s ease-out infinite;}
    @keyframes userLocPulse{0%{transform:scale(.35);opacity:1;}100%{transform:scale(2);opacity:0;}}
    .map-legend{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin:-4px 0 12px;font-size:11px;color:var(--ink-dim);}
    .map-legend span{display:inline-flex;align-items:center;gap:4px;}
    .map-legend i{width:9px;height:9px;border-radius:50%;display:inline-block;}
  `;
  document.head.appendChild(style);
}

function placeUserMarker(map, lat, lng, which, accuracy){
  if(!map) return;
  ensureUserMarkerStyle();
  if(which==="coleta"){ lastLiveLat = lat; lastLiveLng = lng; lastLiveAcc = accuracy!=null ? accuracy : lastLiveAcc; }
  const icon = L.divIcon({className:"", html:'<div class="user-loc-dot"></div>', iconSize:[14,14], iconAnchor:[7,7]});
  if(which==="coleta"){
    if(coletaUserMarker){ map.removeLayer(coletaUserMarker); }
    coletaUserMarker = L.marker([lat,lng], {icon, zIndexOffset:1000}).addTo(map).bindTooltip("Você está aqui");
  } else {
    if(resUserMarker){ map.removeLayer(resUserMarker); }
    resUserMarker = L.marker([lat,lng], {icon, zIndexOffset:1000}).addTo(map).bindTooltip("Você está aqui");
  }
}

function stopColetaWatch(){
  if(coletaWatchId!=null && navigator.geolocation){
    navigator.geolocation.clearWatch(coletaWatchId);
    coletaWatchId = null;
  }
}

// Botão "localização atual" — recentraliza o mapa (coleta ou resultado) na posição do usuário
function locateMe(which){
  const map = which==="coleta" ? coletaMap : resMap;
  if(!map){ return; }
  if(!navigator.geolocation){ toast("Geolocalização não suportada"); return; }
  toast("Buscando localização...");
  navigator.geolocation.getCurrentPosition(pos=>{
    const { latitude, longitude } = pos.coords;
    map.setView([latitude, longitude], 17);
    placeUserMarker(map, latitude, longitude, which);
  }, err=>{
    toast("Não foi possível obter localização");
  }, {enableHighAccuracy:true, timeout:10000});
}

function toast(msg){
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"), 2200);
}

function effectiveThreshold(cultura, pestId){
  const key = cultura+":"+pestId;
  if(settings.thresholds && settings.thresholds[key] != null && settings.thresholds[key] !== "") return Number(settings.thresholds[key]);
  const p = getPestById(cultura, pestId);
  return p ? p.nc : null;
}

// ===================== ESTÁGIOS BIOLÓGICOS (ovo/lagarta peq./lagarta gr./pupa/adulto) =====================
// Algumas pragas (ver estagios em pests-db.js) permitem registrar a composição completa
// do pano-de-batida, não só um número total. O NC continua calculado apenas com o(s)
// estágio(s) marcado(s) contaNC:true — igual à metodologia técnica padrão — os demais
// servem de alerta antecipado (postura/adultos) ou contexto (pupa).
function pestHasStages(pest){ return !!pest && Array.isArray(pest.estagios) && pest.estagios.length>0; }

function stageBreakdownText(pest, estagiosObj, onlyPositive){
  if(!pestHasStages(pest) || !estagiosObj) return null;
  const parts = pest.estagios
    .filter(e => !onlyPositive || (Number(estagiosObj[e.id])||0) > 0)
    .map(e => (Number(estagiosObj[e.id])||0)+" "+e.unidadeCurta);
  return parts.length ? parts.join(" · ") : null;
}

function statusForCount(cultura, pestId, count){
  const nc = effectiveThreshold(cultura, pestId);
  if(nc == null || count == null || isNaN(count)) return "ok";
  const ratio = count / nc;
  if(ratio >= 1) return "controle";
  if(ratio >= 0.7) return "atencao";
  return "ok";
}
function statusLabel(s){
  return s==="controle" ? "CONTROLAR" : s==="atencao" ? "ATENÇÃO" : "ABAIXO DO NC";
}
function statusColor(s){
  return s==="controle" ? "#c9553c" : s==="atencao" ? "#d9b33e" : "#5a9e5a";
}
function numberedMarkerIcon(number, color){
  return L.divIcon({
    className: "",
    html: `<div style="width:22px;height:22px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;color:#fff;font-family:Arial,Helvetica,sans-serif;font-weight:700;font-size:11px;line-height:1;">${number}</div>`,
    iconSize: [22,22],
    iconAnchor: [11,11]
  });
}

// ===================== NAV =====================
function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
function showTab(tab){
  document.querySelectorAll(".navbtn").forEach(b=>b.classList.toggle("active", b.dataset.tab===tab));
  if(tab==="home"){ showScreen("screen-home"); renderHome(); }
  if(tab==="historico"){ showScreen("screen-historico"); renderHistorico(); }
  if(tab==="guia"){ showScreen("screen-guia"); renderGuia(); }
}
function goHome(){ showTab("home"); }

function openSettings(){
  renderSettingsThresholds();
  document.getElementById("settings-ai-endpoint").value = settings.aiEndpoint || "";
  document.getElementById("modal-settings").classList.remove("hidden");
}
function closeModal(id){ document.getElementById(id).classList.add("hidden"); }

function renderSettingsThresholds(){
  const wrap = document.getElementById("settings-thresholds");
  wrap.innerHTML = "";
  ["soja","milho"].forEach(cultura=>{
    const h = document.createElement("div");
    h.innerHTML = `<div style="margin-top:10px;font-family:var(--font-display);font-weight:700;color:${cultura==='soja'?'var(--soja)':'var(--milho)'};text-transform:uppercase;font-size:12px;">${cultura}</div>`;
    wrap.appendChild(h);
    PESTS_DB[cultura].forEach(p=>{
      const key = cultura+":"+p.id;
      const row = document.createElement("div");
      row.style.display="flex"; row.style.alignItems="center"; row.style.gap="8px"; row.style.margin="6px 0";
      row.innerHTML = `<div style="flex:1;font-size:12.5px;">${p.apelido}</div>
        <input type="number" step="0.1" style="width:80px;padding:7px;" data-key="${key}" value="${settings.thresholds[key] ?? p.nc}">`;
      wrap.appendChild(row);
    });
  });
}
function saveSettings(){
  settings.aiEndpoint = document.getElementById("settings-ai-endpoint").value.trim();
  document.querySelectorAll("#settings-thresholds input").forEach(inp=>{
    settings.thresholds[inp.dataset.key] = inp.value;
  });
  saveSettingsToStore(settings);
  toast("Ajustes salvos");
  closeModal("modal-settings");
}

// ===================== HOME =====================
function setHomeCrop(c){
  homeCrop = c;
  document.getElementById("btn-crop-soja").classList.toggle("active", c==="soja");
  document.getElementById("btn-crop-milho").classList.toggle("active", c==="milho");
  renderHome();
}
function renderHome(){
  const soja = assessments.filter(a=>a.cultura==="soja").length;
  const milho = assessments.filter(a=>a.cultura==="milho").length;
  document.getElementById("cnt-soja").textContent = soja+" avaliaç"+(soja===1?"ão":"ões");
  document.getElementById("cnt-milho").textContent = milho+" avaliaç"+(milho===1?"ão":"ões");

  const list = assessments.filter(a=>a.cultura===homeCrop).slice(-4).reverse();
  const wrap = document.getElementById("home-history-list");
  wrap.innerHTML = "";
  if(list.length===0){
    wrap.innerHTML = `<div class="empty"><div class="big">🔎</div>Nenhuma avaliação de ${homeCrop} ainda.</div>`;
    return;
  }
  list.forEach(a=> wrap.appendChild(historyCard(a)));
}

function startNewAssessment(){
  draft = { cultura: homeCrop, fazenda:"", talhao:"", estadio:"", responsavel:"", pontos:[], kml:null };
  setSetupCrop(homeCrop);
  document.getElementById("input-fazenda").value = "";
  document.getElementById("input-talhao").value = "";
  document.getElementById("input-responsavel").value = "";
  showScreen("screen-setup");
}
function setSetupCrop(c){
  draft.cultura = c;
  document.getElementById("setup-crop-soja").classList.toggle("active", c==="soja");
  document.getElementById("setup-crop-milho").classList.toggle("active", c==="milho");
  const sel = document.getElementById("input-estadio");
  sel.innerHTML = ESTADIOS[c].map(e=>`<option>${e}</option>`).join("");
}
function confirmSetup(){
  draft.fazenda = document.getElementById("input-fazenda").value.trim() || "Fazenda não informada";
  draft.talhao = document.getElementById("input-talhao").value.trim() || "Talhão não informado";
  draft.estadio = document.getElementById("input-estadio").value;
  draft.responsavel = document.getElementById("input-responsavel").value.trim();
  draft.data = new Date().toISOString();
  draft.id = "a_"+Date.now();
  showScreen("screen-coleta");
  initColetaScreen();
}
function cancelAssessment(){
  if(confirm("Descartar esta avaliação e os pontos já coletados?")){
    stopColetaWatch();
    draft = null;
    goHome();
  }
}

// ===================== IMPORTAR KML/KMZ =====================
function parseCoordenadasKml(text){
  return text.trim().split(/\s+/).map(pair=>{
    const parts = pair.split(",");
    const lng = parseFloat(parts[0]);
    const lat = parseFloat(parts[1]);
    return [lat, lng];
  }).filter(p=>!isNaN(p[0]) && !isNaN(p[1]));
}

function parseKmlDom(xmlDoc){
  const result = { polygons:[], lines:[], points:[] };
  const placemarks = xmlDoc.getElementsByTagName("Placemark");
  for(let i=0;i<placemarks.length;i++){
    const pm = placemarks[i];
    const nameEl = pm.getElementsByTagName("name")[0];
    const name = nameEl ? nameEl.textContent.trim() : "";

    const points = pm.getElementsByTagName("Point");
    for(let j=0;j<points.length;j++){
      const coordEl = points[j].getElementsByTagName("coordinates")[0];
      if(coordEl){
        const c = parseCoordenadasKml(coordEl.textContent);
        if(c[0]) result.points.push({ lat:c[0][0], lng:c[0][1], name });
      }
    }
    const polygons = pm.getElementsByTagName("Polygon");
    for(let j=0;j<polygons.length;j++){
      const outer = polygons[j].getElementsByTagName("outerBoundaryIs")[0];
      const ring = outer ? outer.getElementsByTagName("coordinates")[0] : polygons[j].getElementsByTagName("coordinates")[0];
      if(ring){
        const c = parseCoordenadasKml(ring.textContent);
        if(c.length>2) result.polygons.push({ name, coords:c });
      }
    }
    const lines = pm.getElementsByTagName("LineString");
    for(let j=0;j<lines.length;j++){
      const coordEl = lines[j].getElementsByTagName("coordinates")[0];
      if(coordEl){
        const c = parseCoordenadasKml(coordEl.textContent);
        if(c.length>1) result.lines.push({ name, coords:c });
      }
    }
  }
  return result;
}

function kmlBoundsList(kml){
  const pts = [];
  (kml.polygons||[]).forEach(p=>p.coords.forEach(c=>pts.push(c)));
  (kml.lines||[]).forEach(l=>l.coords.forEach(c=>pts.push(c)));
  (kml.points||[]).forEach(p=>pts.push([p.lat,p.lng]));
  return pts;
}

function renderKmlLayer(map, layerGroup, kml){
  if(!layerGroup) return;
  layerGroup.clearLayers();
  if(!kml) return;
  (kml.polygons||[]).forEach(poly=>{
    L.polygon(poly.coords, {color:"#7fa050", weight:2, fillOpacity:0.08, dashArray:"5 5"}).addTo(layerGroup)
      .bindTooltip(poly.name || "Área importada");
  });
  (kml.lines||[]).forEach(line=>{
    L.polyline(line.coords, {color:"#d98e3e", weight:2, dashArray:"3 6"}).addTo(layerGroup)
      .bindTooltip(line.name || "Linha importada");
  });
  (kml.points||[]).forEach((p,idx)=>{
    L.circleMarker([p.lat,p.lng], {radius:6, color:"#9aa68c", fillColor:"#12140f", fillOpacity:0.9, weight:2}).addTo(layerGroup)
      .bindTooltip(p.name || ("Ref. "+(idx+1)));
  });
}

function renderKmlStatus(){
  const el = document.getElementById("kml-status");
  if(!el) return;
  if(!draft.kml){ el.innerHTML = ""; return; }
  const k = draft.kml;
  el.innerHTML = `<div class="muted" style="display:flex;justify-content:space-between;align-items:center;margin:6px 0;">
    <span>🗺️ Importado: ${k.polygons.length} área(s) · ${k.lines.length} linha(s) · ${k.points.length} ponto(s) de referência</span>
    <button class="btn-sm btn-outline" style="width:auto;padding:5px 9px;" onclick="removeKml()">remover</button>
  </div>`;
}

function removeKml(){
  draft.kml = null;
  renderKmlStatus();
  renderKmlLayer(coletaMap, kmlLayerGroup, null);
}

async function onKmlFileSelected(ev){
  const file = ev.target.files[0];
  if(!file) return;
  try{
    let kmlText;
    if(/\.kmz$/i.test(file.name)){
      const buf = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(buf);
      const entry = Object.values(zip.files).find(f=>/\.kml$/i.test(f.name));
      if(!entry) throw new Error("Nenhum .kml dentro do arquivo .kmz");
      kmlText = await entry.async("text");
    } else {
      kmlText = await file.text();
    }
    const xmlDoc = new DOMParser().parseFromString(kmlText, "text/xml");
    if(xmlDoc.getElementsByTagName("parsererror").length) throw new Error("Arquivo KML inválido");
    const parsed = parseKmlDom(xmlDoc);
    if(parsed.polygons.length===0 && parsed.lines.length===0 && parsed.points.length===0){
      toast("Nenhuma geometria encontrada no arquivo");
    } else {
      draft.kml = parsed;
      renderKmlStatus();
      renderKmlLayer(coletaMap, kmlLayerGroup, draft.kml);
      const bounds = kmlBoundsList(parsed);
      if(bounds.length && coletaMap) coletaMap.fitBounds(bounds, {padding:[30,30]});
      toast("Importado: "+parsed.polygons.length+" área(s), "+parsed.points.length+" ponto(s)");
    }
  }catch(e){
    toast("Erro ao importar: "+(e.message||"formato inválido"));
  }
  ev.target.value = "";
}

// ===================== COLETA =====================
function initColetaScreen(){
  document.getElementById("coleta-title").textContent = draft.talhao;
  document.getElementById("coleta-sub").textContent = draft.fazenda+" · "+draft.estadio;
  const badge = document.getElementById("coleta-badge");
  badge.textContent = draft.cultura.toUpperCase();
  badge.className = "badge-crop "+draft.cultura;

  setTimeout(()=>{
    if(coletaMap){ coletaMap.remove(); coletaMap = null; }
    coletaMap = L.map('coleta-map', {zoomControl:false, attributionControl:false}).setView([-4.9, -44.9], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {crossOrigin:true}).addTo(coletaMap);
    L.control.zoom({position:'bottomright'}).addTo(coletaMap);
    kmlLayerGroup = L.layerGroup().addTo(coletaMap);
    renderKmlLayer(coletaMap, kmlLayerGroup, draft.kml);
    if(draft.kml){
      const bounds = kmlBoundsList(draft.kml);
      if(bounds.length) coletaMap.fitBounds(bounds, {padding:[30,30]});
    }
    stopColetaWatch();
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos=>{
        if(!draft.kml) coletaMap.setView([pos.coords.latitude, pos.coords.longitude], 16);
        placeUserMarker(coletaMap, pos.coords.latitude, pos.coords.longitude, "coleta", pos.coords.accuracy);
      }, ()=>{}, {enableHighAccuracy:true, timeout:8000});
      // segue atualizando o ponto azul ("você está aqui") enquanto o técnico anda pelo talhão
      coletaWatchId = navigator.geolocation.watchPosition(pos=>{
        placeUserMarker(coletaMap, pos.coords.latitude, pos.coords.longitude, "coleta", pos.coords.accuracy);
      }, ()=>{}, {enableHighAccuracy:true, maximumAge:5000});
    }
    renderColeta();
  }, 60);
  renderKmlStatus();
}

function renderColeta(){
  document.getElementById("stat-npontos").textContent = draft.pontos.length;
  const pragasSet = new Set(draft.pontos.filter(p=>p.pestId).map(p=>p.pestId));
  document.getElementById("stat-pragas").textContent = pragasSet.size;
  document.getElementById("btn-finalizar").disabled = draft.pontos.length===0;

  const list = document.getElementById("pontos-list");
  list.innerHTML = "";
  coletaMarkers.forEach(m=>coletaMap && coletaMap.removeLayer(m));
  coletaMarkers = [];

  draft.pontos.forEach((p,idx)=>{
    const pest = p.pestId ? getPestById(draft.cultura, p.pestId) : null;
    const status = p.pestId ? statusForCount(draft.cultura, p.pestId, p.count) : "ok";
    const composicao = pest ? stageBreakdownText(pest, p.estagios, true) : null;
    const contagemTexto = composicao || (pest ? p.count+" "+pest.unidade.split(" ")[0] : "");
    const card = document.createElement("div");
    card.className = "point-card";
    card.innerHTML = `
      ${p.photo ? `<img class="point-thumb" src="${p.photo}">` : `<div class="point-thumb" style="display:flex;align-items:center;justify-content:center;color:var(--ink-dim);font-size:18px;">📍</div>`}
      <div class="point-meta">
        <div class="pname">Ponto ${idx+1}${pest ? " — "+pest.apelido : " — sem infestação"}</div>
        <div class="psub">${p.lat ? p.lat.toFixed(5)+", "+p.lng.toFixed(5) : "sem GPS"}${pest ? " · "+contagemTexto : ""}</div>
      </div>
      ${pest ? `<span class="status-chip status-${status}">${statusLabel(status)}</span>` : ""}
      <button class="icon-btn" style="width:30px;height:30px;font-size:13px;" onclick="removePoint(${idx})">✕</button>
    `;
    list.appendChild(card);

    if(p.lat && coletaMap){
      const marker = L.circleMarker([p.lat,p.lng], {radius:9, color:statusColor(status), fillColor:statusColor(status), fillOpacity:0.85, weight:2}).addTo(coletaMap);
      marker.bindTooltip("Ponto "+(idx+1), {permanent:false});
      coletaMarkers.push(marker);
    }
  });
}

function removePoint(idx){
  draft.pontos.splice(idx,1);
  renderColeta();
}

// ---- modal: add point ----
let pointDraft = null;
function openAddPoint(){
  pointDraft = { lat:null, lng:null, photo:null, pestId:null, count:null, estagios:null };
  document.getElementById("modal-point-title").textContent = "Novo ponto — #"+(draft.pontos.length+1);
  const statusEl = document.getElementById("gps-status");
  if(lastLiveLat!=null){
    pointDraft.lat = lastLiveLat;
    pointDraft.lng = lastLiveLng;
    statusEl.textContent = "📍 "+lastLiveLat.toFixed(5)+", "+lastLiveLng.toFixed(5)+(lastLiveAcc!=null ? " (±"+Math.round(lastLiveAcc)+"m)":"")+" — toque para atualizar";
    statusEl.className = "muted";
  } else {
    statusEl.textContent = "Toque para capturar GPS";
    statusEl.className = "dashline";
  }
  document.getElementById("photo-preview").style.display = "none";
  document.getElementById("photo-input").value = "";
  document.getElementById("ai-suggest-box").innerHTML = "";
  document.getElementById("point-pest-selected").style.display = "none";
  document.getElementById("point-pest-search").value = "";
  renderPointPestList();
  document.getElementById("modal-point").classList.remove("hidden");
}

function captureGPS(){
  const statusEl = document.getElementById("gps-status");
  if(!navigator.geolocation){ statusEl.textContent = "Geolocalização não suportada"; return; }
  statusEl.textContent = "Capturando...";
  navigator.geolocation.getCurrentPosition(pos=>{
    pointDraft.lat = pos.coords.latitude;
    pointDraft.lng = pos.coords.longitude;
    statusEl.textContent = "📍 "+pointDraft.lat.toFixed(5)+", "+pointDraft.lng.toFixed(5)+" (±"+Math.round(pos.coords.accuracy)+"m)";
    statusEl.className = "muted";
  }, err=>{
    statusEl.textContent = "Não foi possível obter GPS — verifique permissão de localização";
  }, {enableHighAccuracy:true, timeout:10000});
}

function onPhotoSelected(ev){
  const file = ev.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(e){
    const img = new Image();
    img.onload = function(){
      // compress to keep localStorage light
      const canvas = document.createElement("canvas");
      const maxW = 640;
      const scale = Math.min(1, maxW/img.width);
      canvas.width = img.width*scale; canvas.height = img.height*scale;
      canvas.getContext("2d").drawImage(img,0,0,canvas.width,canvas.height);
      pointDraft.photo = canvas.toDataURL("image/jpeg", 0.7);
      const prev = document.getElementById("photo-preview");
      prev.src = pointDraft.photo;
      prev.style.display = "block";
      tryAISuggestion();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

async function tryAISuggestion(){
  const box = document.getElementById("ai-suggest-box");
  if(!settings.aiEndpoint){
    box.innerHTML = `<div class="ai-suggest"><div>💡<div class="tag">IA não configurada</div>Identificação manual abaixo — configure um endpoint em Ajustes ⚙ para sugestão automática por foto.</div></div>`;
    return;
  }
  box.innerHTML = `<div class="ai-suggest"><div class="tag">IA analisando foto...</div></div>`;
  try{
    const resp = await fetch(settings.aiEndpoint, {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ image: pointDraft.photo, cultura: draft.cultura, pests: PESTS_DB[draft.cultura].map(p=>({id:p.id, nome:p.nome})) })
    });
    const data = await resp.json();
    const pest = getPestById(draft.cultura, data.pestId);
    if(pest){
      box.innerHTML = `<div class="ai-suggest"><div>🤖<div class="tag">Sugestão da IA (confirme)</div><b>${pest.nome}</b>${data.confianca? " · "+Math.round(data.confianca*100)+"% confiança":""}
        <div style="margin-top:6px;"><button class="btn-sm btn-milho" style="width:auto;padding:6px 12px;" onclick="selectPest('${pest.id}')">Usar esta sugestão</button></div></div></div>`;
    } else {
      box.innerHTML = `<div class="ai-suggest"><div>🤖<div class="tag">IA sem sugestão clara</div>Identifique manualmente na lista abaixo.</div></div>`;
    }
  }catch(e){
    box.innerHTML = `<div class="ai-suggest"><div>⚠️<div class="tag">Erro ao consultar IA</div>Identifique manualmente na lista abaixo.</div></div>`;
  }
}

function renderPointPestList(){
  const q = (document.getElementById("point-pest-search").value||"").toLowerCase();
  const wrap = document.getElementById("point-pest-list");
  wrap.innerHTML = "";
  PESTS_DB[draft.cultura]
    .filter(p=> p.nome.toLowerCase().includes(q) || p.apelido.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q))
    .forEach(p=>{
      const row = document.createElement("div");
      row.className = "pest-item";
      row.style.padding = "10px 10px";
      row.style.cursor = "pointer";
      row.innerHTML = `<div style="display:flex;align-items:center;gap:10px;min-width:0;">${getPestVisualHTML(draft.cultura,p.id,40)}<div style="min-width:0;"><div class="pn">${p.apelido}</div><div class="pl">${p.categoria} · NC ref: ${effectiveThreshold(draft.cultura,p.id)} ${p.unidade}</div></div></div><span style="color:var(--ink-dim);">›</span>`;
      row.onclick = ()=>selectPest(p.id);
      wrap.appendChild(row);
    });
  if(wrap.innerHTML==="") wrap.innerHTML = `<div class="muted" style="padding:10px;">Nenhuma praga encontrada na busca.</div>`;
}

function selectPest(pestId){
  pointDraft.pestId = pestId;
  pointDraft.count = null;
  pointDraft.estagios = null;
  const p = getPestById(draft.cultura, pestId);
  document.getElementById("point-pest-selected").style.display = "block";
  document.getElementById("sel-pest-thumb").innerHTML = pestVisualInnerHTML(draft.cultura, pestId);
  document.getElementById("sel-pest-name").textContent = p.nome;
  document.getElementById("sel-pest-unit").textContent = "Unidade: "+p.unidade+" · NC referência: "+effectiveThreshold(draft.cultura,pestId);
  renderPointCountFields(p);
  document.getElementById("point-status-preview").innerHTML = "";
}
function clearSelectedPest(){
  pointDraft.pestId = null;
  pointDraft.estagios = null;
  document.getElementById("point-pest-selected").style.display = "none";
}
function setNoPest(){
  pointDraft.pestId = null;
  pointDraft.count = null;
  pointDraft.estagios = null;
  document.getElementById("point-pest-selected").style.display = "none";
  toast("Marcado como ponto sem infestação relevante");
}

// Monta os campos de contagem: um único número (comportamento antigo) ou,
// para pragas com "estagios" definidos, um input por estágio biológico.
function renderPointCountFields(pest){
  const wrap = document.getElementById("point-count-fields");
  wrap.innerHTML = "";
  if(pestHasStages(pest)){
    pointDraft.estagios = {};
    pest.estagios.forEach(e=>{
      pointDraft.estagios[e.id] = 0;
      const row = document.createElement("div");
      row.innerHTML = `<label>${e.label}${e.contaNC ? " <span style=\"color:var(--soja);\">· conta p/ NC</span>" : ""}</label>
        <input type="number" min="0" step="1" placeholder="0" data-stage="${e.id}" oninput="onStageInput(this)">`;
      wrap.appendChild(row);
    });
  } else {
    wrap.innerHTML = `<label>Contagem observada</label>
      <input type="number" min="0" step="0.1" id="point-count" placeholder="0" oninput="updatePointStatusPreview()">`;
  }
}

function onStageInput(inputEl){
  const v = parseFloat(inputEl.value);
  pointDraft.estagios[inputEl.dataset.stage] = isNaN(v) ? 0 : v;
  updatePointStatusPreview();
}

function updatePointStatusPreview(){
  if(!pointDraft.pestId){ document.getElementById("point-status-preview").innerHTML=""; return; }
  const p = getPestById(draft.cultura, pointDraft.pestId);
  let count;
  if(pestHasStages(p)){
    count = p.estagios.filter(e=>e.contaNC).reduce((sum,e)=> sum+(Number(pointDraft.estagios[e.id])||0), 0);
  } else {
    const raw = parseFloat(document.getElementById("point-count").value);
    count = isNaN(raw) ? null : raw;
  }
  pointDraft.count = count;
  if(count==null){ document.getElementById("point-status-preview").innerHTML=""; return; }
  const s = statusForCount(draft.cultura, pointDraft.pestId, count);
  const outros = pestHasStages(p) ? stageBreakdownText(p, pointDraft.estagios, false) : null;
  const extra = outros ? `<div class="muted" style="margin-top:5px;">Composição registrada: ${outros}</div>` : "";
  document.getElementById("point-status-preview").innerHTML = `<span class="status-chip status-${s}">${statusLabel(s)}</span>${extra}`;
}

function savePoint(){
  if(!pointDraft.lat){
    if(!confirm("Nenhuma localização GPS capturada. Salvar ponto mesmo assim?")) return;
  }
  draft.pontos.push({...pointDraft, timestamp: new Date().toISOString()});
  closeModal("modal-point");
  renderColeta();
  toast("Ponto "+draft.pontos.length+" salvo");
}

// ===================== FINALIZAR / RESULTADO =====================
function finalizeAssessment(){
  stopColetaWatch();
  draft.finalizadoEm = new Date().toISOString();
  assessments.push(draft);
  saveAssessments(assessments);
  currentAssessmentId = draft.id;
  const finished = draft;
  draft = null;
  showResultado(finished);
}

function computeSummary(a){
  const byPest = {};
  a.pontos.forEach(p=>{
    if(!p.pestId) return;
    const pest = getPestById(a.cultura, p.pestId);
    if(!byPest[p.pestId]) byPest[p.pestId] = { counts:[], statuses:[], stageSums:{}, stageCount:0 };
    byPest[p.pestId].counts.push(p.count||0);
    byPest[p.pestId].statuses.push(statusForCount(a.cultura, p.pestId, p.count));
    if(pestHasStages(pest) && p.estagios){
      pest.estagios.forEach(e=>{
        byPest[p.pestId].stageSums[e.id] = (byPest[p.pestId].stageSums[e.id]||0) + (Number(p.estagios[e.id])||0);
      });
      byPest[p.pestId].stageCount++;
    }
  });
  const summary = Object.keys(byPest).map(pestId=>{
    const pest = getPestById(a.cultura, pestId);
    const counts = byPest[pestId].counts;
    const media = counts.reduce((x,y)=>x+y,0)/counts.length;
    const worst = byPest[pestId].statuses.includes("controle") ? "controle" : byPest[pestId].statuses.includes("atencao") ? "atencao" : "ok";
    let stageMedias = null;
    if(pestHasStages(pest) && byPest[pestId].stageCount>0){
      stageMedias = pest.estagios.map(e=>({
        label: e.label,
        unidadeCurta: e.unidadeCurta,
        contaNC: e.contaNC,
        media: (byPest[pestId].stageSums[e.id]||0)/byPest[pestId].stageCount
      }));
    }
    return { pest, media, nPontos: counts.length, status: worst, stageMedias };
  }).sort((x,y)=> (y.status==="controle") - (x.status==="controle"));
  const overallControle = summary.some(s=>s.status==="controle");
  return { summary, overallControle };
}

// Texto "Composição média: X posturas · Y lag. peq. · Z lag. gr. (conta p/ NC) · ..."
// a partir do stageMedias retornado por computeSummary.
function formatStageMediasText(stageMedias){
  if(!stageMedias) return null;
  const parts = stageMedias.filter(sm=>sm.media>0).map(sm=> sm.media.toFixed(1)+" "+sm.unidadeCurta);
  return parts.length ? parts.join(" · ") : null;
}
// Alerta de pressão futura: postura/adulto presentes mesmo que o status geral não seja "controle".
function stageEarlyWarning(stageMedias){
  if(!stageMedias) return null;
  const alerta = stageMedias.find(sm=> !sm.contaNC && /postura|adulto/i.test(sm.label) && sm.media>0);
  return alerta ? true : null;
}

function showResultado(a){
  currentAssessmentId = a.id;
  const { summary, overallControle } = computeSummary(a);
  document.getElementById("res-sub").textContent = `${a.talhao} · ${a.fazenda} · ${a.cultura.toUpperCase()} · ${new Date(a.data).toLocaleDateString('pt-BR')} · ${a.pontos.length} pontos`;

  const recWrap = document.getElementById("res-recs");
  recWrap.innerHTML = "";
  if(summary.length===0){
    recWrap.innerHTML = `<div class="recbox ok"><div class="rt">✅ Nenhuma praga registrada</div>Nenhum ponto teve praga identificada nesta amostragem.</div>`;
  } else {
    if(overallControle){
      recWrap.innerHTML += `<div class="recbox controle"><div class="rt">🚨 Controle recomendado</div>Ao menos uma praga atingiu o nível de controle de referência.</div>`;
    } else {
      recWrap.innerHTML += `<div class="recbox ok"><div class="rt">✅ Abaixo do nível de controle</div>Nenhuma praga atingiu o nível de referência — manter monitoramento.</div>`;
    }
    summary.forEach(s=>{
      const composicaoTexto = formatStageMediasText(s.stageMedias);
      const alerta = stageEarlyWarning(s.stageMedias);
      const box = document.createElement("div");
      box.className = "card";
      box.style.cursor = "pointer";
      box.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div style="flex:1;">
          <div style="font-weight:700;font-size:14.5px;">${s.pest.apelido}</div>
          <div class="muted">Média: ${s.media.toFixed(1)} ${s.pest.unidade} · NC ref: ${effectiveThreshold(a.cultura,s.pest.id)} · ${s.nPontos} ponto(s)</div>
          ${composicaoTexto ? `<div class="muted" style="margin-top:3px;">Composição média por ponto: ${composicaoTexto}</div>` : ""}
        </div>
        <span class="status-chip status-${s.status}">${statusLabel(s.status)}</span>
      </div>
      ${alerta ? `<div class="muted" style="margin-top:6px;color:var(--atencao);">⚠️ Postura/adultos presentes — mesmo sem atingir o NC hoje, é sinal de pressão para os próximos dias. Reavaliar em breve.</div>` : ""}
      <div class="muted" style="margin-top:8px;">${s.pest.recomendacao}</div>`;
      box.onclick = ()=>showPestDetail(s.pest, a.cultura);
      recWrap.appendChild(box);
    });
  }

  setTimeout(()=>{
    if(resMap){ resMap.remove(); resMap=null; }
    resMap = L.map('res-map', {zoomControl:false, attributionControl:false});
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {crossOrigin:true}).addTo(resMap);
    L.control.zoom({position:'bottomright'}).addTo(resMap);
    kmlLayerGroupRes = L.layerGroup().addTo(resMap);
    renderKmlLayer(resMap, kmlLayerGroupRes, a.kml);
    const pts = a.pontos.filter(p=>p.lat);
    const bounds = pts.length ? [] : (a.kml ? kmlBoundsList(a.kml) : []);
    pts.forEach((p,i)=>{
      const s = p.pestId ? statusForCount(a.cultura,p.pestId,p.count) : "ok";
      L.marker([p.lat,p.lng], {icon:numberedMarkerIcon(i+1, statusColor(s))}).addTo(resMap)
        .bindTooltip("Ponto "+(i+1)+(p.pestId ? " — "+(getPestById(a.cultura,p.pestId)?.apelido||"") : ""));
      bounds.push([p.lat,p.lng]);
    });
    if(bounds.length){
      resMap.fitBounds(bounds, {padding:[24,24]});
    } else {
      resMap.setView([-4.9,-44.9], 12);
    }
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos=>{
        placeUserMarker(resMap, pos.coords.latitude, pos.coords.longitude, "res");
      }, ()=>{}, {enableHighAccuracy:true, timeout:8000});
    }
  }, 60);

  const plist = document.getElementById("res-pontos-list");
  plist.innerHTML = "";
  a.pontos.forEach((p,idx)=>{
    const pest = p.pestId ? getPestById(a.cultura,p.pestId) : null;
    const s = pest ? statusForCount(a.cultura,p.pestId,p.count) : "ok";
    const card = document.createElement("div");
    card.className = "point-card";
    card.innerHTML = `
      ${p.photo ? `<img class="point-thumb" src="${p.photo}">` : `<div class="point-thumb" style="display:flex;align-items:center;justify-content:center;">📍</div>`}
      <div class="point-meta">
        <div class="pname">Ponto ${idx+1}${pest ? " — "+pest.apelido : " — sem infestação"}</div>
        <div class="psub">${p.lat ? p.lat.toFixed(5)+", "+p.lng.toFixed(5) : "sem GPS"}${pest ? " · "+p.count+" un.":""}</div>
      </div>
      ${pest ? `<span class="status-chip status-${s}">${statusLabel(s)}</span>` : ""}
    `;
    plist.appendChild(card);
  });

  showScreen("screen-resultado");
}

function showPestDetail(pest, cultura){
  pestDetailTarget = { cultura, pestId: pest.id };
  const hasCustom = !!getCustomPestPhoto(cultura, pest.id);
  const refs = (typeof getReferencePhotos === "function") ? getReferencePhotos(pest.id) : [];
  let statusLabelPhoto;
  if(hasCustom) statusLabelPhoto = "📷 Foto própria salva neste aparelho";
  else if(refs.length) statusLabelPhoto = "📖 Foto de referência — Manual Embrapa (Documentos 269)";
  else statusLabelPhoto = "Ilustração de referência — ainda não é uma foto real";
  const gallery = (!hasCustom && refs.length > 1)
    ? `<div class="row" style="gap:6px;margin:6px 0 10px;overflow-x:auto;">
        ${refs.map((r,i)=>`<img src="${r}" onclick="document.querySelector('#pest-detail-photo-wrap img').src='${r}'" style="width:52px;height:52px;object-fit:cover;border-radius:8px;flex:none;cursor:pointer;border:1px solid var(--line);${i===0?'outline:2px solid var(--soja);':''}">`).join("")}
      </div>`
    : "";
  document.getElementById("pest-detail-body").innerHTML = `
    <span class="badge-crop ${cultura}">${cultura.toUpperCase()}</span>
    <h3 style="margin-top:8px;">${pest.nome}</h3>
    <div class="muted" style="margin-bottom:10px;">${pest.categoria}</div>
    <div class="pest-detail-photo" id="pest-detail-photo-wrap">${pestVisualInnerHTML(cultura, pest.id)}</div>
    <div class="muted" style="text-align:center;font-size:11px;margin:6px 0 10px;">${statusLabelPhoto}</div>
    ${gallery}
    <div class="row" style="margin-bottom:12px;">
      <button class="btn btn-outline btn-sm" onclick="openPestPhotoPicker()">📷 ${hasCustom ? "Trocar foto" : "Adicionar foto própria"}</button>
      ${hasCustom ? `<button class="btn btn-outline btn-sm" onclick="resetPestPhoto()">↺ Usar foto de referência</button>` : ""}
    </div>
    <div class="card"><b>Identificação</b><p class="muted">${pest.identificacao}</p></div>
    <div class="card"><b>Amostragem</b><p class="muted">Unidade: ${pest.unidade}<br>Nível de controle de referência: ${effectiveThreshold(cultura,pest.id)}${pest.ncNota ? " — "+pest.ncNota : ""}</p>
      ${pestHasStages(pest) ? `<p class="muted" style="margin-top:6px;">Registro por estágio: ${pest.estagios.map(e=>e.label+(e.contaNC?" (conta p/ NC)":"")).join(" · ")}</p>` : ""}
    </div>
    <div class="card"><b>Recomendação</b><p class="muted">${pest.recomendacao}</p></div>
  `;
  document.getElementById("modal-pest-detail").classList.remove("hidden");
}

function openPestPhotoPicker(){
  document.getElementById("pest-photo-input").click();
}

function onPestPhotoSelected(ev){
  const file = ev.target.files[0];
  if(!file || !pestDetailTarget) return;
  const reader = new FileReader();
  reader.onload = function(e){
    const img = new Image();
    img.onload = function(){
      // comprime para manter o localStorage leve
      const canvas = document.createElement("canvas");
      const maxW = 480;
      const scale = Math.min(1, maxW/img.width);
      canvas.width = img.width*scale; canvas.height = img.height*scale;
      canvas.getContext("2d").drawImage(img,0,0,canvas.width,canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.75);
      pestPhotos[pestPhotoKey(pestDetailTarget.cultura, pestDetailTarget.pestId)] = dataUrl;
      savePestPhotosToStore(pestPhotos);
      const pest = getPestById(pestDetailTarget.cultura, pestDetailTarget.pestId);
      showPestDetail(pest, pestDetailTarget.cultura);
      toast("Foto salva neste aparelho");
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
  ev.target.value = "";
}

function resetPestPhoto(){
  if(!pestDetailTarget) return;
  delete pestPhotos[pestPhotoKey(pestDetailTarget.cultura, pestDetailTarget.pestId)];
  savePestPhotosToStore(pestPhotos);
  const pest = getPestById(pestDetailTarget.cultura, pestDetailTarget.pestId);
  showPestDetail(pest, pestDetailTarget.cultura);
  toast("Foto própria removida");
}

// ===================== HISTÓRICO =====================
function historyCard(a, showDelete){
  const { overallControle, summary } = computeSummary(a);
  const div = document.createElement("div");
  div.className = "hist-item";
  div.onclick = ()=>showResultado(a);
  div.innerHTML = `
    <div class="hist-top">
      <div>
        <div style="font-weight:700;font-size:15px;">${a.talhao}</div>
        <div class="muted">${a.fazenda} · ${new Date(a.data).toLocaleDateString('pt-BR')}</div>
      </div>
      <span class="badge-crop ${a.cultura}">${a.cultura.toUpperCase()}</span>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;">
      <span class="muted">${a.pontos.length} pontos · ${summary.length} praga(s)</span>
      <span class="status-chip status-${overallControle?'controle':'ok'}">${overallControle?'CONTROLAR':'ABAIXO DO NC'}</span>
    </div>
    ${showDelete ? `<button class="btn btn-outline btn-sm" style="margin-top:8px;width:100%;color:#d9534f;border-color:#d9534f;" onclick="deleteAssessment(event,'${a.id}')">🗑 Remover amostragem</button>` : ""}
  `;
  return div;
}
function deleteAssessment(ev, id){
  ev.stopPropagation();
  const a = assessments.find(x=>x.id===id);
  if(!a) return;
  const ok = confirm(`Remover a amostragem de "${a.talhao}" (${new Date(a.data).toLocaleDateString('pt-BR')})? Essa ação não pode ser desfeita.`);
  if(!ok) return;
  assessments = assessments.filter(x=>x.id!==id);
  saveAssessments(assessments);
  renderHistorico();
  toast("Amostragem removida");
}
function renderHistorico(){
  const cf = document.getElementById("hist-filter-cultura").value;
  const sf = document.getElementById("hist-filter-status").value;
  let list = [...assessments].reverse();
  if(cf!=="todas") list = list.filter(a=>a.cultura===cf);
  if(sf!=="todos") list = list.filter(a=> computeSummary(a).overallControle === (sf==="controle"));
  const wrap = document.getElementById("historico-list");
  wrap.innerHTML = "";
  if(list.length===0){ wrap.innerHTML = `<div class="empty"><div class="big">📭</div>Nenhuma avaliação encontrada.</div>`; return; }
  list.forEach(a=>wrap.appendChild(historyCard(a, true)));
}

// ===================== GUIA DE PRAGAS =====================
function setGuiaCrop(c){
  guiaCrop = c;
  document.getElementById("guia-crop-soja").classList.toggle("active", c==="soja");
  document.getElementById("guia-crop-milho").classList.toggle("active", c==="milho");
  renderGuia();
}
function renderGuia(){
  const q = (document.getElementById("guia-search").value||"").toLowerCase();
  const wrap = document.getElementById("guia-list");
  wrap.innerHTML = "";
  PESTS_DB[guiaCrop]
    .filter(p=>p.nome.toLowerCase().includes(q)||p.apelido.toLowerCase().includes(q)||p.categoria.toLowerCase().includes(q))
    .forEach(p=>{
      const row = document.createElement("div");
      row.className = "pest-item";
      row.style.cursor = "pointer";
      row.innerHTML = `<div style="display:flex;align-items:center;gap:10px;min-width:0;">${getPestVisualHTML(guiaCrop,p.id,44)}<div style="min-width:0;"><div class="pn">${p.apelido}</div><div class="pl">${p.nome}</div></div></div><span style="color:var(--ink-dim);">›</span>`;
      row.onclick = ()=>showPestDetail(p, guiaCrop);
      wrap.appendChild(row);
    });
}

// ===================== PDF & WHATSAPP =====================
// ===================== MAPA ESQUEMÁTICO PARA PDF =====================
function drawAssessmentMapDataURL(a){
  const kml = a.kml;
  const pts = a.pontos.filter(p=>p.lat!=null && p.lng!=null);
  const allPts = [];
  if(pts.length){
    pts.forEach(p=>allPts.push([p.lat,p.lng]));
  } else if(kml){
    (kml.polygons||[]).forEach(poly=>poly.coords.forEach(c=>allPts.push(c)));
    (kml.lines||[]).forEach(l=>l.coords.forEach(c=>allPts.push(c)));
    (kml.points||[]).forEach(p=>allPts.push([p.lat,p.lng]));
  }
  if(allPts.length===0) return null;

  const lats = allPts.map(p=>p[0]), lngs = allPts.map(p=>p[1]);
  let minLat=Math.min(...lats), maxLat=Math.max(...lats);
  let minLng=Math.min(...lngs), maxLng=Math.max(...lngs);
  const latPad = Math.max((maxLat-minLat)*0.12, 0.0006);
  const lngPad = Math.max((maxLng-minLng)*0.12, 0.0006);
  minLat-=latPad; maxLat+=latPad; minLng-=lngPad; maxLng+=lngPad;

  const W=700, H=460, pad=26;
  const canvas = document.createElement("canvas");
  canvas.width=W; canvas.height=H;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle="#ffffff"; ctx.fillRect(0,0,W,H);
  ctx.strokeStyle="#d0d0d0"; ctx.lineWidth=1.5; ctx.strokeRect(4,4,W-8,H-8);

  const latSpan = maxLat-minLat, lngSpan = maxLng-minLng;
  const latRad = ((minLat+maxLat)/2) * Math.PI/180;
  const lngScale = Math.cos(latRad);
  const spanXAdj = lngSpan*lngScale, spanYAdj = latSpan;
  const scale = Math.min((W-2*pad)/Math.max(spanXAdj,1e-9), (H-2*pad)/Math.max(spanYAdj,1e-9));
  function project(lat,lng){
    const x = pad + (lng-minLng)*lngScale*scale + ((W-2*pad)-spanXAdj*scale)/2;
    const y = pad + (maxLat-lat)*scale + ((H-2*pad)-spanYAdj*scale)/2;
    return [x,y];
  }

  if(kml){
    (kml.polygons||[]).forEach(poly=>{
      ctx.beginPath();
      poly.coords.forEach((c,i)=>{ const [x,y]=project(c[0],c[1]); if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y); });
      ctx.closePath();
      ctx.fillStyle="rgba(127,160,80,0.12)"; ctx.fill();
      ctx.strokeStyle="#5c7a3b"; ctx.lineWidth=2; ctx.setLineDash([6,4]); ctx.stroke(); ctx.setLineDash([]);
    });
    (kml.lines||[]).forEach(line=>{
      ctx.beginPath();
      line.coords.forEach((c,i)=>{ const [x,y]=project(c[0],c[1]); if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y); });
      ctx.strokeStyle="#a85f1f"; ctx.lineWidth=2; ctx.setLineDash([4,4]); ctx.stroke(); ctx.setLineDash([]);
    });
    (kml.points||[]).forEach(p=>{
      const [x,y]=project(p.lat,p.lng);
      ctx.beginPath(); ctx.arc(x,y,5,0,Math.PI*2); ctx.fillStyle="#9aa68c"; ctx.fill();
      ctx.lineWidth=1.5; ctx.strokeStyle="#444"; ctx.stroke();
    });
  }

  pts.forEach((p,idx)=>{
    const status = p.pestId ? statusForCount(a.cultura,p.pestId,p.count) : "ok";
    const color = statusColor(status);
    const [x,y]=project(p.lat,p.lng);
    ctx.beginPath(); ctx.arc(x,y,9,0,Math.PI*2); ctx.fillStyle=color; ctx.fill();
    ctx.lineWidth=1.5; ctx.strokeStyle="#222"; ctx.stroke();
    ctx.fillStyle="#fff"; ctx.font="bold 11px Arial"; ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText(String(idx+1), x, y+0.5);
    if(p.pestId){
      const pestInfo = getPestById(a.cultura, p.pestId);
      const shortName = pestInfo ? pestInfo.apelido.split(" / ")[0] : "";
      const label = p.count+" "+shortName;
      ctx.font="bold 10px Arial";
      const lw = ctx.measureText(label).width;
      const lx = x+11, ly = y;
      ctx.fillStyle="#ffffff";
      ctx.fillRect(lx-2, ly-7.5, lw+4, 15);
      ctx.strokeStyle=color; ctx.lineWidth=0.8;
      ctx.strokeRect(lx-2, ly-7.5, lw+4, 15);
      ctx.fillStyle="#111";
      ctx.textAlign="left"; ctx.textBaseline="middle";
      ctx.fillText(label, lx, ly+0.5);
    }
  });

  return canvas.toDataURL("image/png");
}

async function exportPDF(id){
  const a = assessments.find(x=>x.id===id);
  if(!a){ toast("Avaliação não encontrada"); return; }
  toast("Gerando PDF...");
  try{
    await exportPDFInner(a);
    toast("PDF gerado");
  }catch(e){
    console.error("Erro ao gerar PDF:", e);
    toast("Erro ao gerar PDF: "+e.message);
  }
}

// ===================== MAPA DEDICADO PARA O PDF =====================
// Sempre monta um mapa novo, enquadrado nos pontos, independente de qualquer
// arrastar/zoom que a pessoa tenha feito no mapa da tela.
function buildPdfMap(a){
  return new Promise((resolve)=>{
    const container = document.getElementById('pdf-map-render');
    container.innerHTML = "";
    const map = L.map(container, {zoomControl:false, attributionControl:false, fadeAnimation:false, zoomAnimation:false});
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {crossOrigin:true}).addTo(map);
    const kmlGroup = L.layerGroup().addTo(map);
    renderKmlLayer(map, kmlGroup, a.kml);
    const pts = a.pontos.filter(p=>p.lat!=null && p.lng!=null);
    const bounds = pts.length ? [] : (a.kml ? kmlBoundsList(a.kml) : []);
    pts.forEach((p,i)=>{
      const s = p.pestId ? statusForCount(a.cultura,p.pestId,p.count) : "ok";
      L.marker([p.lat,p.lng], {icon:numberedMarkerIcon(i+1, statusColor(s))}).addTo(map);
      bounds.push([p.lat,p.lng]);
    });
    map.invalidateSize();
    if(bounds.length){ map.fitBounds(bounds, {padding:[24,24]}); }
    else { map.setView([-4.9,-44.9], 12); }
    let settled = false;
    const finish = ()=>{ if(settled) return; settled = true; resolve(map); };
    tiles.on('load', finish);
    setTimeout(finish, 1500); // segue mesmo sem internet/tiles, pra não travar o PDF
  });
}

async function exportPDFInner(a){
  const { summary, overallControle } = computeSummary(a);
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 14;
  const cropColor = a.cultura === "milho" ? [217,142,62] : [127,160,80];

  // ---------- CABEÇALHO ----------
  doc.setFillColor(18,20,15);
  doc.rect(0,0,pageW,34,"F");
  doc.setFillColor(...cropColor);
  doc.rect(0,32,pageW,2,"F");
  try{ doc.addImage(LOGO_B64, "PNG", margin, 6, 20, 20); }catch(e){}
  const textX = margin + 24;
  doc.setTextColor(255,255,255);
  doc.setFont("helvetica","bold"); doc.setFontSize(18);
  doc.text("PragaTrack", textX, 15);
  doc.setFont("helvetica","normal"); doc.setFontSize(9.5);
  doc.text("Relatório de Avaliação de Pragas — "+a.cultura.toUpperCase(), textX, 22);
  doc.setFontSize(8); doc.setTextColor(210,214,202);
  doc.text("Gerado em "+new Date().toLocaleString('pt-BR'), margin, 28);

  const badgeText = overallControle ? "CONTROLE RECOMENDADO" : "ABAIXO DO NC";
  const badgeColor = overallControle ? [201,85,60] : [90,158,90];
  doc.setFont("helvetica","bold"); doc.setFontSize(9.5);
  const badgeW = doc.getTextWidth(badgeText)+10;
  doc.setFillColor(...badgeColor);
  doc.roundedRect(pageW-margin-badgeW, 11, badgeW, 9, 2, 2, "F");
  doc.setTextColor(255,255,255);
  doc.text(badgeText, pageW-margin-badgeW/2, 17, {align:"center"});

  let y = 42;

  // ---------- FICHA ----------
  doc.setFillColor(245,246,242);
  doc.roundedRect(margin, y, pageW-margin*2, 24, 2, 2, "F");
  const col1 = margin+4, col2 = margin + (pageW-margin*2)/2 + 4;
  doc.setFont("helvetica","bold"); doc.setFontSize(8); doc.setTextColor(120,128,108);
  doc.text("FAZENDA", col1, y+7); doc.text("TALHÃO", col2, y+7);
  doc.text("DATA / ESTÁDIO", col1, y+16); doc.text("RESPONSÁVEL", col2, y+16);
  doc.setFont("helvetica","normal"); doc.setFontSize(10.5); doc.setTextColor(20,20,20);
  doc.text(a.fazenda||"-", col1, y+12);
  doc.text(a.talhao||"-", col2, y+12);
  doc.text(new Date(a.data).toLocaleDateString('pt-BR')+" · "+(a.estadio||"-"), col1, y+21);
  doc.text(a.responsavel||"-", col2, y+21);
  y += 24+8;

  // ---------- MAPA (mapa dedicado, independente do que está na tela; se falhar, cai no esquemático) ----------
  let mapImg = null, mapRatio = 460/700, mapFmt = "PNG";
  let pdfMap = null;
  try{
    pdfMap = await buildPdfMap(a);
    const scale = 2;
    const canvas = await html2canvas(document.getElementById("pdf-map-render"), {useCORS:true, allowTaint:false, backgroundColor:"#dfe6d8", scale});
    const ctx = canvas.getContext("2d");
    // Desenha os pontos manualmente por cima: html2canvas não captura de forma
    // confiável os ícones do Leaflet (transforms CSS aninhados).
    const pts = a.pontos.filter(p=>p.lat!=null && p.lng!=null);
    pts.forEach((p,idx)=>{
      const status = p.pestId ? statusForCount(a.cultura,p.pestId,p.count) : "ok";
      const color = statusColor(status);
      const pt = pdfMap.latLngToContainerPoint([p.lat,p.lng]);
      const x = pt.x*scale, y = pt.y*scale, r = 11*scale/2;
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fillStyle=color; ctx.fill();
      ctx.lineWidth=scale; ctx.strokeStyle="#fff"; ctx.stroke();
      ctx.fillStyle="#fff"; ctx.font=`bold ${r}px Arial`; ctx.textAlign="center"; ctx.textBaseline="middle";
      ctx.fillText(String(idx+1), x, y+0.5*scale);
      if(p.pestId){
        const pestInfo = getPestById(a.cultura, p.pestId);
        const shortName = pestInfo ? pestInfo.apelido.split(" / ")[0] : "";
        const label = p.count+" "+shortName;
        const lf = 10*scale/2;
        ctx.font = `bold ${lf}px Arial`;
        const lw = ctx.measureText(label).width;
        const lx = x+r+4*scale, ly = y;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(lx-2*scale, ly-lf*0.75, lw+4*scale, lf*1.5);
        ctx.strokeStyle = color; ctx.lineWidth = 0.6*scale;
        ctx.strokeRect(lx-2*scale, ly-lf*0.75, lw+4*scale, lf*1.5);
        ctx.fillStyle = "#111";
        ctx.textAlign="left"; ctx.textBaseline="middle";
        ctx.fillText(label, lx, ly+0.5*scale);
      }
    });
    mapImg = canvas.toDataURL("image/png");
    mapRatio = canvas.height/canvas.width;
    mapFmt = "PNG";
  }catch(e){ mapImg = null; }
  finally{
    if(pdfMap){ pdfMap.remove(); pdfMap = null; }
  }
  if(!mapImg){ mapImg = drawAssessmentMapDataURL(a); mapRatio = 460/700; mapFmt = "PNG"; }

  if(mapImg){
    const imgW = pageW-margin*2, imgH = imgW*mapRatio;
    if(y+imgH > pageH-30){ doc.addPage(); y=18; }
    doc.setDrawColor(210,210,210); doc.setLineWidth(.3);
    doc.rect(margin, y, imgW, imgH);
    doc.addImage(mapImg, mapFmt, margin, y, imgW, imgH);
    y += imgH + 4;

    doc.setFontSize(7.5);
    const legend = [["Abaixo do NC",[90,158,90]],["Atenção",[217,179,62]],["Controlar",[201,85,60]],["Você estava aqui",[74,144,217]]];
    let lx = margin;
    legend.forEach(([label,color])=>{
      doc.setFillColor(...color);
      doc.circle(lx+1.4, y+0.8, 1.4, "F");
      doc.setTextColor(100,106,90); doc.setFont("helvetica","normal");
      doc.text(label, lx+4.5, y+1.6);
      lx += doc.getTextWidth(label)+13;
    });
    y += 5;
    doc.setFontSize(7); doc.setTextColor(130,136,120); doc.setFont("helvetica","italic");
    doc.text("O número identifica o ponto; ao lado, a contagem e a praga encontrada.", margin, y);
    y += 7;
  }

  const pontosSemGps = a.pontos.filter(p=>(p.lat==null||p.lng==null) && p.pestId);
  if(pontosSemGps.length){
    if(y>pageH-30){ doc.addPage(); y=18; }
    doc.setFont("helvetica","bold"); doc.setFontSize(8.5); doc.setTextColor(90,96,80);
    doc.text("Pontos sem GPS registrado:", margin, y); y += 4.5;
    doc.setFont("helvetica","normal"); doc.setFontSize(8);
    pontosSemGps.forEach(p=>{
      const pestInfo = getPestById(a.cultura, p.pestId);
      doc.text(`• ${p.count} ${pestInfo ? pestInfo.apelido : "—"}`, margin+2, y);
      y += 4;
    });
    y += 3;
  }

  // ---------- RESUMO POR PRAGA ----------
  doc.setTextColor(20,20,20);
  if(y>pageH-40){ doc.addPage(); y=18; }
  doc.setFont("helvetica","bold"); doc.setFontSize(12);
  doc.text("Resultado por praga", margin, y);
  y += 5.5;
  doc.setFont("helvetica","normal"); doc.setFontSize(8.5); doc.setTextColor(90,96,80);
  const totalPontos = a.pontos.length;
  const controlePontos = a.pontos.filter(p=>p.pestId && statusForCount(a.cultura,p.pestId,p.count)==="controle").length;
  const atencaoPontos = a.pontos.filter(p=>p.pestId && statusForCount(a.cultura,p.pestId,p.count)==="atencao").length;
  doc.text(`Média geral do talhão: ${totalPontos} pontos amostrados`+
    (controlePontos ? ` · ${controlePontos} acima do nível de controle` : "")+
    (atencaoPontos ? ` · ${atencaoPontos} em atenção` : ""), margin, y);
  y += 3;

  if(summary.length===0){
    y+=7;
    doc.setFont("helvetica","normal"); doc.setFontSize(10);
    doc.text("Nenhuma praga identificada nos pontos amostrados.", margin, y); y+=8;
  } else {
    const rows = summary.map(s=>{
      const nc = effectiveThreshold(a.cultura,s.pest.id);
      return [
        s.pest.apelido,
        s.media.toFixed(1)+" "+s.pest.unidade,
        nc!=null ? String(nc) : "—",
        String(s.nPontos),
        statusLabel(s.status)
      ];
    });
    doc.autoTable({
      startY: y+4,
      margin: {left:margin, right:margin},
      head: [["Praga","Média observada","NC referência","Pontos","Status"]],
      body: rows,
      theme: "grid",
      styles: {fontSize:8.5, cellPadding:2.4, textColor:[30,30,30]},
      headStyles: {fillColor:[24,28,20], textColor:255, fontStyle:"bold"},
      alternateRowStyles: {fillColor:[245,246,242]},
      columnStyles: {4:{fontStyle:"bold"}},
      didParseCell: (data)=>{
        if(data.section==="body" && data.column.index===4){
          const raw = data.cell.raw;
          if(raw==="CONTROLAR") data.cell.styles.textColor=[201,85,60];
          else if(raw==="ATENÇÃO") data.cell.styles.textColor=[168,130,20];
          else data.cell.styles.textColor=[70,120,70];
        }
      }
    });
    y = doc.lastAutoTable.finalY + 6;

    summary.forEach(s=>{
      if(y>pageH-30){ doc.addPage(); y=18; }
      doc.setFont("helvetica","bold"); doc.setFontSize(9.5); doc.setTextColor(20,20,20);
      doc.text(s.pest.apelido+":", margin, y); y+=4.5;
      const nc = effectiveThreshold(a.cultura, s.pest.id);
      if(nc){
        const idx = s.media/nc*100;
        const rgb = s.status==="controle" ? [201,85,60] : s.status==="atencao" ? [168,130,20] : [70,120,70];
        doc.setFont("helvetica","bold"); doc.setFontSize(9); doc.setTextColor(rgb[0],rgb[1],rgb[2]);
        const idxText = `Índice de infestação: ${idx.toFixed(0)}% do nível de controle (${s.media.toFixed(1)} de ${nc} ${s.pest.unidade})`;
        const idxLines = doc.splitTextToSize(idxText, pageW-margin*2);
        doc.text(idxLines, margin, y); y += idxLines.length*4.4 + 1;
      }
      const composicaoTexto = formatStageMediasText(s.stageMedias);
      if(composicaoTexto){
        doc.setFont("helvetica","normal"); doc.setFontSize(8); doc.setTextColor(90,96,80);
        const compLines = doc.splitTextToSize("Composição média por ponto: "+composicaoTexto+" (apenas os estágios marcados contam para o NC — os demais indicam pressão futura ou mortalidade natural).", pageW-margin*2);
        doc.text(compLines, margin, y); y += compLines.length*4 + 2;
      }
      doc.setFont("helvetica","normal"); doc.setFontSize(8.5); doc.setTextColor(70,74,64);
      const recLines = doc.splitTextToSize(s.pest.recomendacao, pageW-margin*2);
      doc.text(recLines, margin, y); y += recLines.length*4.2 + 4;
    });
  }

  // (Tabela de pontos removida — a contagem e o status de cada ponto já aparecem no mapa acima.)

  if(a.kml && a.kml.points && a.kml.points.length){
    if(y>pageH-40){ doc.addPage(); y=18; }
    doc.setFont("helvetica","bold"); doc.setFontSize(11);
    doc.text("Pontos de referência (KML/KMZ)", margin, y);
    const refRows = a.kml.points.map((p,idx)=>[String(idx+1), p.name||"Ref.", p.lat.toFixed(5)+", "+p.lng.toFixed(5)]);
    doc.autoTable({
      startY: y+4,
      margin: {left:margin, right:margin},
      head: [["#","Nome","Coordenadas"]],
      body: refRows,
      theme: "striped",
      styles: {fontSize:8, cellPadding:2},
      headStyles: {fillColor:[168,95,31], textColor:255, fontStyle:"bold"},
    });
    y = doc.lastAutoTable.finalY + 6;
  }

  // ---------- RODAPÉ EM TODAS AS PÁGINAS ----------
  const pageCount = doc.internal.getNumberOfPages();
  for(let i=1;i<=pageCount;i++){
    doc.setPage(i);
    doc.setDrawColor(220,220,220); doc.setLineWidth(.2);
    doc.line(margin, pageH-16, pageW-margin, pageH-16);
    doc.setFont("helvetica","italic"); doc.setFontSize(7.5); doc.setTextColor(140,146,130);
    doc.text("Níveis de controle são valores de referência geral — ajuste conforme orientação técnica local.", margin, pageH-11);
    doc.setFont("helvetica","normal"); doc.setFontSize(7.5); doc.setTextColor(150,150,150);
    doc.text("PragaTrack — Desenvolvido por João Divino Barbosa", margin, pageH-6);
    doc.text(`Página ${i} de ${pageCount}`, pageW-margin, pageH-6, {align:"right"});
  }

  const filename = `PragaTrack_${a.talhao.replace(/\s+/g,"_")}_${a.cultura}.pdf`;
  const blob = doc.output("blob");
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(()=>URL.revokeObjectURL(url), 3000);
}

function shareWhatsApp(id){
  const a = assessments.find(x=>x.id===id);
  if(!a){ toast("Avaliação não encontrada"); return; }
  const { summary, overallControle } = computeSummary(a);
  let msg = `*PragaTrack — ${a.talhao}*\n${a.fazenda} · ${a.cultura.toUpperCase()} · ${new Date(a.data).toLocaleDateString('pt-BR')}\n`;
  msg += `Pontos amostrados: ${a.pontos.length}\n\n`;
  msg += overallControle ? "🚨 *CONTROLE RECOMENDADO*\n\n" : "✅ *Abaixo do nível de controle*\n\n";
  summary.forEach(s=>{
    msg += `• ${s.pest.apelido}: média ${s.media.toFixed(1)} (NC ${effectiveThreshold(a.cultura,s.pest.id)}) — ${statusLabel(s.status)}\n`;
    const composicaoTexto = formatStageMediasText(s.stageMedias);
    if(composicaoTexto) msg += `   ↳ ${composicaoTexto}\n`;
  });
  const url = "https://wa.me/?text="+encodeURIComponent(msg);
  window.open(url, "_blank");
}

// ===================== INIT =====================
function initApp(){
  renderHome();
  showTab("home");
}

// PWA install
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  });
}

// ===================== AUTENTICAÇÃO =====================
let currentUser = null;

function showAuthMode(mode){
  document.getElementById("auth-form-login").style.display = mode==="login" ? "block" : "none";
  document.getElementById("auth-form-cadastro").style.display = mode==="cadastro" ? "block" : "none";
  document.getElementById("auth-subtitle").textContent = mode==="login" ? "Entre para acessar suas avaliações" : "Crie sua conta para começar";
  hideAuthError();
}

function hideAuthError(){
  document.getElementById("auth-error").style.display = "none";
}
function authError(msg){
  const el = document.getElementById("auth-error");
  el.textContent = msg;
  el.style.display = "block";
}

const AUTH_ERROR_MESSAGES = {
  "auth/invalid-email": "E-mail inválido.",
  "auth/user-not-found": "Não existe conta com esse e-mail.",
  "auth/wrong-password": "Senha incorreta.",
  "auth/invalid-credential": "E-mail ou senha incorretos.",
  "auth/email-already-in-use": "Já existe uma conta com esse e-mail.",
  "auth/weak-password": "A senha precisa ter pelo menos 6 caracteres.",
  "auth/too-many-requests": "Muitas tentativas. Aguarde um pouco e tente de novo.",
  "auth/network-request-failed": "Falha de conexão. Verifique a internet."
};
function friendlyAuthError(e){
  return AUTH_ERROR_MESSAGES[e.code] || (e.message || "Não foi possível completar a ação.");
}

function doLogin(){
  const email = document.getElementById("login-email").value.trim();
  const senha = document.getElementById("login-senha").value;
  hideAuthError();
  if(!email || !senha){ authError("Preencha e-mail e senha."); return; }
  auth.signInWithEmailAndPassword(email, senha).catch(e=>authError(friendlyAuthError(e)));
}

function doCadastro(){
  const nome = document.getElementById("cad-nome").value.trim();
  const email = document.getElementById("cad-email").value.trim();
  const senha = document.getElementById("cad-senha").value;
  const senha2 = document.getElementById("cad-senha2").value;
  hideAuthError();
  if(!nome || !email || !senha){ authError("Preencha todos os campos."); return; }
  if(senha !== senha2){ authError("As senhas não coincidem."); return; }
  if(senha.length < 6){ authError("A senha precisa ter pelo menos 6 caracteres."); return; }
  auth.createUserWithEmailAndPassword(email, senha).then(cred=>{
    return cred.user.updateProfile({displayName: nome}).then(()=>
      db.collection("usuarios").doc(cred.user.uid).set({ nome, email, criadoEm: new Date().toISOString() })
    );
  }).catch(e=>authError(friendlyAuthError(e)));
}

function doForgotPassword(){
  const email = (document.getElementById("login-email").value||"").trim();
  hideAuthError();
  if(!email){ authError("Digite seu e-mail no campo acima e toque em \"Esqueci minha senha\" de novo."); return; }
  auth.sendPasswordResetEmail(email)
    .then(()=> toast("E-mail de redefinição enviado para "+email))
    .catch(e=>authError(friendlyAuthError(e)));
}

function doLogout(){
  if(!confirm("Sair da sua conta?")) return;
  closeModal("modal-settings");
  auth.signOut();
}

auth.onAuthStateChanged(user=>{
  const splash = document.getElementById("splash-screen");
  const authScreen = document.getElementById("auth-screen");
  if(user){
    currentUser = user;
    authScreen.classList.add("hide");
    const emailEl = document.getElementById("settings-account-email");
    if(emailEl) emailEl.textContent = (user.displayName ? user.displayName+" · " : "")+user.email;
    initApp();
  } else {
    currentUser = null;
    authScreen.classList.remove("hide");
    showAuthMode("login");
  }
  if(splash){ splash.classList.add("hide"); setTimeout(()=>splash.remove(), 500); }
});
