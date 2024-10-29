import db from '@/libs/db.js';
import { NextResponse } from 'next/server';

export async function GET(request){
    const paramametros = new URLSearchParams(request.url.split('?')[1]);
    const page = Number(paramametros.get('page')) || 1;
    const itemsPerPage = Number(paramametros.get('itemsPagina'))||10;
    const searchTerm = paramametros.get('searchTerm')||'';

    let whereClause ={};

    try{

        if(searchTerm){
            whereClause={
                OR:[
                    {nombre:{contains:searchTerm, mode: 'insensitive'}},
                    {codigo:{contains:searchTerm, mode: 'insensitive'}},                 
                ]
            };

        };

        const totalItems = await db.idiomas.count({
            where:whereClause,
        });


        const idiomas = await db.idiomas.findMany({
            where:whereClause,
            skip: (page-1)*itemsPerPage,
            take: itemsPerPage,
                        
        });

        return NextResponse.json({items: idiomas, total: totalItems});

    }catch(error){
        return NextResponse({message:'Ha ocurrido un error inesperado'}, {status:500});
    }

}