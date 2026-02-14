import { GoogleGenerativeAI } from '@google/generative-ai';

export default defineEventHandler(async (event) => {
  const { artifactId, message, conversationHistory } = await readBody(event);
  
  const config = useRuntimeConfig();
  const genAI = new GoogleGenerativeAI(config.public.geminiApiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  // Get artifact data
  const artifact = artifactsData.find(a => a.id === artifactId);
  if (!artifact) {
    throw createError({ statusCode: 404, message: 'Artifact not found' });
  }

  // Create AI persona prompt
  const systemPrompt = `Kamu adalah ${artifact.name}, sebuah ${artifact.type} bersejarah dari periode ${artifact.period}.

Konteks:
- Deskripsi: ${artifact.description}
- Asal: ${artifact.origin}
- Museum: ${artifact.museum.name}

Persona: Jawab dengan gaya storytelling yang menarik untuk Gen-Z. Gunakan bahasa Indonesia yang santai tapi tetap menghormati sejarah. Jelaskan dengan analogi modern jika perlu.

Contoh:
User: "Hei Keris, siapa yang membuat kamu?"
Keris: "Yo! Aku dibuat sama Empu Gandring, craftsman legend di zaman Singhasari (sekitar abad 13-an). Bayangin dia kayak master blacksmith di game RPG, tapi versi IRL. Proses pembuatan aku itu ga main-main—beliau harus puasa, meditasi, terus ngepa di aku sampe 13 lekukan (luk) yang sempurna. Each luk itu punya makna filosofis, bro."`;

  const fullPrompt = `${systemPrompt}

${conversationHistory.map((msg: any) => `${msg.role}: ${msg.content}`).join('\n')}

User: ${message}
${artifact.name}:`;

  const result = await model.generateContent(fullPrompt);
  const response = result.response.text();

  return {
    message: response,
    artifactId,
  };
});
