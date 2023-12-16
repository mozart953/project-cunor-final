import { NextResponse } from "next/server";
import db from '@/libs/db';

export async function GET(){


    try{

        const total = await db.registroTrabajoGraduacion.count();

        const totalActivos = await db.registroTrabajoGraduacion.count({
            where:{
                ID_estado:1,
            }
        });

        const totalInactivos = await db.registroTrabajoGraduacion.count({
            where:{
                ID_estado:2,
            }
        });

        return NextResponse.json({total: total, activos:totalActivos, inactivos:totalInactivos});

    }catch(error){
        return NextResponse.json({message:'Ocurrio un error inesperado...' + error},{status:500});
    }



}