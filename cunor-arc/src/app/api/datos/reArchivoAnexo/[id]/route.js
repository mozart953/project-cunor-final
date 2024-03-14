import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function PUT(request, {params}){
    const datos = await request.json();

    try{
        const archivoAnexo = await db.archivoAnexo.update(
            {
                where:{
                    ID_Archivo: Number(params.id),
                },
                data:{
                    direccionGuardado:datos.direccionGuardado,
                }
            }
        )
    
        return NextResponse.json(archivoAnexo);

    }
    catch(error){
        return NextResponse.json({message: "Ha ocurrido un error inesperado."},{status:500});
    }


}