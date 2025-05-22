import { GoogleGenAI, Type } from "@google/genai";
import fs from "fs/promises";
import path from "path";
import { readPrompts } from "../readPrompts";

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

    const prompt = await readPrompts("jobdescription");

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
            text: prompt,
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

    const parseText = JSON.parse(response.text);
    return {
      ...parseText,
    };
  } catch (error) {
    console.log(error);

    return error.message;
  }
};
