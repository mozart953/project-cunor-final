import db from "@/libs/db.js";
import { NextResponse } from "next/server";


export async function GET(){
    const material = await db.tipoMaterial.findMany();

    return NextResponse.json(material);
}

export async function POST(request){
    const datos = await request.json();

    const material = await db.tipoMaterial.create({
        data:{
            nombreTipoMaterial:datos.nombreTipoMaterial,
        }
    }

    );

    return NextResponse.json(material);

}