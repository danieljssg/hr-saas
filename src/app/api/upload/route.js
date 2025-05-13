export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { AnalysisCV } from "@/utils/ai";
import { saveOnJSON } from "@/utils/saveOnJSON";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { file, position } = body;

    const cvAI = await AnalysisCV(position, file);

    const resume = {
      id: uuidv4(),
      position,
      file,
      ...cvAI,
      createdAt: new Date(),
    };

    await saveOnJSON(resume);
    return NextResponse.json(
      {
        success: true,
        resume,
        error: null,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      {
        error: "Error al subir el archivo: " + error.message,
        success: false,
        resume: null,
      },
      { status: 500 }
    );
  }
};
