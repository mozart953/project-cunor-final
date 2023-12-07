import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function GET(request){
    const paramametros = new URLSearchParams(request.url.split('?')[1]);
    const page = Number(paramametros.get('page')) || 1;
    const itemsPerPage = Number(paramametros.get('itemsPagina')); 
    const idEstado = Number(paramametros.get('idEstado'));
    const searchTerm = paramametros.get('searchTerm')||'';    

    const totalItems = await db.registroTrabajoGraduacion.count(); 

    let whereClause = {ID_estado:Number(idEstado)};

    if(searchTerm){
        whereClause={
            ...whereClause,
            OR:[
                {autor:{primerNombre:{contains:searchTerm}}},
                {autor:{segundoNombre:{contains:searchTerm}}},
                {autor:{tercerNombre:{contains:searchTerm}}},
                {autor:{primerApellido:{contains:searchTerm}}},
                {autor:{segundoApellido:{contains:searchTerm}}},                
            ]
        };

    }

    const detalles = await db.registroTrabajoGraduacion.findMany(
        {
            where:whereClause,
            include:{
                trabajoGrad:true,
                categoria:true,
                archivo:true,
                carrera:true,
                autor: true,

            },
            skip: (page-1) * itemsPerPage,
            take: itemsPerPage,
            orderBy:{
                fechaCarga:'desc',
            }
        }
    )

    return NextResponse.json({items:detalles, total:totalItems});

}