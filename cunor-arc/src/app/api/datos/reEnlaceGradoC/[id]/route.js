import { NextResponse } from "next/server";
import db from "@/libs/db.js";

export async function GET(request, {params}) {
    
    const consulta = await db.enlaceGradoCarrera.findUnique({
        where:{
            ID_Carrera:Number(params.id),
        }
    });

    return NextResponse.json(consulta);

    
}

export async function PUT(request, { params }) {
    const datos = await request.json();

    // Elimina el registro antiguo
    await db.enlaceGradoCarrera.delete({
        where: {
            ID_Grado_ID_Carrera: {
                ID_Grado: Number(datos.old_ID_Grado),
                ID_Carrera: Number(params.id)
            }
        }
    });

    // Crea un nuevo registro con el ID_Grado actualizado
    const nuevoEnlace = await db.enlaceGradoCarrera.create({
        data: {
            ID_Grado: Number(datos.new_ID_Grado),
            ID_Carrera: Number(params.id),
            ID_Estado: Number(datos.ID_Estado) // Incluye otros campos necesarios
        }
    });

    return NextResponse.json(nuevoEnlace);
}
