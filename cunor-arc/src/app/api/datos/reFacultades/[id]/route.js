import { NextResponse } from "next/server";
import db from "@/libs/db.js";

export async function GET(request, {params}){
    const facultad = await db.facultad.findUnique({
        where:{
            ID_Facultad:Number(params.id),
        }
    });

    return NextResponse.json(facultad);
}

export async function PUT(request, {params}){
    const datos = await request.json();

    const facultad = await db.facultad.update({
        where:{
            ID_Facultad:Number(params.id)
        },
        data:{
            nombreFacultad:datos.nombreFacultad,
        }
    }

    );

    return NextResponse.json(facultad);

}