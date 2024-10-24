import db from "@/libs/db.js";
import { NextResponse } from "next/server";


export async function GET(){
    const facultades = await db.facultades.findMany();

    return NextResponse.json(facultades);
}

export async function POST(request){
    const datos = await request.json();

    const facultades = await db.facultad.create({
        data:{
            nombreFacultad:datos.nombreFacultad,
        }
    }

    );

    return NextResponse.json(facultades);

}