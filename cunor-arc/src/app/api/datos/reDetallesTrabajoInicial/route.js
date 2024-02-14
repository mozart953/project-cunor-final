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
    const searchTerm = paramametros.get('searchTerm')||'';
    const orderDirection = paramametros.get('orderDirection') || 'desc';
    const ordenCampo = paramametros.get('orderCampo')|| 'fechaCarga';    
 

    let whereClause = {ID_estado:Number(idEstado)};

    try{

        // if(searchTerm){
        //     whereClause={
        //         ...whereClause,
        //         OR:[
        //             {trabajoGrad:{titulo:{contains:searchTerm, mode: 'insensitive'}}},
        //             {trabajoGrad:{paClave:{contains:searchTerm, mode: 'insensitive'}}},
        //             {carrera:{nombreCarrera:{contains:searchTerm, mode: 'insensitive'}}},
        //             {autor:{primerNombre:{contains:searchTerm, mode: 'insensitive'}}},
        //             {autor:{segundoNombre:{contains:searchTerm, mode: 'insensitive'}}},
        //             {autor:{tercerNombre:{contains:searchTerm, mode: 'insensitive'}}},
        //             {autor:{primerApellido:{contains:searchTerm, mode: 'insensitive'}}},
        //             {autor:{segundoApellido:{contains:searchTerm, mode: 'insensitive'}}},
        //             {categoria:{nombreCategoria:{contains:searchTerm, mode: 'insensitive'}}},                
        //         ]
        //     };

        // }

        if(searchTerm){
            const searchTerms = searchTerm.split(' ');
        
            const searchConditions = searchTerms.map(term => ({
                OR: [
                    {trabajoGrad:{titulo:{contains:term, mode: 'insensitive'}}},
                    {trabajoGrad:{paClave:{contains:term, mode: 'insensitive'}}},
                    {carrera:{nombreCarrera:{contains:term, mode: 'insensitive'}}},
                    // {autor:{primerNombre:{contains:term, mode: 'insensitive'}}},
                    // {autor:{segundoNombre:{contains:term, mode: 'insensitive'}}},
                    // {autor:{tercerNombre:{contains:term, mode: 'insensitive'}}},
                    // {autor:{primerApellido:{contains:term, mode: 'insensitive'}}},
                    // {autor:{segundoApellido:{contains:term, mode: 'insensitive'}}},
                    {autores: {some: {autor: {primerNombre: {contains:term, mode: 'insensitive'}}}}},
                    {autores: {some: {autor: {segundoNombre: {contains:term, mode: 'insensitive'}}}}},
                    {autores: {some: {autor: {tercerNombre: {contains:term, mode: 'insensitive'}}}}},
                    {autores: {some: {autor: {primerApellido: {contains:term, mode: 'insensitive'}}}}},
                    {autores: {some: {autor: {segundoApellido: {contains:term, mode: 'insensitive'}}}}},
                    {categoria:{nombreCategoria:{contains:term, mode: 'insensitive'}}},
                ]
            }));
        
            whereClause = {
                ...whereClause,
                AND: searchConditions
            };
        }
        

        const totalItems = await db.registroTrabajoGraduacion.count({
            where:whereClause,
        });

        const orderBy = buildOrderBy(ordenCampo, orderDirection);

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

        return NextResponse.json({items:detalles, total:totalItems});
    }catch(error){
        return NextResponse.json({message: "Ha ocurrido un error inesperado."},{status:500});
    }
}