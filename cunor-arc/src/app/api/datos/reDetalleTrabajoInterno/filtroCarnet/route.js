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
    
    let whereClause = { ID_usuario: Number(idUsuario), ID_carrera: Number(idCarrera),};

    try{
        if(searchTerm){
            whereClause={
                ...whereClause,
                OR:[
                    // {autor:{carnet:{contains:searchTerm}}},
                    {autores: {some: {autor: {carnet: {contains:searchTerm, mode: 'insensitive'}}}}},                
                ]
            };

        }

        const totalItems = await db.registroTrabajoGraduacion.count({
            where:whereClause,
        });

        let orderBy={};

        if(ordenCampo !== 'autor.primerNombre' && ordenCampo!=='autor.carnet'){
             orderBy = buildOrderBy(ordenCampo, orderDirection);
        }

        const detalles = await db.registroTrabajoGraduacion.findMany(
            {
                where:whereClause,
                include:{
                    trabajoGrad:true,
                    categoria:true,
                    formato:true,
                    carrera:true,
                    //autor: true,
                    autores: {
                        include: {
                            autor: true
                        }
                    },
                    archivoAnexo:true,

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

        if (ordenCampo === 'autor.carnet') {
            detalles.sort((a, b) => {
                const primerCarneA = a.autores[0]?.autor?.carnet || '';
                const primerCarneB = b.autores[0]?.autor?.carnet || '';
    
                if (orderDirection === 'asc') {
                    return primerCarneA.localeCompare(primerCarneB);
                } else {
                    return primerCarneB.localeCompare(primerCarneA);
                }
            });
        }

        return NextResponse.json({items:detalles, total:totalItems});
    }catch(error){
        return NextResponse.json({message: "Ha ocurrido un error inesperado."},{status:500});
    }
}