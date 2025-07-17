import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function PUT(request, {params}){
    const datos = await request.json();

    try{
        const autorC = await db.autorCorporativo.update(
            {
                where:{
                    ID_AutorC:Number(params.id),
                },
                data:{
                    nombreAutor: datos.nombreAutor,

                }
            }
        )

        return NextResponse.json(autorC);
    }catch(error){
        console.log(error);
        return NextResponse.json({message: "Ha ocurrido un error inesperado."},{status:500});
    }
} 