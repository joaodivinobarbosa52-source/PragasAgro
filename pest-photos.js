// Fotos de referência do Manual de identificação de insetos e outros invertebrados
// da cultura da soja (Embrapa, Documentos 269, 3ª ed., 2014) — uso educacional/técnico.
// Mapeia id da praga -> lista de fotos locais (dentro do próprio app, funciona offline).

const REFERENCE_PHOTOS = {
  "acaro-branco": ["assets/pragas/acaro-branco/1.png", "assets/pragas/acaro-branco/2.png"],
  "acaro-rajado": ["assets/pragas/acaro-rajado/1.png", "assets/pragas/acaro-rajado/2.png", "assets/pragas/acaro-rajado/3.png"],
  "acaro-verde": ["assets/pragas/acaro-verde/1.png", "assets/pragas/acaro-verde/2.png", "assets/pragas/acaro-verde/3.png"],
  "acaros-vermelhos": ["assets/pragas/acaros-vermelhos/1.png", "assets/pragas/acaros-vermelhos/2.png", "assets/pragas/acaros-vermelhos/3.png", "assets/pragas/acaros-vermelhos/4.png", "assets/pragas/acaros-vermelhos/5.png"],
  "bicudo-negro-pequeno": ["assets/pragas/bicudo-negro-pequeno/1.png", "assets/pragas/bicudo-negro-pequeno/2.png"],
  "bicudo-soja": ["assets/pragas/bicudo-soja/1.png", "assets/pragas/bicudo-soja/2.png", "assets/pragas/bicudo-soja/3.png", "assets/pragas/bicudo-soja/4.png"],
  "broca-axilas": ["assets/pragas/broca-axilas/1.png", "assets/pragas/broca-axilas/2.png", "assets/pragas/broca-axilas/3.png"],
  "broca-vagem": ["assets/pragas/broca-vagem/1.png", "assets/pragas/broca-vagem/2.png", "assets/pragas/broca-vagem/3.png"],
  "bufalo-soja": ["assets/pragas/bufalo-soja/1.png", "assets/pragas/bufalo-soja/2.png", "assets/pragas/bufalo-soja/3.png"],
  "cascudinho": ["assets/pragas/cascudinho/1.png", "assets/pragas/cascudinho/2.png", "assets/pragas/cascudinho/3.png"],
  "cochonilha-raiz": ["assets/pragas/cochonilha-raiz/1.png", "assets/pragas/cochonilha-raiz/2.png"],
  "coro-soja": ["assets/pragas/coro-soja/1.png", "assets/pragas/coro-soja/2.png", "assets/pragas/coro-soja/3.png", "assets/pragas/coro-soja/4.png", "assets/pragas/coro-soja/5.png", "assets/pragas/coro-soja/6.png"],
  "falsa-medideira-rachiplusia": ["assets/pragas/falsa-medideira-rachiplusia/1.png", "assets/pragas/falsa-medideira-rachiplusia/2.png"],
  "idi-amin": ["assets/pragas/idi-amin/1.png", "assets/pragas/idi-amin/2.png", "assets/pragas/idi-amin/3.png"],
  "lagarta-cartucho-soja": ["assets/pragas/lagarta-cartucho-soja/1.png", "assets/pragas/lagarta-cartucho-soja/2.png", "assets/pragas/lagarta-cartucho-soja/3.png"],
  "lagarta-desfolhadora": ["assets/pragas/lagarta-desfolhadora/1.png", "assets/pragas/lagarta-desfolhadora/2.png", "assets/pragas/lagarta-desfolhadora/3.png", "assets/pragas/lagarta-desfolhadora/4.png", "assets/pragas/lagarta-desfolhadora/5.png", "assets/pragas/lagarta-desfolhadora/6.png", "assets/pragas/lagarta-desfolhadora/7.png"],
  "lagarta-enroladeira": ["assets/pragas/lagarta-enroladeira/1.png", "assets/pragas/lagarta-enroladeira/2.png", "assets/pragas/lagarta-enroladeira/3.png"],
  "lagarta-maca-algodoeiro": ["assets/pragas/lagarta-maca-algodoeiro/1.png", "assets/pragas/lagarta-maca-algodoeiro/2.png"],
  "lagarta-maruca": ["assets/pragas/lagarta-maruca/1.png", "assets/pragas/lagarta-maruca/2.png"],
  "lagarta-vagens-albula": ["assets/pragas/lagarta-vagens-albula/1.png", "assets/pragas/lagarta-vagens-albula/2.png", "assets/pragas/lagarta-vagens-albula/3.png", "assets/pragas/lagarta-vagens-albula/4.png"],
  "lagarta-vagens-cosmioides": ["assets/pragas/lagarta-vagens-cosmioides/1.png", "assets/pragas/lagarta-vagens-cosmioides/2.png", "assets/pragas/lagarta-vagens-cosmioides/3.png"],
  "lagarta-vagens-eridania-soja": ["assets/pragas/lagarta-vagens-eridania-soja/1.png", "assets/pragas/lagarta-vagens-eridania-soja/2.png", "assets/pragas/lagarta-vagens-eridania-soja/3.png"],
  "lagarta-velho-mundo": ["assets/pragas/lagarta-velho-mundo/1.png", "assets/pragas/lagarta-velho-mundo/2.png", "assets/pragas/lagarta-velho-mundo/3.png", "assets/pragas/lagarta-velho-mundo/4.png", "assets/pragas/lagarta-velho-mundo/5.png", "assets/pragas/lagarta-velho-mundo/6.png"],
  "larva-angora": ["assets/pragas/larva-angora/1.png", "assets/pragas/larva-angora/2.png", "assets/pragas/larva-angora/3.png", "assets/pragas/larva-angora/4.png"],
  "percevejo-acrosterno": ["assets/pragas/percevejo-acrosterno/1.png", "assets/pragas/percevejo-acrosterno/2.png", "assets/pragas/percevejo-acrosterno/3.png", "assets/pragas/percevejo-acrosterno/4.png"],
  "percevejo-barriga-verde-soja": ["assets/pragas/percevejo-barriga-verde-soja/1.png", "assets/pragas/percevejo-barriga-verde-soja/2.png", "assets/pragas/percevejo-barriga-verde-soja/3.png"],
  "percevejo-castanho-raiz": ["assets/pragas/percevejo-castanho-raiz/1.png", "assets/pragas/percevejo-castanho-raiz/2.png", "assets/pragas/percevejo-castanho-raiz/3.png", "assets/pragas/percevejo-castanho-raiz/4.png", "assets/pragas/percevejo-castanho-raiz/5.png"],
  "percevejo-edessa": ["assets/pragas/percevejo-edessa/1.png", "assets/pragas/percevejo-edessa/2.png", "assets/pragas/percevejo-edessa/3.png"],
  "percevejo-faixa-vermelha": ["assets/pragas/percevejo-faixa-vermelha/1.png", "assets/pragas/percevejo-faixa-vermelha/2.png", "assets/pragas/percevejo-faixa-vermelha/3.png", "assets/pragas/percevejo-faixa-vermelha/4.png"],
  "percevejo-formigao": ["assets/pragas/percevejo-formigao/1.png", "assets/pragas/percevejo-formigao/2.png", "assets/pragas/percevejo-formigao/3.png", "assets/pragas/percevejo-formigao/4.png"],
  "percevejo-marrom": ["assets/pragas/percevejo-marrom/1.png", "assets/pragas/percevejo-marrom/2.png", "assets/pragas/percevejo-marrom/3.png"],
  "percevejo-verde": ["assets/pragas/percevejo-verde/1.png", "assets/pragas/percevejo-verde/2.png", "assets/pragas/percevejo-verde/3.png"],
  "percevejo-verde-pequeno": ["assets/pragas/percevejo-verde-pequeno/1.png", "assets/pragas/percevejo-verde-pequeno/2.png", "assets/pragas/percevejo-verde-pequeno/3.png", "assets/pragas/percevejo-verde-pequeno/4.png"],
  "tripes-soja": ["assets/pragas/tripes-soja/1.png", "assets/pragas/tripes-soja/2.png", "assets/pragas/tripes-soja/3.png"],
  "vaquinha-cerotoma": ["assets/pragas/vaquinha-cerotoma/1.png", "assets/pragas/vaquinha-cerotoma/2.png", "assets/pragas/vaquinha-cerotoma/3.png"],
  "vaquinha-colaspis": ["assets/pragas/vaquinha-colaspis/1.png"],
  "vaquinha-patriota": ["assets/pragas/vaquinha-patriota/1.png", "assets/pragas/vaquinha-patriota/2.png"],
};

function getReferencePhotos(pestId){
  return REFERENCE_PHOTOS[pestId] || [];
}
