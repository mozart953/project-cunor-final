import { NextResponse } from "next/server";
import db from "@/libs/db.js";

export async function GET(request, {params}){
    const pais = await db.pais.findUnique({
        where:{
            ID_Pais:Number(params.id),
        }
    });

    return NextResponse.json(pais);
}

export async function PUT(request, {params}){
    const datos = await request.json();

    const pais = await db.pais.update({
        where:{
            ID_Pais:Number(params.id)
        },
        data:{
            nombrePais:datos.nombrePais,
            codigo:datos.codigo
        }
    }

    );

    return NextResponse.json(pais);

}