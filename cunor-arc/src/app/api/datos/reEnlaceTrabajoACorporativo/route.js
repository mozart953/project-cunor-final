import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function POST(request){
    const datos = await request.json();

    const enlaceTC = await db.enlaceTrabajoCorporativo.create(
        {
            data:{
                ID_AutorC:datos.ID_AutorC,
                ID_Detalle:datos.ID_Detalle,
            }   
        }
    )

    return NextResponse.json(enlaceTC);
}