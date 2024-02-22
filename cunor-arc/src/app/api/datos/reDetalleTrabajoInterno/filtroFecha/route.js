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
    const idUsuario = paramametros.get('idUsuario');
    const idCarrera = paramametros.get('idCarrera');
    const page = Number(paramametros.get('page')) || 1;
    const itemsPerPage = Number(paramametros.get('itemsPagina')); 
    
    const fechaInicio = paramametros.get('fechaInicio')||'';
    const fechaFin = paramametros.get('fechaFin')||'';  

    const orderDirection = paramametros.get('orderDirection') || 'desc';
    const ordenCampo = paramametros.get('orderCampo')|| 'fechaCarga';

    
    let cursor = undefined;
    
    const fechaInicioDate = new Date (fechaInicio);
    const fechaFinDate = new Date(fechaFin);



    let whereClause = { ID_usuario: Number(idUsuario), ID_carrera: Number(idCarrera),};

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

        let orderBy={};

        if(ordenCampo !== 'autor.primerNombre'){
             orderBy = buildOrderBy(ordenCampo, orderDirection);
        }
        
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
                    //autor: true,
                    autores: {
                        include: {
                            autor: true
                        }
                    }

                },
                skip: (page-1) * itemsPerPage,
                take: itemsPerPage,
                orderBy:orderBy,
            }
        )

        if (ordenCampo === 'autor.primerNombre') {
            detalles.sort((a, b) => {
                const primerNombreA = a.autores[0]?.autor?.primerNombre || '';
                const primerNombreB = b.autores[0]?.autor?.primerNombre || '';
    
                if (orderDirection === 'asc') {
                    return primerNombreA.localeCompare(primerNombreB);
                } else {
                    return primerNombreB.localeCompare(primerNombreA);
                }
            });
        }

        return NextResponse.json({items:detalles, total:totalItems});


    }catch(error){
        return NextResponse.json({message: "Ha ocurrido un error inesperado."},{status:500});
    }

}