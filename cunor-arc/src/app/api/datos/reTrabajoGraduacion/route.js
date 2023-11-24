import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function POST(request){
    const datos = await request.json();

    const trabajo = await db.trabajoGraduacion.create(
        {
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