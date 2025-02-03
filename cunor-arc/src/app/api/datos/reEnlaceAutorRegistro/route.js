import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function POST(request){
    const datos = await request.json();

    try{

        const enlace = await db.enlaceTrabajoAutor.create(
            {
                data:{
                    ID_Autor:datos.ID_Autor,
                    ID_Detalle:datos.ID_Detalle,
                }   
            }
        )

        return NextResponse.json(enlace);
    }catch(error){
        console.log(error);
        return NextResponse.json({message: "Ha ocurrido un error inesperado."},{status:500});
    }
}