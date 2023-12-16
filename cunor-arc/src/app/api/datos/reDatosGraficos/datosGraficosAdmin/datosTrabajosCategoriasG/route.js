import { NextResponse } from "next/server";
import db from '@/libs/db';

export async function GET(){

    try{
        
        const categorias = await db.categoria.findMany(); 

        const totalPorCarrera = await db.registroTrabajoGraduacion.groupBy({
            by:['ID_categoria'],
            _count:{
                _all:true,
            },
        });

        const resultados = categorias.map((data)=>{
            const conteo = totalPorCarrera.find(item=>item.ID_categoria===data.ID_Categoria);
            return{
                categoria:data.nombreCategoria,
                conteo:conteo && conteo._count ? conteo._count._all : 0, 
            };

            
        })


        return NextResponse.json(resultados);

    }catch(error){
        return NextResponse.json({message:"Ha ocurrido un error inesperado" + error}, {status:500});
    }

}