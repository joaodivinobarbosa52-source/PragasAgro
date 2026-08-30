// ===================== ILUSTRAÇÕES DE REFERÊNCIA =====================
// Desenhos vetoriais simples para reconhecimento rápido no campo.
// NÃO são fotos reais — servem de apoio visual até você registrar uma foto
// própria (veja "Adicionar foto real" no Guia de Pragas).

function _pi_wrap(inner, bg){
  return `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
    <rect width="64" height="64" rx="12" fill="${bg||'#181c14'}"/>
    ${inner}
  </svg>`;
}

function _pi_caterpillar(color, headColor, mark){
  return `<g>
    <ellipse cx="16" cy="44" rx="6.5" ry="5.5" fill="${color}"/>
    <ellipse cx="24" cy="39" rx="7" ry="6" fill="${color}"/>
    <ellipse cx="33" cy="34" rx="7.5" ry="6.5" fill="${color}"/>
    <ellipse cx="42" cy="31" rx="7" ry="6" fill="${color}"/>
    <ellipse cx="50" cy="29" rx="6" ry="5.5" fill="${color}"/>
    <circle cx="55" cy="25" r="6" fill="${headColor}"/>
    ${mark||""}
  </g>`;
}

function _pi_shield(color, accent){
  return `<g>
    <path d="M32 11 C19 11 13 20 13 31 C13 44 21 53 32 53 C43 53 51 44 51 31 C51 20 45 11 32 11 Z" fill="${color}"/>
    <path d="M32 11 C27 15 27 24 32 27 C37 24 37 15 32 11 Z" fill="rgba(0,0,0,.18)"/>
    ${accent||""}
  </g>`;
}

function _pi_grub(color, headColor){
  return `<g>
    <path d="M42 15 C56 16 55 34 43 42 C34 48 22 45 19 35 C16 27 21 19 29 19" stroke="${color}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <circle cx="40" cy="17" r="5.5" fill="${headColor}"/>
  </g>`;
}

const _Y_MARK = `<path d="M52 20 L55 25 L55 20 M55 25 L58 20" stroke="#f2d94e" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;

const PEST_ICONS = {
  // ---- SOJA ----
  "lagarta-desfolhadora": _pi_wrap(_pi_caterpillar("#7fa050", "#3f5b2a")),
  "percevejo-marrom": _pi_wrap(_pi_shield("#8a5a34")),
  "percevejo-verde-pequeno": _pi_wrap(_pi_shield("#6b9a4f", `<rect x="25" y="9" width="14" height="4" rx="2" fill="#d98e3e"/>`)),
  "percevejo-verde": _pi_wrap(_pi_shield("#7fae54")),
  "acaro-rajado": _pi_wrap(`
    <path d="M12 40 C12 22 22 12 32 12 C42 12 52 22 52 40 C52 48 44 52 32 52 C20 52 12 48 12 40 Z" fill="#5f7a42"/>
    <circle cx="22" cy="30" r="2.4" fill="#c99a3e"/>
    <circle cx="30" cy="24" r="2.4" fill="#c99a3e"/>
    <circle cx="38" cy="30" r="2.4" fill="#c99a3e"/>
    <circle cx="26" cy="38" r="2.4" fill="#c99a3e"/>
    <circle cx="34" cy="40" r="2.4" fill="#c99a3e"/>
    <circle cx="42" cy="36" r="2.4" fill="#c99a3e"/>
  `),
  "mosca-branca": _pi_wrap(`
    <path d="M10 42 C10 22 22 12 32 12 C42 12 54 22 54 42 C54 50 44 54 32 54 C20 54 10 50 10 42 Z" fill="#5f7a42"/>
    <g fill="#eef0e6">
      <path d="M22 28 L28 24 L28 32 Z"/>
      <path d="M32 22 L38 18 L38 26 Z"/>
      <path d="M40 30 L46 26 L46 34 Z"/>
    </g>
  `),
  "lagarta-cartucho-soja": _pi_wrap(_pi_caterpillar("#8a7a3e", "#2e2a1a", _Y_MARK)),
  "coro-soja": _pi_wrap(_pi_grub("#e9e4d0", "#6b4a2a"), "#241c12"),

  // ---- MILHO ----
  "lagarta-cartucho-milho": _pi_wrap(_pi_caterpillar("#8a7a3e", "#2e2a1a", _Y_MARK)),
  "cigarrinha-milho": _pi_wrap(`
    <path d="M10 34 C10 26 20 18 34 18 C46 18 54 24 54 32 C54 38 46 42 34 42 C20 42 10 40 10 34 Z" fill="#c9b877"/>
    <path d="M40 20 C46 20 52 24 54 30" stroke="#4a4326" stroke-width="3" fill="none" stroke-linecap="round"/>
    <line x1="20" y1="40" x2="16" y2="48" stroke="#4a4326" stroke-width="2.4" stroke-linecap="round"/>
    <line x1="28" y1="41" x2="26" y2="49" stroke="#4a4326" stroke-width="2.4" stroke-linecap="round"/>
  `),
  "percevejo-barriga-verde": _pi_wrap(_pi_shield("#5f8a45", `<ellipse cx="32" cy="38" rx="10" ry="11" fill="rgba(200,230,180,.35)"/>`)),
  "elasmo": _pi_wrap(`
    <line x1="32" y1="52" x2="32" y2="30" stroke="#4a6b32" stroke-width="3"/>
    <path d="M32 40 C24 36 20 28 22 20" stroke="#5f8a45" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M32 38 C40 34 44 26 42 18" stroke="#5f8a45" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M32 30 C31 22 33 14 30 8" stroke="#8a6a3e" stroke-width="4" fill="none" stroke-linecap="round"/>
  `),
  "broca-colmo": _pi_wrap(`
    <rect x="26" y="8" width="12" height="48" rx="4" fill="#b3925a"/>
    <circle cx="32" cy="32" r="6" fill="#241c12"/>
    <circle cx="20" cy="24" r="1.6" fill="#8a6a3e"/>
    <circle cx="44" cy="40" r="1.6" fill="#8a6a3e"/>
    <circle cx="18" cy="44" r="1.6" fill="#8a6a3e"/>
  `),
  "pulgao-milho": _pi_wrap(`
    <line x1="32" y1="54" x2="32" y2="10" stroke="#8a9a5a" stroke-width="3"/>
    <circle cx="26" cy="20" r="4" fill="#7fa8a0"/>
    <circle cx="34" cy="16" r="4" fill="#7fa8a0"/>
    <circle cx="38" cy="24" r="4" fill="#7fa8a0"/>
    <circle cx="28" cy="28" r="4" fill="#7fa8a0"/>
    <circle cx="36" cy="32" r="4" fill="#7fa8a0"/>
  `),
  "coro-milho": _pi_wrap(_pi_grub("#e9e4d0", "#6b4a2a")),
  "spodoptera-eridania": _pi_wrap(_pi_caterpillar("#6b7a4a", "#2a2a1a")),
};

function getDefaultPestIcon(pestId){
  return PEST_ICONS[pestId] || _pi_wrap(`<circle cx="32" cy="32" r="18" fill="#4a5a3a"/>`);
}
