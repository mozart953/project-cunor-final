import { NextResponse } from "next/server";
import db from '@/libs/db';

export async function GET(){

    try{
        const totalUsuarios = await db.usuario.count();

        const totalActivos = await db.usuario.count({
            where:{
                ID_estado:1,
            }
        });

        const totalInactivo = await db.usuario.count({
            where:{
                ID_estado:2,
            }
        });

        return NextResponse.json({totalUsuarios: totalUsuarios,activos:totalActivos, inactivos:totalInactivo});

    }catch(error){
        return NextResponse.json({message:"Ha ocurrido un error inesperado"}, {status:500});
    }

}

