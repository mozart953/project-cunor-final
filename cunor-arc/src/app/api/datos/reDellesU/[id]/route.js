import { NextResponse } from "next/server";
import db from '@/libs/db.js';

export async function GET(request,{params}){
    console.log("viendo el dato" + params.id);
    const detalleUsuario = await db.registroUsuario.findFirst(
        {
            where:{
                ID_usuario:Number(params.id),
            },
            include:{
                usuario:true,
            }
        }
    );

    return NextResponse.json(detalleUsuario);
}