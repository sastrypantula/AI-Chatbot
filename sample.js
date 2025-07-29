// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({apiKey:"AIzaSyD2AJMgLs8a4fSoSQKmZVhFPNe8G2vBX9g"});

// async function main(msg) {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: msg,
//   })
//   return (response.text);
// }

//  module.exports=main
// async function main(msg) {
//   const { GoogleGenAI } = await import("@google/genai");
//   const ai = new GoogleGenAI({ apiKey: "AIzaSyD2AJMgLs8a4fSoSQKmZVhFPNe8G2vBX9g" });

//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//    contents: [
//       {
//         role: "user",
//         parts: [{msg}]  // assuming msg = { prompt: "..." }
//       }
//     ]

//   });

//   return response.text;
// }

// module.exports = main;
// async function main(History,text) {
//   const { GoogleGenAI } = await import("@google/genai");
//   const ai = new GoogleGenAI({ apiKey: "AIzaSyD2AJMgLs8a4fSoSQKmZVhFPNe8G2vBX9g" });

//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: [
//       {
//         role: "user",
//         parts: [{History},{ text }]
//       }
//     ]
//   });

//   return response.text;
// }
// module.exports = main;


/**
 * 
 * @param {Array} history - full chat history (array of messages)
 * @returns {string} - model response text
 */
async function main(history) {
     const { GoogleGenAI } = await import("@google/genai");
  const ai = new GoogleGenAI({ apiKey: "AIzaSyD2AJMgLs8a4fSoSQKmZVhFPNe8G2vBX9g" });
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: history // full conversation: user + model messages
    });

    return await result.text;
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    throw error;
  }
}

module.exports= main;
