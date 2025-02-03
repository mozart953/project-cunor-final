import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function POST(request){
    const datos = await request.json();

    try{

        const autor = await db.autor.create(
            {
                data:{
                    primerNombre:datos.primerNombre,
                    segundoNombre: datos.segundoNombre,
                    tercerNombre: datos.tercerNombre,
                    primerApellido: datos.primerApellido,
                    segundoApellido: datos.segundoApellido,
                    carnet:datos.carnet,

                }
            }
        )

        return NextResponse.json(autor);
    }catch(error){
        console.log(error);
        return NextResponse.json({message: "Ha ocurrido un error inesperado."},{status:500});
    }
}