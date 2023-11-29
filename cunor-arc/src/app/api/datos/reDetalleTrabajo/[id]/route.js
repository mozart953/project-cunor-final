import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function PUT(request,{params}){
    const datos = await request.json();

    const detalle = await db.registroTrabajoGraduacion.update(
        {
            where:{
                ID_Detalle:Number(params.id),
            },
            data:{
                ID_categoria: Number(datos.ID_categoria),

            }
        }
    )

    return NextResponse.json(detalle);
}

