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
    const searchTerm = paramametros.get('searchTerm')||'';
    const orderDirection = paramametros.get('orderDirection') || 'desc';
    const ordenCampo = paramametros.get('orderCampo')|| 'fechaCarga';
    const letra = paramametros.get('letra') || '';
 
    
    let whereClause = { ID_usuario: Number(idUsuario), ID_carrera: Number(idCarrera),};

    try{

        if(searchTerm){
            whereClause={
                ...whereClause,
                OR:[
                    {trabajoGrad:{titulo:{contains:searchTerm, mode: 'insensitive'}}},
                    {categoria:{nombreCategoria:{contains:searchTerm, mode: 'insensitive'}}},                
                ]
            };

        };

        if (letra!=='' && letra!==null) {
            whereClause = {
                ...whereClause,
                trabajoGrad: {
                    ...whereClause.trabajoGrad,
                    titulo: {
                        startsWith: letra,
                        mode: 'insensitive'
                    }
                }
            };
        }

        const totalItems = await db.registroTrabajoGraduacion.count({
            where:whereClause,
        });

        let orderBy=buildOrderBy(ordenCampo, orderDirection);
        
        const detalles = await db.registroTrabajoGraduacion.findMany(
            {
                where:whereClause,
                include:{
                    trabajoGrad:true,
                    categoria:true,

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