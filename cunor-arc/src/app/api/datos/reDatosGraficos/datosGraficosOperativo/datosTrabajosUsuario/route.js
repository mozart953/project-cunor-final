import { NextResponse } from "next/server";
import db from '@/libs/db';

export async function GET(request){
    const parametros = new URLSearchParams(request.url.split('?')[1]);
    const idUsuario = Number(parametros.get('idUsuario'));
    const idCarrera = Number(parametros.get('idCarrera'));


    try{

        const total = await db.registroTrabajoGraduacion.count({
            where:{
                ID_carrera:Number(idCarrera),
                ID_usuario:Number(idUsuario),
            }
        });

        const totalActivos = await db.registroTrabajoGraduacion.count({
            where:{
                ID_carrera:Number(idCarrera),
                ID_usuario:Number(idUsuario),
                ID_estado:1,
            }
        });

        const totalInactivos = await db.registroTrabajoGraduacion.count({
            where:{
                ID_carrera:Number(idCarrera),
                ID_usuario:Number(idUsuario),
                ID_estado:2,
            }
        });

        return NextResponse.json({total: total, activos:totalActivos, inactivos:totalInactivos});

    }catch(error){
        return NextResponse.json({message:'Ocurrio un error inesperado...' + error},{status:500});
    }



}