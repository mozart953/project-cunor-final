import { NextResponse } from "next/server";
import db from "@/libs/db.js";

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
    const searchTerm = paramametros.get('searchTerm')|| '';
    const orderDirection = paramametros.get('orderDirection')|| 'desc';
    const ordenCampo = paramametros.get('orderCampo') || 'nombreCarrera';
    const letra = paramametros.get('letra') || '';

    let whereClause ={};

    whereClause = {
        registroTrabajograd:{              
                    some:{
                        AND: [
                        { ID_estado: Number(idEstado)},
                      ],
                    },
            },
        
        
    };

    try{
        if(searchTerm){
            const searchTerms = searchTerm.split(' ');
        
            const searchConditions = searchTerms.map(term => ({
                OR: [
                    {nombreCarrera:{contains:term, mode: 'insensitive'}},
                ]
            }));
        
            whereClause = {
                ...whereClause,
                AND: searchConditions
            };
        }

        if (letra!=='' && letra!==null) {
            whereClause = {
                ...whereClause,
                nombreCarrera: {
                        startsWith: letra,
                        mode: 'insensitive'
                    }
                }
        };
        

        const totalItems = await db.carrera.count({
            where:whereClause,
        });

        let orderBy=buildOrderBy(ordenCampo, orderDirection);;

        // if(ordenCampo == 'autor.primerNombre'){
        //     orderBy = buildOrderBy('primerNombre', orderDirection);
        // }
        // else if(ordenCampo =='autor.carnet'){
        //     orderBy = buildOrderBy('carnet');
        // }

        const carreras = await db.carrera.findMany({
            where:whereClause,
            include:{
                registroTrabajograd:true,
            },
            skip: (page-1) * itemsPerPage,
            take: itemsPerPage,
            orderBy:orderBy,
        });

        return NextResponse.json({items:carreras, total:totalItems});


    }catch(error){
        return NextResponse.json({message: "Ha ocurrido un error inesperado" + error},{status:500})
    }

}
