import { NextResponse } from "next/server";
import db from "@/libs/db.js";

export async function GET(request, {params}){
    const nivelEducativo = await db.nivelEducativo.findUnique({
        where:{
            ID_NivelEducativo:Number(params.id),
        }
    });

    return NextResponse.json(nivelEducativo);
}

export async function PUT(request, {params}){
    const datos = await request.json();

    const nivelEducativo = await db.nivelEducativo.update({
        where:{
            ID_NivelEducativo:Number(params.id)
        },
        data:{
            nombreNivelEducativo:datos.nombreNivelEducativo,
        }
    }

    );

    return NextResponse.json(nivelEducativo);

}