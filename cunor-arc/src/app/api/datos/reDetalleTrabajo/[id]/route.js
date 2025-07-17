import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function PUT(request,{params}){
    const datos = await request.json();

    try{
        const detalle = await db.registroTrabajoGraduacion.update(
            {
                where:{
                    ID_Detalle:Number(params.id),
                },
                data:{
                    ID_categoria: Number(datos.ID_categoria),
                    fechaActualizacion: datos.fechaActualizacion,
                    fechaPublicacion:datos.fechaPublicacion,
                    ID_TipoMaterial: Number(datos.ID_TipoMaterial),
                    ID_Idioma:Number(datos.ID_Idioma),
                    ID_Pais:Number(datos.ID_Pais),  

                }
            }
        )

        return NextResponse.json(detalle);
    }catch(error){
        console.log(error);
        return NextResponse.json({message: "Ha ocurrido un error inesperado."},{status:500});
    }
}

