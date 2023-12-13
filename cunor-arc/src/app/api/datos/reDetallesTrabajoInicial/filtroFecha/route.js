import { NextResponse } from "next/server";
import db from "@/libs/db";

function buildOrderBy(ordenCampo, orderDirection) {
    let orderBy = {};
    if (ordenCampo.includes('.')) {
        const [relation, field] = ordenCampo.split('.');
        orderBy[relation] = {
            [field]: orderDirection,
        };
    } else {
        orderBy[ordenCampo] = orderDirection;
    }
    return orderBy;
}

export async function GET(request){
    const paramametros = new URLSearchParams(request.url.split('?')[1]);
    const page = Number(paramametros.get('page')) || 1;
    const itemsPerPage = Number(paramametros.get('itemsPagina')); 
    const idEstado = Number(paramametros.get('idEstado'));
    const fechaInicio = paramametros.get('fechaInicio')||'';
    const fechaFin = paramametros.get('fechaFin')||''; 
    const orderDirection = paramametros.get('orderDirection') || 'desc';
    const ordenCampo = paramametros.get('orderCampo')|| 'fechaCarga'; 

    
    let cursor = undefined;
    
    const fechaInicioDate = new Date (fechaInicio);
    const fechaFinDate = new Date(fechaFin);



    let whereClause = {ID_estado:Number(idEstado)};

    try{
        
        if(fechaInicio && fechaFin && !isNaN(fechaInicioDate) && !isNaN(fechaFinDate)){
            whereClause={
                ...whereClause,
                AND:{
                    fechaCarga:{
                        gte:fechaInicioDate,
                        lte:fechaFinDate
                    }
                }
            };

        }

        const totalItems = await db.registroTrabajoGraduacion.count({
            where:whereClause,
        });

        const orderBy = buildOrderBy(ordenCampo, orderDirection);

        
        // if (page > 1) {
        //     const lastItemFromPreviousPage = await db.registroTrabajoGraduacion.findFirst({
        //         where: whereClause,
        //         orderBy: { fechaCarga: 'desc' },
        //         skip: (page - 1) * itemsPerPage,
        //     });
        //         cursor = { fechaCarga: lastItemFromPreviousPage.fechaCarga };
        // }

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
                orderBy:orderBy,
            }
        )

        return NextResponse.json({items:detalles, total:totalItems});


    }catch(error){
        return NextResponse.json({message: "Ha ocurrido un error inesperado."},{status:500});
    }

}