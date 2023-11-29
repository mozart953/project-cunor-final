import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function PUT(request, {params}){
    const datos = await request.json();

    const trabajo = await db.trabajoGraduacion.update(
        {
            where:{
                ID_Trabajo:Number(params.id),
            },
            data:{
                titulo:datos.titulo,
                cantidadPaginas: Number(datos.cantidadPaginas),
                descripcion: datos.descripcion,
                tamanio: Number(datos.tamanio),
                direccionGuardado: datos.direccionGuardado

            }
        }
    )

    return NextResponse.json(trabajo);
}