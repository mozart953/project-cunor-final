import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function GET(request){

    const paramametros = new URLSearchParams(request.url.split('?')[1]);
        const idDetalle = paramametros.get('idDetalle');
        const idUsuario = paramametros.get('idUsuario');
        const idCarrera = paramametros.get('idCarrera');

    const detalles = await db.registroTrabajoGraduacion.findFirst(
        
        {
            where:{
                ID_Detalle: Number(idDetalle),
                ID_usuario: Number(idUsuario),
                ID_carrera: Number(idCarrera),
            },
            include:{
                trabajoGrad:true,
                categoria:true,
                formato:true,
                carrera:true,
                //autor: true,
                autores:{
                    include:{
                        autor:true
                    }
                }, 
                usuario:true,

            }
        }
    )

    return NextResponse.json(detalles);
}