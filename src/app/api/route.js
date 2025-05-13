import { FriendlyGreeting } from "@/utils/genai";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    return NextResponse.json(
      { message: "Service is running" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
