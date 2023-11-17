import { NextResponse } from "next/server";
import db from '@/libs/db.js';

export async function POST(request){
    const restriccionC = await request.json();

    const restriccionCreada = await db.restriccion.create(
        {
            data:{
                nombreRestriccion:restriccionC.nombreRestriccion, 
            }
        }
    );

    return NextResponse.json(restriccionCreada);
}