import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function POST(request){
    const datos = await request.json();

    const detalle = await db.registroTrabajoGraduacion.create(
        {
            data:{
                ID_trabajo:Number(datos.ID_trabajo),
                ID_categoria: Number(datos.ID_categoria),
                ID_archivo: Number(datos.ID_archivo),
                ID_carrera: Number(datos.ID_carrera),
                ID_autor: Number(datos.ID_autor),
                ID_usuario: Number(datos.ID_usuario),
                ID_estado: Number(datos.ID_estado),

            }
        }
    )

    return NextResponse.json(detalle);
}

export async function GET(request){
    const paramametros = new URLSearchParams(request.url.split('?')[1]);
    const idUsuario = paramametros.get('idUsuario');
    const idCarrera = paramametros.get('idCarrera');
    const page = Number(paramametros.get('page')) || 1;
    const itemsPerPage = 10; 

    const detalles = await db.registroTrabajoGraduacion.findMany(
        {
            where:{
                ID_usuario: Number(idUsuario),
                ID_carrera: Number(idCarrera),
            },
            include:{
                trabajoGrad:true,
                categoria:true,
                archivo:true,
                carrera:true,
                autor: true,
                usuario:true,

            },
            skip: (page-1) * itemsPerPage,
            take: itemsPerPage,
        }
    )

    return NextResponse.json(detalles);

}