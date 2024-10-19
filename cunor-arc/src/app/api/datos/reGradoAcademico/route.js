import db from "@/libs/db.js";
import { NextResponse } from "next/server";


export async function GET(){
    const gradoAcademico = await db.gradoAcademico.findMany();

    return NextResponse.json(gradoAcademico);
}

export async function POST(request){
    const datos = await request.json();

    const gradoAcademico = await db.gradoAcademico.create({
        data:{
            nombreGrado:datos.nombreGrado,
            ID_NivelEducativo:Number(datos.ID_NivelEducativo)
        }
    }

    );

    return NextResponse.json(gradoAcademico);

}