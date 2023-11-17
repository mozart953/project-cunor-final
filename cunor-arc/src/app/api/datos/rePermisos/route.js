import { NextResponse } from "next/server";
import db from '@/libs/db.js';

export async function POST(request){
    const permiso = await request.json();

    const permisoCreado = await db.permiso.create(
        {
            data:{
                nombrePermiso:permiso.nombrePermiso, 
            }
        }
    );

    return NextResponse.json(permisoCreado);
}