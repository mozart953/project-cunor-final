import db from "@/libs/db.js";
import { NextResponse } from "next/server";


export async function GET(){
    const nivelEducativo = await db.nivelEducativo.findMany();

    return NextResponse.json(nivelEducativo);
}

export async function POST(request){
    const datos = await request.json();

    const nivelEducativo = await db.nivelEducativo.create({
        data:{
            nombreNivelEducativo:datos.nombreNivelEducativo,
        }
    }

    );

    return NextResponse.json(nivelEducativo);

}