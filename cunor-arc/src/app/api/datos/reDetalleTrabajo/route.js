import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function POST(request){
    const datos = await request.json();

    const detalle = await db.registroTrabajoGraduacion.create(
        {
            data:{
                ID_trabajo:Number(datos.ID_trabajo),
                ID_categoria: Number(datos.ID_categoria),
                ID_archivo: Number(datos.ID_archivo),
                ID_carrera: Number(datos.ID_carrera),
                ID_autor: Number(datos.ID_autor),
                ID_usuario: Number(datos.ID_usuario),
                ID_estado: Number(datos.ID_estado),

            }
        }
    )

    return NextResponse.json(detalle);
}