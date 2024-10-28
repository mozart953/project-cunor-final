import db from '@/libs/db.js';
import { serverHooks } from 'next/dist/server/app-render/entry-base';
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
                    {nombreCarrera:{contains:searchTerm, mode: 'insensitive'}}, 
                    {codigoCarrera:{contains:searchTerm, mode: 'insensitive'}}, 
                    {facultad:{nombreFacultad:{contains:searchTerm, mode:'insensitive'}}},
                    {gradoAcademico:{some:{gradoAcademico:{nombreGrado:{contains:searchTerm, mode: 'insensitive'}}}}},
                    {gradoAcademico:{some:{gradoAcademico:{nivelEducativo:{nombreNivelEducativo:{contains:searchTerm, mode: 'insensitive'}}}}}}              
                ]
            };

        };

        const totalItems = await db.carrera.count({
            where:whereClause,
        });


        const carreras = await db.carrera.findMany({
            where:whereClause,
            skip: (page-1)*itemsPerPage,
            take: itemsPerPage,
            include:{
                facultad:true,
                gradoAcademico:{
                    include:{
                        gradoAcademico:{
                            include:{
                                nivelEducativo:true,
                            }
                        }
                    }
                },
            }
            
        });

        return NextResponse.json({items: carreras, total: totalItems});

    }catch(error){
        return NextResponse({message:'Ha ocurrido un error inesperado'}, {status:500});
    }

}