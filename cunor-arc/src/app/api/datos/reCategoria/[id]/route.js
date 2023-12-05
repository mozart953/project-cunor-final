import { NextResponse } from "next/server";
import db from '@/libs/db.js';

export async function GET(request, {params}){

    try{
        
        const respuesta = await db.categoria.findUnique({
            where:{
                ID_Categoria:Number(params.id),
            }
        })

        return NextResponse.json(respuesta);

    }catch(error){
        return NextResponse.json({message:error.message },{status:500})
    }
    
}

export async function PUT(request, {params}){
    const datos = await request.json();

    try{
        const respuesta = await db.categoria.update(
            {   
                where:{
                    ID_Categoria:Number(params.id),
                },
                data:{
                   nombreCategoria:datos.nombreCategoria, 
                }
    
            }
        )
        
        return NextResponse.json(respuesta);
    
    }catch(error){
        return NextResponse.json({message:error.message},{status:500});
    }

 
}