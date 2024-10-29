import db from "@/libs/db.js";
import { NextResponse } from "next/server";


export async function GET(){
    const idiomas = await db.idiomas.findMany();

    return NextResponse.json(idiomas);
}

export async function POST(request){
    const datos = await request.json();

    const idiomas = await db.idiomas.create({
        data:{
            nombre:datos.nombre,
            codigo:datos.codigo
        }
    }

    );

    return NextResponse.json(idiomas);

}