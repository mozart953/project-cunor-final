import db from '@/libs/db.js';
import { NextResponse } from 'next/server';

export async function GET(request){
    const params = new URLSearchParams(request.url.split('?')[1]);
    const nombre = params.get('nombreUsuario');

    const usuarios = await db.usuario.findUnique({
        where:{
            nombreUsuario:nombre,
        },
        include: {
            carrera:{
                include:{
                    facultad:true,
                    gradoAcademico:{
                        include:{
                            gradoAcademico:{
                                include:{
                                    nivelEducativo:true,
                                }
                            }
                        }
                    },
                    
                }
            }
          }
    });

    return NextResponse.json(usuarios);
}