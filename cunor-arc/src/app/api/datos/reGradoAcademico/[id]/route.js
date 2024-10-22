import { NextResponse } from "next/server";
import db from "@/libs/db.js";

export async function GET(request, {params}){
    const gradoAcademico = await db.gradoAcademico.findUnique({
        where:{
            ID_Grado:Number(params.id),
        }
    });

    return NextResponse.json(gradoAcademico);
}

export async function PUT(request, {params}){
    const datos = await request.json();

    const gradoAcademico = await db.gradoAcademico.update({
        where:{
            ID_Grado:Number(params.id)
        },
        data:{
            nombreGrado:datos.nombreGrado,
            ID_NivelEducativo:Number(datos.ID_NivelEducativo),
        }
    }

    );

    return NextResponse.json(gradoAcademico);

}