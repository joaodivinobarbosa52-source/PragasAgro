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
  // Identificação/biologia revisada e ampliada com base no Manual de identificação de
  // insetos e outros invertebrados da cultura da soja (Embrapa, Documentos 269, 3ª ed., 2014).
  // Textos reescritos/resumidos a partir do manual — não são cópia literal.
  soja: [
    {
      id: "lagarta-desfolhadora",
      nome: "Lagartas desfolhadoras (Anticarsia gemmatalis / Chrysodeixis includens)",
      apelido: "Lagarta-da-soja / falsa-medideira",
      categoria: "Lagarta",
      unidade: "lagartas ≥1,5cm por pano-de-batida (2 fileiras)",
      nc: 20,
      ncNota: "reduzir para ~10 em cultivares de ciclo curto ou lavoura estressada",
      identificacao: "A. gemmatalis: lagarta verde com listras brancas no dorso, move-se em arco (mede palmos); consumo foliar dispara do 4º ao 6º ínstar. C. includens: verde-clara com listras brancas, também mede palmos, mandíbula com dois dentes internos (diferencia de Rachiplusia nu); é a mais difícil de controlar das duas e já há relatos de resistência a inseticidas.",
      recomendacao: "Controle quando atingir o nível — priorizar produtos seletivos a inimigos naturais. C. includens exige atenção redobrada por seu histórico de resistência. Reavaliar 3-5 dias após aplicação.",
      // Estágios registráveis no pano-de-batida. Só "grande" entra no NC (metodologia
      // padrão já conta apenas lagartas ≥1,5cm); os demais são registrados para dar
      // contexto de pressão futura (postura/adultos) e de mortalidade natural (pequenas/pupas).
      estagios: [
        { id:"postura", label:"Postura (ovos)", unidadeCurta:"posturas", contaNC:false },
        { id:"peq", label:"Lagarta pequena (<1,5cm)", unidadeCurta:"lag. peq.", contaNC:false },
        { id:"grande", label:"Lagarta grande (≥1,5cm)", unidadeCurta:"lag. gr.", contaNC:true },
        { id:"pupa", label:"Pupa", unidadeCurta:"pupas", contaNC:false },
        { id:"adulto", label:"Adulto (mariposa)", unidadeCurta:"adultos", contaNC:false }
      ]
    },
    {
      id: "falsa-medideira-rachiplusia",
      nome: "Falsa-medideira-do-sul (Rachiplusia nu)",
      apelido: "Falsa-medideira-Sul",
      categoria: "Lagarta",
      unidade: "lagartas ≥1,5cm por pano-de-batida",
      nc: 20,
      identificacao: "Muito parecida com C. includens (mesmo padrão de desfolha rendilhada), porém a face interna da mandíbula é lisa, sem dentes, e a mancha do primeiro par de asas do adulto é menos prateada. Mais comum no Sul do Brasil, Uruguai e Argentina.",
      recomendacao: "Tratar junto com as demais desfolhadoras usando o mesmo nível de controle; a diferenciação de espécie importa mais para monitoramento de resistência.",
      estagios: [
        { id:"postura", label:"Postura (ovos)", unidadeCurta:"posturas", contaNC:false },
        { id:"peq", label:"Lagarta pequena (<1,5cm)", unidadeCurta:"lag. peq.", contaNC:false },
        { id:"grande", label:"Lagarta grande (≥1,5cm)", unidadeCurta:"lag. gr.", contaNC:true },
        { id:"pupa", label:"Pupa", unidadeCurta:"pupas", contaNC:false },
        { id:"adulto", label:"Adulto (borboleta)", unidadeCurta:"adultos", contaNC:false }
      ]
    },
    {
      id: "lagarta-enroladeira",
      nome: "Lagarta-enroladeira (Omiodes indicata)",
      apelido: "Enroladeira",
      categoria: "Lagarta",
      unidade: "% de folíolos enrolados/pano-de-batida",
      nc: null,
      ncNota: "sem NC padronizado no manual — dano geralmente concentra-se no fim de ciclo, quando a perda foliar já não afeta a produtividade",
      identificacao: "Lagarta verde-escura de aspecto oleoso (12-15mm) que une ou enrola os folíolos com fios de seda, criando um abrigo onde se alimenta do parênquima foliar.",
      recomendacao: "Raramente justifica controle isolado; avaliar em conjunto com outras desfolhadoras antes de R5."
    },
    {
      id: "lagarta-maruca",
      nome: "Lagarta-maruca (Maruca vitrata)",
      apelido: "Maruca",
      categoria: "Lagarta",
      unidade: "% de hastes/vagens broqueadas",
      nc: null,
      ncNota: "ocorrência esporádica — sem NC consolidado",
      identificacao: "Lagarta com pontuações escuras, até 20mm. Hábito parecido com o da broca-das-axilas, mas no período reprodutivo broqueia vagens e pode danificar inflorescências; dano em hastes é de difícil percepção.",
      recomendacao: "Monitorar hastes quebradiças e vagens broqueadas; controle pontual, pois a ocorrência costuma ser esporádica."
    },
    {
      id: "broca-axilas",
      nome: "Broca-das-axilas (Crocidosema aporema)",
      apelido: "Broca-das-axilas",
      categoria: "Lagarta",
      unidade: "% de brotos terminais atacados",
      nc: null,
      ncNota: "mais intensa em regiões de clima temperado",
      identificacao: "Lagarta bege a amarelada com cabeça marrom (até ~10mm) que forma um cartucho unindo folíolos dos brotos terminais com seda e depois abre uma galeria descendente na haste.",
      recomendacao: "Monitorar brotação terminal em plântulas/V-inicial; ataque severo pode causar morte da planta ou desenvolvimento anormal."
    },
    {
      id: "bicudo-soja",
      nome: "Tamanduá-da-soja / bicudo-da-soja (Sternechus subsignatus)",
      apelido: "Tamanduá-da-soja",
      categoria: "Besouro",
      unidade: "% de plantas com galha caulinar",
      nc: null,
      ncNota: "dano é irreversível onde ocorre — foco em monitoramento e rotação/manejo preventivo",
      identificacao: "Adulto preto com listras amarelas de escamas; a fêmea faz um anel na haste principal (V3-Vn) e a larva broqueia formando uma galha caulinar quebradiça. Pode ser confundido com dano de elasmo ou de outros percevejos que anelam a haste.",
      recomendacao: "Praga de difícil controle curativo — priorizar monitoramento de hastes ocas/quebradiças e decisões de manejo para a safra seguinte."
    },
    {
      id: "cascudinho",
      nome: "Cascudinho (Myochrous armatus)",
      apelido: "Cascudinho",
      categoria: "Besouro",
      unidade: "% de plântulas com pecíolo murcho",
      nc: null,
      identificacao: "Besouro cinza a acinzentado (~5mm), tórax com margem serrilhada. Ataca pecíolos de plântulas causando murcha dos folíolos; danos sérios são raros, mas em plântula recém-emergida pode matar a planta.",
      recomendacao: "Atenção redobrada na fase de plântula; plantas mais desenvolvidas toleram bem o ataque."
    },
    {
      id: "bufalo-soja",
      nome: "Búfalo-da-soja (Ceresa brunnicornis e C. fasciatithorax)",
      apelido: "Búfalo-da-soja",
      categoria: "Sugador",
      unidade: "presença por planta (monitoramento visual)",
      nc: null,
      identificacao: "Ninfa com espinhos dorsais, aspecto bizarro; adulto marrom a verde-acinzentado, formato triangular com dois espinhos torácicos, salta e voa curto. Oviposição endofítica causa depressão anelar na haste, ramos e pecíolos, favorecendo quebra.",
      recomendacao: "Dano pode ser confundido com bicudo-da-soja ou elasmo — confirmar antes de decidir controle."
    },
    {
      id: "vaquinha-patriota",
      nome: "Vaquinha-verde ou patriota (Diabrotica speciosa)",
      apelido: "Patriota",
      categoria: "Besouro",
      unidade: "adultos por pano-de-batida",
      nc: null,
      ncNota: "manual indica que controle geralmente não é necessário — larva se alimenta de raízes com pouco dano prático",
      identificacao: "Adulto verde com 2 manchas amareladas por asa e cabeça avermelhada (5-6mm); larva amarelo-pálida com cabeça e pernas pretas, desenvolve-se no solo. Adultos fazem pequenos furos nas folhas mais tenras, com baixa capacidade de desfolha.",
      recomendacao: "Raramente atinge nível de dano em soja — priorizar monitoramento de outras desfolhadoras."
    },
    {
      id: "vaquinha-cerotoma",
      nome: "Vaquinha (Cerotoma arcuata)",
      apelido: "Vaquinha-Cerotoma",
      categoria: "Besouro",
      unidade: "adultos por pano-de-batida",
      nc: null,
      identificacao: "Besouro bege (~5mm) com 4 manchas marrom-escuras por asa, parecido em formato com a vaquinha-patriota. Larvas se alimentam de nódulos de Bradyrhizobium, reduzindo a fixação de nitrogênio da planta.",
      recomendacao: "O dano indireto (fixação de N) pode ser mais relevante que a desfolha do adulto — observar vigor/cor da lavoura em infestações altas."
    },
    {
      id: "vaquinha-colaspis",
      nome: "Vaquinha (Colaspis sp.)",
      apelido: "Vaquinha-Colaspis",
      categoria: "Besouro",
      unidade: "adultos por pano-de-batida",
      nc: null,
      ncNota: "comum em MS e PR, mas raramente atinge nível de dano",
      identificacao: "Adulto verde-metálico (~5mm) com sulcos e pontuações nas asas; larva branco-acinzentada (até 7mm). Causa pequeno desfolhamento que em geral não compromete a produção.",
      recomendacao: "Monitorar sem prioridade de controle isolado, salvo infestação incomum."
    },
    {
      id: "tripes-soja",
      nome: "Tripes (Caliothrips braziliensis e Frankliniella schultzei)",
      apelido: "Tripes",
      categoria: "Sugador",
      unidade: "% de folíolos novos com tripes/dano",
      nc: null,
      ncNota: "dano direto é pequeno — risco principal é indireto (vírus)",
      identificacao: "Insetos minúsculos (~2mm), coloração branca a preta, abrigam-se em folíolos novos ainda fechados. F. schultzei se reproduz por partenogênese.",
      recomendacao: "O dano direto raramente reduz produtividade, mas F. schultzei é vetor do vírus da queima-do-broto — priorizar monitoramento em áreas com histórico da doença."
    },
    {
      id: "acaro-verde",
      nome: "Ácaro-verde-da-soja (Mononychellus planki)",
      apelido: "Ácaro-verde",
      categoria: "Ácaro",
      unidade: "% de folíolos com pontuações/bronzeamento",
      nc: null,
      identificacao: "Menos agressivo que o ácaro-rajado; ninfas e adultos verde-claro a amarelo-ouro. Causa pontuações cinza-claras que evoluem para coloração acinzentada na folha, distribuídas de forma relativamente uniforme na lavoura.",
      recomendacao: "Surtos favorecidos por estiagem e por fungicidas/inseticidas piretroides aplicados desde a fase vegetativa — reforçar monitoramento nessas condições."
    },
    {
      id: "acaros-vermelhos",
      nome: "Ácaros-vermelhos (Tetranychus ludeni, T. desertorum e T. gigas)",
      apelido: "Ácaro-vermelho",
      categoria: "Ácaro",
      unidade: "% de folíolos com colônias",
      nc: null,
      identificacao: "Semelhantes ao ácaro-rajado em biologia e potencial de dano, mas com coloração vermelho-carmim (fêmeas) a vermelho-alaranjado (machos); ninfas vermelho-claro.",
      recomendacao: "Tratar com o mesmo critério do ácaro-rajado — costumam ocorrer associados a ele."
    },
    {
      id: "acaro-branco",
      nome: "Ácaro-branco (Polyphagotarsonemus latus)",
      apelido: "Ácaro-branco",
      categoria: "Ácaro",
      unidade: "% de brotos novos com deformação",
      nc: null,
      identificacao: "Minúsculo, difícil de ver a olho nu; ataca brotos novos causando enrugamento simétrico das folhas e aspecto bronzeado em hastes e vagens jovens. Confirmação exige lupa de 40x.",
      recomendacao: "Ataque precoce em brotação pode comprometer bastante o porte da planta — inspecionar reboleiras com lupa quando houver suspeita."
    },
    {
      id: "percevejo-castanho-raiz",
      nome: "Percevejo-castanho-da-raiz (Scaptocoris castanea, S. carvalhoi e S. buckupi)",
      apelido: "Percevejo-castanho",
      categoria: "Praga de solo",
      unidade: "percevejos por m de fileira (escavação)",
      nc: 25,
      ncNota: "manual cita perdas de rendimento a partir de 25-40 indivíduos/m de fileira no Cerrado, variando com a fertilidade do solo; hábito críptico torna o controle difícil",
      identificacao: "Percevejo subterrâneo de cor amarelada, odor forte e característico, alta mobilidade vertical no solo (chega a 1,2-1,5m de profundidade). Ataca a raiz da plântula até a colheita.",
      recomendacao: "Como é críptico, o monitoramento por escavação e o histórico de reboleiras da área são mais úteis que a inspeção da parte aérea."
    },
    {
      id: "cochonilha-raiz",
      nome: "Cochonilha-da-raiz (Dysmicoccus brevipes)",
      apelido: "Cochonilha-farinhosa",
      categoria: "Praga de solo",
      unidade: "presença em reboleiras (monitoramento visual de raízes)",
      nc: null,
      identificacao: "Cochonilha farinhosa/pulverulenta com filamentos serosos laterais; vive nas raízes e eventualmente sobe à parte aérea. Causa atraso de desenvolvimento e reboleiras de plantas menores.",
      recomendacao: "Investigar reboleiras persistentes de plantas menores mesmo sem sintoma foliar evidente."
    },
    {
      id: "coro-soja",
      nome: "Coró (Phyllophaga cuyabana, Liogenys spp., Plectris pexa e outros)",
      apelido: "Coró",
      categoria: "Praga de solo",
      unidade: "% de covas com falha/planta murcha",
      nc: 8,
      identificacao: "Larvas curvas, cabeça marrom-avermelhada, alimentam-se de raízes causando reboleiras de plantas amareladas/murchas — mais grave quando o ataque ocorre na fase inicial. Nem todo coró é praga: espécies que 'andam de costas' e não comem raízes vivas são benéficas.",
      recomendacao: "Avaliação de estande é retroativa — decisão de controle é preventiva (tratamento de sementes) para o próximo plantio. Confirmar a espécie antes de tratar, pois há corós benéficos."
    },
    {
      id: "lagarta-velho-mundo",
      nome: "Lagarta-do-velho-mundo (Helicoverpa armigera)",
      apelido: "Helicoverpa",
      categoria: "Lagarta",
      unidade: "lagartas por pano-de-batida",
      nc: 20,
      ncNota: "praga exótica no Brasil desde 2012/13 — priorizar manejo integrado para evitar resistência",
      identificacao: "Coloração muito variável (verde, amarelada, rosada ou preta), até 35-40mm no último ínstar. Distingue-se de Heliothis virescens pelas chalazas com espinho na base e mandíbula sem dentes internos. Costuma se esconder em folíolos ainda fechados no início do ataque.",
      recomendacao: "Manejar de forma integrada com as demais lagartas para reduzir risco de resistência a inseticidas."
    },
    {
      id: "lagarta-vagens-albula",
      nome: "Lagarta-das-vagens (Spodoptera albula)",
      apelido: "S. albula",
      categoria: "Lagarta",
      unidade: "lagartas por pano-de-batida",
      nc: 20,
      identificacao: "Lagarta cinza-escura a castanha com listras alaranjadas e ~20 triângulos pretos dorsais lembrando desenho de cobra; até 50mm. Alimenta-se principalmente de vagens e grãos, também pode comer folhas.",
      recomendacao: "Dano econômico é ocasional; monitorar vagens junto com as demais Spodoptera, especialmente perto de R5-R6."
    },
    {
      id: "lagarta-vagens-cosmioides",
      nome: "Lagarta-das-vagens (Spodoptera cosmioides)",
      apelido: "S. cosmioides",
      categoria: "Lagarta",
      unidade: "lagartas por pano-de-batida",
      nc: 20,
      ncNota: "não é afetada pela toxina Cry1Ac — atenção redobrada em áreas com soja Bt",
      identificacao: "Coloração variável de amarelo-claro a preto, com listras dorsais e manchas triangulares pretas; até 50mm no último ínstar. Ataca vagens de forma semelhante às demais Spodoptera.",
      recomendacao: "Em lavouras Bt (Cry1Ac), monitorar normalmente — a tecnologia não controla esta espécie."
    },
    {
      id: "lagarta-vagens-eridania-soja",
      nome: "Lagarta-das-vagens (Spodoptera eridania)",
      apelido: "S. eridania",
      categoria: "Lagarta",
      unidade: "lagartas por pano-de-batida",
      nc: 20,
      identificacao: "Manchas triangulares dorsais de tamanho semelhante do 1º ao 8º segmento abdominal, tonalidade geral bronzeada nas asas do adulto. Pode causar dano em soja Bt (Cry1Ac).",
      recomendacao: "Monitorar vagens junto às demais Spodoptera, sem depender da tecnologia Bt para controle desta espécie."
    },
    {
      id: "lagarta-cartucho-soja",
      nome: "Lagarta-do-cartucho (Spodoptera frugiperda) em soja",
      apelido: "Spodoptera",
      categoria: "Lagarta",
      unidade: "lagartas por pano-de-batida",
      nc: 20,
      identificacao: "Cabeça com Y invertido (nem sempre suficiente para confirmar a espécie), pontos pretos pareados no corpo. Em soja, ataca vagens e pode cortar plantas ao nível do solo; também causa dano em soja Bt.",
      recomendacao: "Ocorrência crescente em áreas de rotação com milho — considerar produtos específicos e não depender apenas da tecnologia Bt."
    },
    {
      id: "broca-vagem",
      nome: "Broca-da-vagem (Etiella zinckenella)",
      apelido: "Broca-da-vagem",
      categoria: "Lagarta",
      unidade: "% de vagens broqueadas",
      nc: null,
      ncNota: "manual registra que raramente causa dano expressivo em soja",
      identificacao: "Lagarta amarelo-esverdeada a azulada com manchas pretas na porção anterior (~20mm); um mesmo indivíduo pode danificar várias vagens.",
      recomendacao: "Baixa prioridade de controle isolado — monitorar junto com outras pragas de vagem."
    },
    {
      id: "lagarta-maca-algodoeiro",
      nome: "Lagarta-da-maçã-do-algodoeiro (Heliothis virescens)",
      apelido: "Heliothis",
      categoria: "Lagarta",
      unidade: "lagartas por pano-de-batida",
      nc: 20,
      identificacao: "Coloração de verde-amarelada a marrom-avermelhada quase preta, listras pálidas longitudinais. Pode ser confundida com Helicoverpa armigera; diferencia-se pelas chalazas sem espinho na base e mandíbula com dente interno.",
      recomendacao: "Confirmar espécie antes de decidir manejo específico de resistência, já que se confunde facilmente com Helicoverpa."
    },
    {
      id: "percevejo-marrom",
      nome: "Percevejo-marrom (Euschistus heros)",
      apelido: "Percevejo-marrom",
      categoria: "Percevejo",
      unidade: "percevejos ≥0,5cm por pano-de-batida",
      nc: 2,
      ncNota: "reduzir para 1/pano em lavoura de produção de sementes — já há populações resistentes a inseticidas registradas no país",
      identificacao: "Corpo marrom-escuro em formato de escudo, com espinhos laterais próximos à cabeça. Ninfas recém-eclodidas laranja com cabeça preta. Ataca vagens e grãos, causando grãos chochos/manchados e perda de rendimento; provoca menos retenção foliar que os percevejos verdes.",
      recomendacao: "Controlar a partir do início da formação de vagens (R3). Amostrar preferencialmente cedo pela manhã e considerar risco de resistência ao escolher o produto."
    },
    {
      id: "percevejo-verde-pequeno",
      nome: "Percevejo-verde-pequeno (Piezodorus guildinii)",
      apelido: "Percevejo-verde-pequeno",
      categoria: "Percevejo",
      unidade: "percevejos por pano-de-batida",
      nc: 1,
      ncNota: "mais agressivo e eficiente na sucção de grãos que os demais percevejos — maior potencial de retenção foliar do grupo",
      identificacao: "Menor que o percevejo-marrom (~8-10mm), coloração esverdeada com manchas pretas/rosadas no abdômen e faixa marrom-avermelhada no tórax; ovos pretos em forma de barril, geralmente sobre as vagens.",
      recomendacao: "Nível de controle mais baixo por sua alta eficiência de dano — priorizar monitoramento em R3-R6."
    },
    {
      id: "percevejo-verde",
      nome: "Percevejo-verde (Nezara viridula)",
      apelido: "Percevejo-verde",
      categoria: "Percevejo",
      unidade: "percevejos por pano-de-batida",
      nc: 2,
      identificacao: "Corpo totalmente verde (12-15mm), cheiro forte quando molestado; ovos amarelados em massas de 50-100 em favo de colmeia, geralmente na face inferior das folhas. Capacidade de causar retenção foliar (hastes verdes) intermediária entre P. guildinii e E. heros. Não confundir com Chinavia spp. (percevejo-acrosterno), semelhante mas com antenas mais escuras e espinho ventral no abdômen.",
      recomendacao: "Somar à contagem de percevejo-marrom e demais percevejos para o nível de controle conjunto."
    },
    {
      id: "percevejo-barriga-verde-soja",
      nome: "Percevejo-barriga-verde (Dichelops melacanthus e D. furcatus)",
      apelido: "Barriga-verde",
      categoria: "Percevejo",
      unidade: "percevejos por pano-de-batida",
      nc: null,
      ncNota: "também ataca plântulas de milho e trigo em sucessão — atenção na entressafra",
      identificacao: "Ninfas castanhas com abdômen mais claro; adulto com cabeça terminando em duas projeções pontiagudas e tórax de margens dentadas. D. melacanthus predomina do Norte do PR ao Centro-Oeste; D. furcatus mais ao Sul. Ataca grãos e vagens, prejudicando rendimento e qualidade.",
      recomendacao: "Somar à contagem geral de percevejos; monitorar também a rotação com milho, onde a espécie causa danos sérios em plântulas."
    },
    {
      id: "percevejo-edessa",
      nome: "Percevejo-edessa (Edessa meditabunda)",
      apelido: "Edessa",
      categoria: "Percevejo",
      unidade: "percevejos por pano-de-batida",
      nc: null,
      ncNota: "populações geralmente baixas — menor capacidade de dano que os percevejos-praga principais",
      identificacao: "Tórax verde com asas marrom-escuras; ovos verde-claros em duas fileiras de ~14 por massa. Suga grãos e caules (lesões escuras), com menor capacidade de dano que E. heros/N. viridula.",
      recomendacao: "Incluir na contagem geral de percevejos, mas sem prioridade especial dado o menor potencial de dano."
    },
    {
      id: "percevejo-acrosterno",
      nome: "Percevejo-acrosterno (Chinavia spp.)",
      apelido: "Acrosterno",
      categoria: "Percevejo",
      unidade: "percevejos por pano-de-batida",
      nc: null,
      ncNota: "geralmente ocorre em baixas populações na soja",
      identificacao: "Muito semelhante ao percevejo-verde (N. viridula), mas com antenas de segmentos escuros e espinho ventral no abdômen; ninfas com manchas brancas, pretas e alaranjadas.",
      recomendacao: "Somar à contagem geral de percevejos verdes."
    },
    {
      id: "percevejo-faixa-vermelha",
      nome: "Percevejo-faixa-vermelha (Thyanta perditor)",
      apelido: "Faixa-vermelha",
      categoria: "Percevejo",
      unidade: "percevejos por pano-de-batida",
      nc: null,
      identificacao: "Cor variável entre verde e marrom conforme a época do ano, com faixa entre os espinhos torácicos; ovos em forma de tonel, castanho-acinzentados. Também ocorre em trigo e sorgo, e é hospedado por picão-preto.",
      recomendacao: "Somar à contagem geral de percevejos; observar bordaduras com picão-preto como fonte de infestação."
    },
    {
      id: "bicudo-negro-pequeno",
      nome: "Bicudo-negro-pequeno-da-soja (Rhyssomatus sp.)",
      apelido: "Bicudo-negro",
      categoria: "Besouro",
      unidade: "adultos por pano-de-batida",
      nc: null,
      ncNota: "no Brasil não há relatos de dano por este gênero (diferente da Argentina/México) — baixa prioridade",
      identificacao: "Besouro pequeno (~5mm) com rostro (bico) tão comprido quanto a cabeça; larvas brancas, curculioniformes. Causa necrose superficial em vagens, pecíolos e hastes onde ocorre dano.",
      recomendacao: "Monitorar apenas se houver sintoma visível — sem histórico de dano relevante em lavouras brasileiras até a publicação do manual."
    },
    {
      id: "percevejo-formigao",
      nome: "Percevejo-formigão (Neomegalotomus parvus)",
      apelido: "Formigão",
      categoria: "Percevejo",
      unidade: "presença por planta (monitoramento visual)",
      nc: null,
      ncNota: "ocorrência tardia — mesmo em altas populações não causa dano considerável",
      identificacao: "Ninfas parecidas com formigas (daí o nome); machos marrons com manchas claras laterais, fêmeas escuras com abdômen maior. Suga sementes em formação, mas em fase tardia do ciclo.",
      recomendacao: "Baixa prioridade de controle segundo o manual — confirmar fase da cultura antes de decidir."
    },
    {
      id: "larva-angora",
      nome: "Larva-angorá (Astylus variegatus)",
      apelido: "Larva-angorá",
      categoria: "Besouro",
      unidade: "adultos por pano-de-batida (próximo à floração)",
      nc: null,
      identificacao: "Larvas marrom-escuras com pelos esparsos, vivem no solo se alimentando de raízes; adultos observados em maior número perto da floração.",
      recomendacao: "Monitorar em altas populações próximo a R1-R2; dano radicular costuma ser secundário."
    },
    {
      id: "idi-amin",
      nome: "\"Idi-Amin\" (Lagria villosa)",
      apelido: "Idi-Amin",
      categoria: "Besouro",
      unidade: "presença por planta (monitoramento visual)",
      nc: null,
      ncNota: "espécie exótica (chegou ao Brasil junto com café importado da África) — geralmente não causa dano",
      identificacao: "Besouro marrom-escuro a preto com brilho metálico bronzeado (~12mm), pelos visíveis à contraluz; larvas pretas e pelosas. Em geral é saprófita, alimentando-se de material vegetal em decomposição.",
      recomendacao: "Normalmente não requer controle — confirmar que não há outra praga associada ao dano observado."
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
      recomendacao: "Ocorrência crescente em algumas regiões — monitorar junto com S. frugiperda.",
      estagios: [
        { id:"postura", label:"Postura (ovos)", unidadeCurta:"posturas", contaNC:false },
        { id:"peq", label:"Lagarta pequena", unidadeCurta:"lag. peq.", contaNC:false },
        { id:"grande", label:"Lagarta grande", unidadeCurta:"lag. gr.", contaNC:true },
        { id:"pupa", label:"Pupa", unidadeCurta:"pupas", contaNC:false },
        { id:"adulto", label:"Adulto (mariposa)", unidadeCurta:"adultos", contaNC:false }
      ]
    }
  ]
};

function getPestById(cultura, id){
  return (PESTS_DB[cultura]||[]).find(p=>p.id===id);
}
