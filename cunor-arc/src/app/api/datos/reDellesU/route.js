import { NextResponse } from "next/server";
import db from "@/libs/db.js";

export async function POST(request){
    const detalles = await request.json();

    const Usuario = await db.usuario.findUnique(
        {
            where:{
                nombreUsuario:detalles.nombreUsuario,

            }
        }
    );


    const registro = await db.registroUsuario.create({
        data:{
            ID_usuario:Number(Usuario.ID_Usuario),
            descripcion:detalles.descripcion,
        },
    });

    return NextResponse.json(registro);
}