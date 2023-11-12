import { NextResponse } from "next/server";
import db from "@/libs/db.js";

export async function GET(){
    const carreras = await db.carrera.findMany();

    return NextResponse.json(carreras);
}