import { NextResponse } from "next/server";
import db from "@/libs/db.js";

export async function GET(request, {params}){
    const carrera = await db.carrera.findUnique({
        where:{
            ID_Carrera:Number(params.id),
        }
    });

    return NextResponse.json(carrera);
}

export async function PUT(request, {params}){
    const datos = await request.json();

    const carrera = await db.carrera.update({
        where:{
            ID_Carrera:Number(params.id)
        },
        data:{
            nombreCarrera:datos.nombreCarrera,
        }
    }

    );

    return NextResponse.json(carrera);

}