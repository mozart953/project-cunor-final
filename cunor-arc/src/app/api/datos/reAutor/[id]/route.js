import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function PUT(request, {params}){
    const datos = await request.json();

    const autor = await db.autor.update(
        {
            where:{
                ID_Autor: Number(params.id),
            },
            data:{
                primerNombre:datos.primerNombre,
                segundoNombre: datos.segundoNombre,
                tercerNombre: datos.tercerNombre,
                primerApellido: datos.primerApellido,
                segundoApellido: datos.segundoApellido,
                carnet: datos.carnet,

            }
        }
    )
    console.log(autor);

    return NextResponse.json(autor);
}