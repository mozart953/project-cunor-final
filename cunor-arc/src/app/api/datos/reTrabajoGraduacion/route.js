import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function POST(request){
    const datos = await request.json();

    try{

        const trabajo = await db.trabajoGraduacion.create(
            {
                data:{
                    correlativo:datos.correlativo,
                    titulo:datos.titulo,
                    cantidadPaginas: Number(datos.cantidadPaginas),
                    descripcion: datos.descripcion,
                    tamanio: Number(datos.tamanio),
                    direccionGuardado: datos.direccionGuardado,
                    paClave: datos.paClave,
                    notaTesis: datos.notaTesis,
                    editorial:datos.editorial


                }
            }
        )
        
        return NextResponse.json(trabajo);
    }
    catch(error){
        console.log(error);
        return NextResponse.json({message: "Ha ocurrido un error inesperado."},{status:500});
    }
}