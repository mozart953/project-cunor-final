import { NextResponse } from 'next/server';
import db from '@/libs/db.js';


export async function PUT(request, {params}){
    const data = await request.json();
    const estadoActualizado = await db.usuario.update({
        where:{
            ID_Usuario:Number(params.id),
        },
        data:{
            ID_estado: data.ID_estado
        },
    })

    return NextResponse.json(estadoActualizado);
}

