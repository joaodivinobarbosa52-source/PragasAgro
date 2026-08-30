// ===================== ESTADO & PERSISTÊNCIA =====================
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
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(coletaMap);
    L.control.zoom({position:'bottomright'}).addTo(coletaMap);
    kmlLayerGroup = L.layerGroup().addTo(coletaMap);
    renderKmlLayer(coletaMap, kmlLayerGroup, draft.kml);
    if(draft.kml){
      const bounds = kmlBoundsList(draft.kml);
      if(bounds.length) coletaMap.fitBounds(bounds, {padding:[30,30]});
    } else if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos=>{
        coletaMap.setView([pos.coords.latitude, pos.coords.longitude], 16);
      }, ()=>{});
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
    const card = document.createElement("div");
    card.className = "point-card";
    card.innerHTML = `
      ${p.photo ? `<img class="point-thumb" src="${p.photo}">` : `<div class="point-thumb" style="display:flex;align-items:center;justify-content:center;color:var(--ink-dim);font-size:18px;">📍</div>`}
      <div class="point-meta">
        <div class="pname">Ponto ${idx+1}${pest ? " — "+pest.apelido : " — sem infestação"}</div>
        <div class="psub">${p.lat ? p.lat.toFixed(5)+", "+p.lng.toFixed(5) : "sem GPS"}${pest ? " · "+p.count+" "+pest.unidade.split(" ")[0] : ""}</div>
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
  pointDraft = { lat:null, lng:null, photo:null, pestId:null, count:null };
  document.getElementById("modal-point-title").textContent = "Novo ponto — #"+(draft.pontos.length+1);
  document.getElementById("gps-status").textContent = "Toque para capturar GPS";
  document.getElementById("gps-status").className = "dashline";
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
  const p = getPestById(draft.cultura, pestId);
  document.getElementById("point-pest-selected").style.display = "block";
  document.getElementById("sel-pest-thumb").innerHTML = pestVisualInnerHTML(draft.cultura, pestId);
  document.getElementById("sel-pest-name").textContent = p.nome;
  document.getElementById("sel-pest-unit").textContent = "Unidade: "+p.unidade+" · NC referência: "+effectiveThreshold(draft.cultura,pestId);
  document.getElementById("point-count").value = "";
  document.getElementById("point-status-preview").innerHTML = "";
}
function clearSelectedPest(){
  pointDraft.pestId = null;
  document.getElementById("point-pest-selected").style.display = "none";
}
function setNoPest(){
  pointDraft.pestId = null;
  pointDraft.count = null;
  document.getElementById("point-pest-selected").style.display = "none";
  toast("Marcado como ponto sem infestação relevante");
}
function updatePointStatusPreview(){
  const count = parseFloat(document.getElementById("point-count").value);
  pointDraft.count = isNaN(count) ? null : count;
  if(!pointDraft.pestId || pointDraft.count==null){ document.getElementById("point-status-preview").innerHTML=""; return; }
  const s = statusForCount(draft.cultura, pointDraft.pestId, pointDraft.count);
  document.getElementById("point-status-preview").innerHTML = `<span class="status-chip status-${s}">${statusLabel(s)}</span>`;
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
    if(!byPest[p.pestId]) byPest[p.pestId] = { counts:[], statuses:[] };
    byPest[p.pestId].counts.push(p.count||0);
    byPest[p.pestId].statuses.push(statusForCount(a.cultura, p.pestId, p.count));
  });
  const summary = Object.keys(byPest).map(pestId=>{
    const pest = getPestById(a.cultura, pestId);
    const counts = byPest[pestId].counts;
    const media = counts.reduce((x,y)=>x+y,0)/counts.length;
    const worst = byPest[pestId].statuses.includes("controle") ? "controle" : byPest[pestId].statuses.includes("atencao") ? "atencao" : "ok";
    return { pest, media, nPontos: counts.length, status: worst };
  }).sort((x,y)=> (y.status==="controle") - (x.status==="controle"));
  const overallControle = summary.some(s=>s.status==="controle");
  return { summary, overallControle };
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
      const box = document.createElement("div");
      box.className = "card";
      box.style.cursor = "pointer";
      box.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div style="flex:1;">
          <div style="font-weight:700;font-size:14.5px;">${s.pest.apelido}</div>
          <div class="muted">Média: ${s.media.toFixed(1)} ${s.pest.unidade} · NC ref: ${effectiveThreshold(a.cultura,s.pest.id)} · ${s.nPontos} ponto(s)</div>
        </div>
        <span class="status-chip status-${s.status}">${statusLabel(s.status)}</span>
      </div>
      <div class="muted" style="margin-top:8px;">${s.pest.recomendacao}</div>`;
      box.onclick = ()=>showPestDetail(s.pest, a.cultura);
      recWrap.appendChild(box);
    });
  }

  setTimeout(()=>{
    if(resMap){ resMap.remove(); resMap=null; }
    resMap = L.map('res-map', {zoomControl:false, attributionControl:false});
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(resMap);
    L.control.zoom({position:'bottomright'}).addTo(resMap);
    kmlLayerGroupRes = L.layerGroup().addTo(resMap);
    renderKmlLayer(resMap, kmlLayerGroupRes, a.kml);
    const pts = a.pontos.filter(p=>p.lat);
    const bounds = a.kml ? kmlBoundsList(a.kml) : [];
    pts.forEach((p,i)=>{
      const s = p.pestId ? statusForCount(a.cultura,p.pestId,p.count) : "ok";
      L.circleMarker([p.lat,p.lng], {radius:9, color:statusColor(s), fillColor:statusColor(s), fillOpacity:.85, weight:2}).addTo(resMap).bindTooltip("Ponto "+(i+1));
      bounds.push([p.lat,p.lng]);
    });
    if(bounds.length){
      resMap.fitBounds(bounds, {padding:[24,24]});
    } else {
      resMap.setView([-4.9,-44.9], 12);
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
    <div class="card"><b>Amostragem</b><p class="muted">Unidade: ${pest.unidade}<br>Nível de controle de referência: ${effectiveThreshold(cultura,pest.id)}${pest.ncNota ? " — "+pest.ncNota : ""}</p></div>
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
function historyCard(a){
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
  `;
  return div;
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
  list.forEach(a=>wrap.appendChild(historyCard(a)));
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
  if(kml){
    (kml.polygons||[]).forEach(poly=>poly.coords.forEach(c=>allPts.push(c)));
    (kml.lines||[]).forEach(l=>l.coords.forEach(c=>allPts.push(c)));
    (kml.points||[]).forEach(p=>allPts.push([p.lat,p.lng]));
  }
  pts.forEach(p=>allPts.push([p.lat,p.lng]));
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
  });

  return canvas.toDataURL("image/png");
}

function exportPDF(id){
  const a = assessments.find(x=>x.id===id);
  if(!a){ toast("Avaliação não encontrada"); return; }
  const { summary, overallControle } = computeSummary(a);
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 18;
  doc.setFont("helvetica","bold"); doc.setFontSize(16);
  doc.text("PragaScout — Relatório de Avaliação", 14, y); y+=8;
  doc.setFontSize(10); doc.setFont("helvetica","normal");
  doc.text(`Cultura: ${a.cultura.toUpperCase()}   Fazenda: ${a.fazenda}   Talhão: ${a.talhao}`, 14, y); y+=6;
  doc.text(`Data: ${new Date(a.data).toLocaleDateString('pt-BR')}   Estádio: ${a.estadio}   Responsável: ${a.responsavel||"-"}`, 14, y); y+=6;
  doc.text(`Pontos amostrados: ${a.pontos.length}`, 14, y); y+=10;

  const mapImg = drawAssessmentMapDataURL(a);
  if(mapImg){
    const imgW = 182, imgH = imgW * (460/700);
    if(y + imgH > 270){ doc.addPage(); y=18; }
    doc.addImage(mapImg, "PNG", 14, y, imgW, imgH);
    y += imgH + 4;
    doc.setFontSize(8); doc.setFont("helvetica","italic");
    doc.text("Mapa esquematico (nao georreferenciado) - pontos numerados conforme lista abaixo. Area tracejada = talhao/pontos importados do KML/KMZ.", 14, y);
    y += 8;
    doc.setFontSize(10); doc.setFont("helvetica","normal");
  }

  doc.setFont("helvetica","bold");
  doc.text(overallControle ? "RESULTADO: CONTROLE RECOMENDADO" : "RESULTADO: ABAIXO DO NIVEL DE CONTROLE", 14, y); y+=8;
  doc.setFont("helvetica","normal");

  if(summary.length===0){
    doc.text("Nenhuma praga identificada nos pontos amostrados.", 14, y); y+=8;
  } else {
    summary.forEach(s=>{
      if(y>260){ doc.addPage(); y=18; }
      doc.setFont("helvetica","bold");
      doc.text(`${s.pest.apelido} — ${statusLabel(s.status)}`, 14, y); y+=5;
      doc.setFont("helvetica","normal");
      doc.text(`Media observada: ${s.media.toFixed(1)} (${s.pest.unidade})  |  NC referencia: ${effectiveThreshold(a.cultura,s.pest.id)}  |  Pontos: ${s.nPontos}`, 14, y); y+=5;
      const recLines = doc.splitTextToSize(s.pest.recomendacao, 180);
      doc.text(recLines, 14, y); y += recLines.length*5 + 4;
    });
  }

  y+=4;
  if(y>250){ doc.addPage(); y=18; }
  doc.setFont("helvetica","bold"); doc.text("Pontos de amostragem", 14, y); y+=6;
  doc.setFont("helvetica","normal");
  a.pontos.forEach((p,idx)=>{
    if(y>270){ doc.addPage(); y=18; }
    const pest = p.pestId ? getPestById(a.cultura,p.pestId) : null;
    const loc = p.lat ? `${p.lat.toFixed(5)}, ${p.lng.toFixed(5)}` : "sem GPS";
    doc.text(`${idx+1}. ${loc} — ${pest ? pest.apelido+" ("+p.count+")" : "sem infestacao"}`, 14, y); y+=5.5;
  });

  if(a.kml && a.kml.points && a.kml.points.length){
    y+=4;
    if(y>250){ doc.addPage(); y=18; }
    doc.setFont("helvetica","bold"); doc.text("Pontos de referencia importados (KML/KMZ)", 14, y); y+=6;
    doc.setFont("helvetica","normal");
    a.kml.points.forEach((p,idx)=>{
      if(y>270){ doc.addPage(); y=18; }
      doc.text(`${idx+1}. ${p.name || "Ref."} — ${p.lat.toFixed(5)}, ${p.lng.toFixed(5)}`, 14, y); y+=5.5;
    });
  }

  y+=8;
  if(y>270){ doc.addPage(); y=18; }
  doc.setFont("helvetica","italic"); doc.setFontSize(8.5);
  doc.text("Niveis de controle sao valores de referencia geral. Ajuste conforme orientacao tecnica local antes de decidir o controle.", 14, y);

  doc.save(`PragaScout_${a.talhao.replace(/\s+/g,"_")}_${a.cultura}.pdf`);
  toast("PDF gerado");
}

function shareWhatsApp(id){
  const a = assessments.find(x=>x.id===id);
  if(!a){ toast("Avaliação não encontrada"); return; }
  const { summary, overallControle } = computeSummary(a);
  let msg = `*PragaScout — ${a.talhao}*\n${a.fazenda} · ${a.cultura.toUpperCase()} · ${new Date(a.data).toLocaleDateString('pt-BR')}\n`;
  msg += `Pontos amostrados: ${a.pontos.length}\n\n`;
  msg += overallControle ? "🚨 *CONTROLE RECOMENDADO*\n\n" : "✅ *Abaixo do nível de controle*\n\n";
  summary.forEach(s=>{
    msg += `• ${s.pest.apelido}: média ${s.media.toFixed(1)} (NC ${effectiveThreshold(a.cultura,s.pest.id)}) — ${statusLabel(s.status)}\n`;
  });
  const url = "https://wa.me/?text="+encodeURIComponent(msg);
  window.open(url, "_blank");
}

// ===================== INIT =====================
function initApp(){
  renderHome();
  showTab("home");
}
initApp();

// PWA install
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  });
}
