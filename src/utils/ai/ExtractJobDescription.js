import { GoogleGenAI, Type } from "@google/genai";
import fs from "fs/promises";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.AI_API_KEY });
const ai_model = process.env.AI_SMALL_MODEL;

export const ExtractJobDescription = async (document) => {
  try {
    const pdfFileName = path.basename(document);
    const pdfDemoPath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "jobs",
      pdfFileName
    );

    const files = [
      await ai.files.upload({
        file: pdfDemoPath,
        mimeType: "application/pdf",
      }),
    ];

    const config = {
      temperature: 1,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        required: ["name", "description"],
        properties: {
          name: {
            type: Type.STRING,
          },
          description: {
            type: Type.STRING,
          },
        },
      },
      systemInstruction: [
        {
          text: `Responde siempre en español`,
        },
      ],
    };

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `Analiza el documento PDF y genera una salida en formato JSON.  Extrae el nombre del cargo eliminando el código entre paréntesis (ej: '(DCPC001)').  Crea una descripción detallada del cargo desde la perspectiva de un analista de Recursos Humanos, incluyendo:

Objetivo del cargo
Responsabilidades (organizadas en Planeación, Ejecución y Seguimiento/Control)
Competencias (cualitativas y cuantitativas)
Habilidades requeridas
Perfil de conocimientos (escolaridad, áreas de escolaridad y conocimientos generales)
Perfil del cargo (nivel académico y experiencia laboral)
La descripción debe ser concisa, clara y útil para evaluar la idoneidad de candidatos, con una extensión de 300-500 palabras.

El JSON de salida debe tener la siguiente estructura:

{
  "name": "[Nombre del Cargo]",
  "description": "[Descripción Detallada del Cargo]"
}`,
          },
          {
            fileData: {
              fileUri: files[0].uri,
              mimeType: files[0].mimeType,
            },
          },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model: ai_model,
      config,
      contents,
    });

    console.log(response);
    const parseText = JSON.parse(response.text);
    return {
      ...parseText,
    };
  } catch (error) {
    console.log(error);

    return error.message;
  }
};
