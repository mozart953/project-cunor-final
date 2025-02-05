import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function POST(request){
    const datos = await request.json();

    try{

        const enlaceTC = await db.enlaceTrabajoACorporativo.create(
            {
                data:{
                    ID_AutorC:Number(datos.ID_AutorC),
                    ID_Detalle:Number(datos.ID_Detalle),
                }   
            }
        )

        return NextResponse.json(enlaceTC);
    }catch(error){
        console.log(error);
        return NextResponse.json({message: "Ha ocurrido un error inesperado." + error},{status:500});
    }
}