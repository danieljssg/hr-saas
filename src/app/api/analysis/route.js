import { NextResponse } from "next/server";
import fs from "fs/promises";

export const GET = async () => {
  try {
    const saveData = await fs.readFile("data.json", "utf-8");
    const data = JSON.parse(saveData);
    const orderedData = data.sort((a, b) => b.createdAt - a.createdAt);

    return NextResponse.json(
      { message: "Analisis realizados", data: orderedData },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
