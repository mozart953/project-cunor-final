import { NextResponse } from "next/server";
import db from "@/libs/db.js";

export async function GET(request, {params}){
    const carrera = await db.carrera.findUnique({
        where:{
            ID_Carrera:Number(params.id),
        },
        include:{
            gradoAcademico:{
                include:{
                    gradoAcademico:true,
                }
            },
        }
    });

    return NextResponse.json(carrera);
}