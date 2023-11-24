import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function POST(request){
    const datos = await request.json();

    const autor = await db.autor.create(
        {
            data:{
                primerNombre:datos.primerNombre,
                segundoNombre: datos.segundoNombre,
                tercerNombre: datos.tercerNombre,
                primerApellido: datos.primerApellido,
                segundoApellido: datos.segundoApellido,

            }
        }
    )

    return NextResponse.json(autor);
}