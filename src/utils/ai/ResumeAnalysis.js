import { GoogleGenAI, Type } from "@google/genai";
import fs from "fs/promises";
import path from "path";
import { readPrompts } from "../readPrompts";

const ai = new GoogleGenAI({ apiKey: process.env.AI_API_KEY });
const ai_model = process.env.AI_MODEL;

export const ResumeAnalysis = async (jobInfo, document) => {
  try {
    const pdfFileName = path.basename(document);
    const pdfDemoPath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "resume",
      pdfFileName
    );

    const files = [
      await ai.files.upload({
        file: pdfDemoPath,
        mimeType: "application/pdf",
      }),
    ];

    const sysprompt = await readPrompts("analysis");

    const config = {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        required: [
          "name",
          "lastname",
          "position",
          "suitable",
          "phone",
          "email",
          "job",
          "analysis",
          "keySkills",
        ],
        properties: {
          name: {
            type: Type.STRING,
          },
          lastname: {
            type: Type.STRING,
          },
          position: {
            type: Type.STRING,
          },
          suitable: {
            type: Type.BOOLEAN,
          },
          phone: {
            type: Type.STRING,
          },
          email: {
            type: Type.STRING,
          },
          job: {
            type: Type.STRING,
          },
          analysis: {
            type: Type.OBJECT,
            required: [
              "summary",
              "relevantExperience",
              "academicBackground",
              "suitabilityReasoning",
              "nextStepsSuggestions",
            ],
            properties: {
              summary: {
                type: Type.STRING,
              },
              relevantExperience: {
                type: Type.STRING,
              },
              academicBackground: {
                type: Type.STRING,
              },
              suitabilityReasoning: {
                type: Type.STRING,
              },
              nextStepsSuggestions: {
                type: Type.STRING,
              },
            },
          },
          keySkills: {
            type: Type.OBJECT,
            required: ["technical", "soft"],
            properties: {
              technical: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
              },
              soft: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
              },
            },
          },
        },
      },
      systemInstruction: [
        {
          text: sysprompt,
        },
      ],
    };

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: JSON.stringify(jobInfo),
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
    console.error(error);
    return error.message;
  }
};
