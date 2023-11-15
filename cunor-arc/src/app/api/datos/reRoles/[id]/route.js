import { NextResponse } from "next/server";
import db from "@/libs/db.js";

export async function GET(request, {params}){
    const carrera = await db.rol.findUnique({
        where:{
            ID_Rol:Number(params.id),
        }
    });

    return NextResponse.json(carrera);
}