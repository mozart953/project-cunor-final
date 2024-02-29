import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function POST(request){
    const datos = await request.json();

    const datoArc = await db.archivoAnexo.create(
        {
            data:{
                direccionGuardado:datos.direccionGuardado,
                ID_detalle:datos.ID_detalle,
            }   
        }
    )

    return NextResponse.json(datoArc);
}