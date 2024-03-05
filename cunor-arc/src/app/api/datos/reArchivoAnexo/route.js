import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function POST(request){
    const datos = await request.json();

    try{
        const datoArc = await db.archivoAnexo.create(
            {
                data:{
                    direccionGuardado:datos.direccionGuardado,
                    ID_detalle:Number(datos.ID_detalle),
                }   
            }
        )
    
        return NextResponse.json(datoArc);

    }catch(error){
        return NextResponse.json({message: "Ha ocurrido un error inesperado." + error},{status:500});
    }


}