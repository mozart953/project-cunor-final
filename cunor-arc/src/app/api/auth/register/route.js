import { NextResponse } from "next/server";
import db from '@/libs/db.js';

export async function POST(request){
    const data =  await request.json();

    console.log(data);

    const dato = await db.usuario.create({
        data
    });

    return NextResponse.json(dato);
}

