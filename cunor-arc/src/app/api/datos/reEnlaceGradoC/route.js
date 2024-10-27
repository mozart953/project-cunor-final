import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function POST(request){
    const datos = await request.json();

    const enlace = await db.enlaceGradoCarrera.create(
        {
            data:{
                ID_Grado:Number(datos.ID_Grado),
                ID_Carrera:Number(datos.ID_Carrera),
                ID_Estado:Number(datos.ID_Estado)
            }   
        }
    )

    return NextResponse.json(enlace);
}