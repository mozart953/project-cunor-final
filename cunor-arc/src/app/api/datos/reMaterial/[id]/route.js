import { NextResponse } from "next/server";
import db from "@/libs/db.js";

export async function GET(request, {params}){
    const material = await db.tipoMaterial.findUnique({
        where:{
            ID_TipoMaterial:Number(params.id),
        }
    });

    return NextResponse.json(material);
}

export async function PUT(request, {params}){
    const datos = await request.json();

    const material = await db.tipoMaterial.update({
        where:{
            ID_TipoMaterial:Number(params.id)
        },
        data:{
            nombreTipoMaterial:datos.nombreTipoMaterial,
        }
    }

    );

    return NextResponse.json(material);

}