import db from '@/libs/db.js';
import { NextResponse } from 'next/server';

export async function GET(){

    const usuarios = await db.usuario.findMany({
        include: {
            rol: true,
            carrera: true
          }
    });

    return NextResponse.json(usuarios);
}

