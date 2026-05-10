import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const sodas = await prisma.dietSoda.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(sodas);
}
