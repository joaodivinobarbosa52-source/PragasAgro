// Banco de pragas — valores de nível de controle (NC) são referências gerais
// consolidadas de literatura agronômica (Embrapa e manuais técnicos de MIP).
// AJUSTE conforme a recomendação do seu agrônomo/cooperativa e o estádio real da lavoura.
// unidade: como a contagem é registrada no campo
// nc: nível de controle (valor numérico de referência na unidade indicada)

const ESTADIOS = {
  soja: ["V1-V4 (vegetativo inicial)","V5-Vn (vegetativo pleno)","R1-R2 (floração)","R3-R4 (formação de vagem)","R5 (enchimento de grão)","R6-R8 (maturação)"],
  milho: ["VE-V3 (emergência)","V4-V8 (vegetativo inicial)","V9-VT (vegetativo pleno/pré-pendoamento)","R1 (florescimento)","R2-R4 (grão leitoso/pastoso)","R5-R6 (maturação)"]
};

const PESTS_DB = {
  soja: [
    {
      id: "lagarta-desfolhadora",
      nome: "Lagartas desfolhadoras (Anticarsia gemmatalis / Chrysodeixis includens)",
      apelido: "Lagarta-da-soja / falsa-medideira",
      categoria: "Lagarta",
      unidade: "lagartas ≥1,5cm por pano-de-batida (2 fileiras)",
      nc: 20,
      ncNota: "reduzir para ~10 em cultivares de ciclo curto ou lavoura estressada",
      identificacao: "Lagartas verdes a esverdeadas, medem o corpo em arco ao se locomover (falsa-medideira) ou se enrolam quando tocadas (Anticarsia). Desfolha característica em rendilhado.",
      recomendacao: "Controle quando atingir o nível — priorizar produtos seletivos a inimigos naturais. Reavaliar 3-5 dias após aplicação."
    },
    {
      id: "percevejo-marrom",
      nome: "Percevejo-marrom (Euschistus heros)",
      apelido: "Percevejo-marrom",
      categoria: "Percevejo",
      unidade: "percevejos ≥0,5cm por pano-de-batida",
      nc: 2,
      ncNota: "reduzir para 1/pano em lavoura de produção de sementes",
      identificacao: "Corpo marrom-escuro, formato de escudo. Ataca vagens e grãos, causando grãos chochos e manchados.",
      recomendacao: "Controlar a partir do início da formação de vagens (R3). Amostrar preferencialmente cedo pela manhã."
    },
    {
      id: "percevejo-verde-pequeno",
      nome: "Percevejo-verde-pequeno (Piezodorus guildinii)",
      apelido: "Percevejo-verde-pequeno",
      categoria: "Percevejo",
      unidade: "percevejos por pano-de-batida",
      nc: 1,
      ncNota: "mais agressivo e eficiente na sucção de grãos que os demais percevejos",
      identificacao: "Menor que o percevejo-marrom, coloração verde com faixa alaranjada nas antenas.",
      recomendacao: "Nível de controle mais baixo por sua alta eficiência de dano — priorizar monitoramento em R3-R6."
    },
    {
      id: "percevejo-verde",
      nome: "Percevejo-verde (Nezara viridula / Chinavia spp.)",
      apelido: "Percevejo-verde",
      categoria: "Percevejo",
      unidade: "percevejos por pano-de-batida",
      nc: 2,
      identificacao: "Corpo verde uniforme, maior que o percevejo-marrom.",
      recomendacao: "Somar à contagem de percevejo-marrom para o nível de controle conjunto de percevejos."
    },
    {
      id: "acaro-rajado",
      nome: "Ácaro-rajado (Tetranychus urticae)",
      apelido: "Ácaro",
      categoria: "Ácaro",
      unidade: "% de folíolos com colônias/bronzeamento",
      nc: 30,
      identificacao: "Pontuações amarelo-bronzeadas nas folhas, colônias na face inferior; favorecido por período seco.",
      recomendacao: "Focar bordaduras e áreas de reboleira, geralmente o foco inicial de infestação."
    },
    {
      id: "mosca-branca",
      nome: "Mosca-branca (Bemisia tabaci)",
      apelido: "Mosca-branca",
      categoria: "Sugador",
      unidade: "adultos por trifólio (3º trifólio)",
      nc: 4,
      identificacao: "Pequenos insetos brancos que voam ao balançar a planta; ninfas fixas na face inferior das folhas.",
      recomendacao: "Também é vetor de viroses — monitorar mesmo abaixo do nível se houver plantas com sintomas de mosaico."
    },
    {
      id: "lagarta-cartucho-soja",
      nome: "Lagarta-do-cartucho (Spodoptera frugiperda) em soja",
      apelido: "Spodoptera",
      categoria: "Lagarta",
      unidade: "lagartas por pano-de-batida",
      nc: 20,
      identificacao: "Lagarta com Y invertido na cabeça, mais tolerante a inseticidas que as desfolhadoras típicas de soja.",
      recomendacao: "Ocorrência crescente em áreas de rotação com milho — considerar produtos específicos."
    },
    {
      id: "coro-soja",
      nome: "Coró / larva-arame (complexo de solo)",
      apelido: "Coró",
      categoria: "Praga de solo",
      unidade: "% de covas com falha/planta murcha",
      nc: 8,
      identificacao: "Dano observado como falhas de estande, plantas amareladas/murchas isoladas, raízes roídas.",
      recomendacao: "Avaliação de estande é retroativa — decisão de controle é preventiva (tratamento de sementes) para o próximo plantio."
    }
  ],
  milho: [
    {
      id: "lagarta-cartucho-milho",
      nome: "Lagarta-do-cartucho (Spodoptera frugiperda)",
      apelido: "Spodoptera",
      categoria: "Lagarta",
      unidade: "% de plantas com dano fresco no cartucho",
      nc: 20,
      identificacao: "Furos alinhados nas folhas novas, serragem (excrementos) visível no cartucho, lagarta com Y invertido na cabeça.",
      recomendacao: "Praga-chave do milho — controlar cedo (V2-V6) evita perdas maiores; reavaliar após pendoamento."
    },
    {
      id: "cigarrinha-milho",
      nome: "Cigarrinha-do-milho (Dalbulus maidis)",
      apelido: "Cigarrinha",
      categoria: "Vetor / Sugador",
      unidade: "cigarrinhas por planta (rede entomológica ou visual)",
      nc: 1,
      ncNota: "nível baixo porque é vetora dos enfezamentos (molicutes) — dano indireto é o principal risco",
      identificacao: "Pequena, cor palha com faixas escuras na cabeça, salta ao se aproximar da planta.",
      recomendacao: "Monitorar desde a emergência; em regiões de alta pressão, tratamento de sementes + monitoramento contínuo é essencial."
    },
    {
      id: "percevejo-barriga-verde",
      nome: "Percevejo-barriga-verde (Dichelops spp.)",
      apelido: "Barriga-verde",
      categoria: "Percevejo",
      unidade: "% de plantas com sintoma de \"folha rasgada\"/perfilhamento anormal",
      nc: 10,
      identificacao: "Ataca plântulas recém-emergidas, causando folhas com furos em roseta e perfilhamento excessivo.",
      recomendacao: "Crítico em plantio direto sobre soja — monitorar do plantio até V4."
    },
    {
      id: "elasmo",
      nome: "Lagarta-elasmo / broca-do-colmo inicial (Elasmopalpus lignosellus)",
      apelido: "Elasmo",
      categoria: "Lagarta",
      unidade: "% de plantas com \"coração morto\"",
      nc: 5,
      identificacao: "Planta jovem com a folha central seca e destacável (coração morto), lagarta dentro do colmo próximo ao solo.",
      recomendacao: "Mais crítico em solos arenosos e após veranicos — atacar cedo, plantas maiores toleram melhor."
    },
    {
      id: "broca-colmo",
      nome: "Broca-da-cana-do-milho (Diatraea saccharalis)",
      apelido: "Broca-do-colmo",
      categoria: "Lagarta",
      unidade: "% de colmos com galeria/broqueamento",
      nc: 10,
      identificacao: "Furos circulares no colmo com serragem, colmo quebradiço, galerias internas.",
      recomendacao: "Difícil controle curativo — foco em monitoramento para decisões na próxima safra (Bt, manejo de restos culturais)."
    },
    {
      id: "pulgao-milho",
      nome: "Pulgão-do-milho (Rhopalosiphum maidis)",
      apelido: "Pulgão",
      categoria: "Sugador",
      unidade: "% de plantas com colônias no cartucho/pendão",
      nc: 20,
      identificacao: "Colônias verde-azuladas concentradas no cartucho ou base do pendão, produzem substância açucarada (fumagina).",
      recomendacao: "Maior risco antes do pendoamento (VT) — colônias grandes podem prejudicar a exteriorização do pendão."
    },
    {
      id: "coro-milho",
      nome: "Coró (larvas de Phyllophaga/Diloboderus)",
      apelido: "Coró",
      categoria: "Praga de solo",
      unidade: "larvas por m² ou % de covas falhadas",
      nc: 2,
      identificacao: "Larvas curvas em \"C\", esbranquiçadas com cabeça marrom, no solo próximo às raízes; plantas tombadas ou com raiz podada.",
      recomendacao: "Decisão de controle é preventiva (tratamento de sementes/sulco) para o próximo plantio."
    },
    {
      id: "spodoptera-eridania",
      nome: "Lagarta-das-vagens / Spodoptera eridania",
      apelido: "S. eridania",
      categoria: "Lagarta",
      unidade: "lagartas por pano-de-batida ou % de plantas atacadas",
      nc: 15,
      identificacao: "Coloração variável (verde a marrom-escura), ataca folhas e pode atingir espigas em infestações altas.",
      recomendacao: "Ocorrência crescente em algumas regiões — monitorar junto com S. frugiperda."
    }
  ]
};

function getPestById(cultura, id){
  return (PESTS_DB[cultura]||[]).find(p=>p.id===id);
}
