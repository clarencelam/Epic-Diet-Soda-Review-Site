import { NextResponse } from "next/server";
import { sodas } from "@/data/sodas";

export async function GET() {
  return NextResponse.json(sodas);
}
