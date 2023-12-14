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

export async function POST(request){
    const datos = await request.json();

    const detalle = await db.registroTrabajoGraduacion.create(
        {
            data:{
                ID_trabajo:Number(datos.ID_trabajo),
                ID_categoria: Number(datos.ID_categoria),
                ID_archivo: Number(datos.ID_archivo),
                ID_carrera: Number(datos.ID_carrera),
                ID_autor: Number(datos.ID_autor),
                ID_usuario: Number(datos.ID_usuario),
                ID_estado: Number(datos.ID_estado),

            }
        }
    )

    return NextResponse.json(detalle);
}

export async function GET(request){
    const paramametros = new URLSearchParams(request.url.split('?')[1]);
    const idUsuario = paramametros.get('idUsuario');
    const idCarrera = paramametros.get('idCarrera');
    const page = Number(paramametros.get('page')) || 1;
    const itemsPerPage = Number(paramametros.get('itemsPagina'));
    const searchTerm = paramametros.get('searchTerm')||'';
    const orderDirection = paramametros.get('orderDirection') || 'desc';
    const ordenCampo = paramametros.get('orderCampo')|| 'fechaCarga';
    
    let whereClause = { ID_usuario: Number(idUsuario), ID_carrera: Number(idCarrera),};

    try{

        if(searchTerm){
            whereClause={
                ...whereClause,
                OR:[
                    {trabajoGrad:{titulo:{contains:searchTerm}}},
                    {autor:{primerNombre:{contains:searchTerm}}},
                    {autor:{segundoNombre:{contains:searchTerm}}},
                    {autor:{tercerNombre:{contains:searchTerm}}},
                    {autor:{primerApellido:{contains:searchTerm}}},
                    {autor:{segundoApellido:{contains:searchTerm}}},
                    {categoria:{nombreCategoria:{contains:searchTerm}}},                
                ]
            };

        };

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
                    autor: true,
                    usuario:true,

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