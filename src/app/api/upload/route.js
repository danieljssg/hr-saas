export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { ExtractJobDescription } from "@/utils/ai";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { file, position } = body;

    const cvAI = await ExtractJobDescription(position, file);
    console.log(cvAI);

    return NextResponse.json(
      {
        success: true,
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
      },
      { status: 500 }
    );
  }
};
