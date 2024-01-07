import { NextResponse } from "next/server";
import db from "@/libs/db.js";

export async function GET(){
    const categoria = await db.categoria.findMany();

    return NextResponse.json(categoria);
}