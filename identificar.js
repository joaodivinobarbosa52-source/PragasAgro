// Vercel Serverless Function — /api/identificar
// Recebe a foto do ponto de amostragem + lista de pragas possíveis (soja/milho)
// e devolve { pestId, confianca } usando a API de visão do Google Gemini.
//
// Configuração necessária no Vercel:
//   Project Settings → Environment Variables → GEMINI_API_KEY = <sua chave do aistudio.google.com>
//
// Contrato (já usado pelo app.js / tryAISuggestion — não mude sem atualizar o app):
//   Requisição:  POST { image: "data:image/jpeg;base64,...", cultura: "soja"|"milho", pests: [{id,nome}, ...] }
//   Resposta:    { pestId: "id-da-praga" | "", confianca: 0.0–1.0 }

const GEMINI_MODEL = "gemini-3.7-flash";

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método não permitido" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "GEMINI_API_KEY não configurada no Vercel" });
    return;
  }

  try {
    const { image, cultura, pests } = req.body || {};

    if (!image || typeof image !== "string" || !image.startsWith("data:image")) {
      res.status(400).json({ error: "Campo 'image' ausente ou inválido" });
      return;
    }
    if (!Array.isArray(pests) || pests.length === 0) {
      res.status(400).json({ error: "Campo 'pests' ausente ou vazio" });
      return;
    }

    // separa o cabeçalho "data:image/jpeg;base64," dos bytes em si
    const match = image.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
    if (!match) {
      res.status(400).json({ error: "Formato de imagem inválido" });
      return;
    }
    const mimeType = match[1];
    const base64Data = match[2];

    const listaTexto = pests.map(p => `- id:"${p.id}" — ${p.nome}`).join("\n");

    const prompt =
      `Você é um agrônomo especialista em identificação de pragas de ${cultura === "milho" ? "milho" : "soja"} no Brasil.\n` +
      `Veja a foto anexada (inseto, dano em folha/vagem/planta, ou ponto de amostragem no campo) e identifique qual praga da lista abaixo ela melhor representa.\n\n` +
      `Lista de pragas possíveis (responda usando exatamente um destes "id"):\n${listaTexto}\n\n` +
      `Regras:\n` +
      `- Se a foto claramente corresponder a uma das pragas da lista, retorne o "id" dela e sua confiança real (não infle o número).\n` +
      `- Se a foto não mostrar um inseto/dano identificável, ou não corresponder bem a nenhuma da lista, retorne pestId "" e confianca baixa.\n` +
      `- confianca é um número de 0 a 1 representando sua certeza real na identificação.`;

    const geminiResp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [
              { text: prompt },
              { inline_data: { mime_type: mimeType, data: base64Data } }
            ]
          }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                pestId: { type: "STRING" },
                confianca: { type: "NUMBER" }
              },
              required: ["pestId", "confianca"]
            },
            temperature: 0.1
          }
        })
      }
    );

    if (!geminiResp.ok) {
      const errText = await geminiResp.text();
      console.error("Erro Gemini:", geminiResp.status, errText);
      res.status(502).json({ error: "Falha ao consultar a IA de visão" });
      return;
    }

    const geminiData = await geminiResp.json();
    const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      res.status(502).json({ error: "IA não retornou identificação" });
      return;
    }

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      res.status(502).json({ error: "Resposta da IA em formato inesperado" });
      return;
    }

    const pestId = typeof parsed.pestId === "string" ? parsed.pestId : "";
    let confianca = typeof parsed.confianca === "number" ? parsed.confianca : 0;
    confianca = Math.max(0, Math.min(1, confianca));

    // confirma que o id devolvido realmente está na lista enviada (evita alucinação de id inexistente)
    const valido = pests.some(p => p.id === pestId);

    res.status(200).json({
      pestId: valido ? pestId : "",
      confianca: valido ? confianca : 0
    });
  } catch (err) {
    console.error("Erro em /api/identificar:", err);
    res.status(500).json({ error: "Erro interno ao identificar praga" });
  }
}
