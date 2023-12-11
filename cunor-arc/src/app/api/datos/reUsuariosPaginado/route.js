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
                    {DPI:{contains:searchTerm}},
                    {primerNombre:{contains:searchTerm}},
                    {primerApellido:{contains:searchTerm}},
                    {nombreUsuario:{contains:searchTerm}},
                    {rol:{nombreRol:{contains:searchTerm}}},
                    {carrera:{nombreCarrera:{contains:searchTerm}}},                
                ]
            };

        };

        const totalItems = await db.usuario.count({
            where:whereClause,
        });


        const usuarios = await db.usuario.findMany({
            where:whereClause,
            include: {
                rol: true,
                carrera: true
              },
              skip: (page-1)*itemsPerPage,
              take: itemsPerPage,
            
        });

        return NextResponse.json({items: usuarios, total: totalItems});

    }catch(error){
        return NextResponse({message:'Ha ocurrido un error inesperado'}, {status:500});
    }

     
}
