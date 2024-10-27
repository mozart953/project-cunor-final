import { NextResponse } from "next/server";
import db from "@/libs/db.js";

export async function GET(){
    const carreras = await db.carrera.findMany();

    return NextResponse.json(carreras);
}

export async function POST(request){
    const datos = await request.json();

    const carrera = await db.carrera.create({
        data:{
            nombreCarrera:datos.nombreCarrera,
            codigoCarrera:datos.codigoCarrera,
            ID_Facultad:Number(datos.ID_Facultad),
        }
    }

    );

    return NextResponse.json(carrera);

}