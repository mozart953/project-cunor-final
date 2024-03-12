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
    const searchTerm = paramametros.get('searchTerm')|| '';
    const orderDirection = paramametros.get('orderDirection')|| 'desc';
    const ordenCampo = paramametros.get('orderCampo') || 'primerNombre';

    let whereClause ={};

    whereClause = {
        registroTrabajograd:{
            some:{
                registroTrabajoGraduacion:{
                    AND: [
                        { ID_usuario: Number(idUsuario) },
                        { ID_carrera: Number(idCarrera) },
                      ],

                },
            },
        },
        
    };

    try{
        if(searchTerm){
            const searchTerms = searchTerm.split(' ');
        
            const searchConditions = searchTerms.map(term => ({
                OR: [
                    {primerNombre: {contains:term, mode: 'insensitive'}},
                    {segundoNombre: {contains:term, mode: 'insensitive'}},
                    {tercerNombre: {contains:term, mode: 'insensitive'}},
                    {primerApellido: {contains:term, mode: 'insensitive'}},
                    {segundoApellido: {contains:term, mode: 'insensitive'}},
                    {carnet: {contains:term, mode: 'insensitive'}},
                ]
            }));
        
            whereClause = {
                ...whereClause,
                AND: searchConditions
            };
        }

        const totalItems = await db.autor.count({
            where:whereClause,
        });

        let orderBy=buildOrderBy(ordenCampo, orderDirection);;

        // if(ordenCampo == 'autor.primerNombre'){
        //     orderBy = buildOrderBy('primerNombre', orderDirection);
        // }
        // else if(ordenCampo =='autor.carnet'){
        //     orderBy = buildOrderBy('carnet');
        // }

        const autores = await db.autor.findMany({
            where:whereClause,
            include:{
                registroTrabajograd:{
                    include:{
                        registroTrabajoGraduacion:true,
                    },
                },
            },
            skip: (page-1) * itemsPerPage,
            take: itemsPerPage,
            orderBy:orderBy,
        });

        return NextResponse.json({items:autores, total:totalItems});


    }catch(error){
        return NextResponse.json({message: "Ha ocurrido un error inesperado" + error},{status:500})
    }

}
