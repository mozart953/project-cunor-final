import db from "@/libs/db.js";
import { NextResponse } from "next/server";


export async function GET(){
    const paises = await db.pais.findMany();

    return NextResponse.json(paises);
}

export async function POST(request){
    const datos = await request.json();

    const paises = await db.pais.create({
        data:{
            nombrePais:datos.nombrePais,
            codigo:datos.codigo
        }
    }

    );

    return NextResponse.json(paises);

}