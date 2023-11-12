import { NextResponse } from "next/server";
import db from "@/libs/db.js";


export async function GET(){
    const estados = await db.estadoUsuario.findMany();
    
    return NextResponse.json(estados);
}