import { NextResponse } from "next/server";
import db from "@/libs/db.js";

export async function GET(request, {params}){
    const idioma = await db.idiomas.findUnique({
        where:{
            ID_Idioma:Number(params.id),
        }
    });

    return NextResponse.json(idioma);
}

export async function PUT(request, {params}){
    const datos = await request.json();

    const idioma = await db.idiomas.update({
        where:{
            ID_Idioma:Number(params.id)
        },
        data:{
            nombre:datos.nombre,
            codigo:datos.codigo
        }
    }

    );

    return NextResponse.json(idioma);

}