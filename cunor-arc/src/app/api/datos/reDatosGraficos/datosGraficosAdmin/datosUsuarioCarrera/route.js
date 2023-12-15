import { NextResponse } from "next/server";
import db from '@/libs/db';

export async function GET(){

    try{
        
        const carreras = await db.carrera.findMany(); 

        const totalPorCarrera = await db.usuario.groupBy({
            by:['ID_carrera'],
            _count:{
                _all:true,
            },
        });

        const resultados = carreras.map((data)=>{
            const conteo = totalPorCarrera.find(item=>item.ID_carrera===data.ID_Carrera);
            return{
                carrera:data.nombreCarrera,
                conteo:conteo && conteo._count ? conteo._count._all : 0, 
            };

            
        })


        return NextResponse.json(resultados);

    }catch(error){
        return NextResponse.json({message:"Ha ocurrido un error inesperado" + error}, {status:500});
    }

}