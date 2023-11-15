
import { NextResponse } from 'next/server';
import db from '@/libs/db.js';


export async function GET(request,{params}){

    const usuarioEncontrado = await db.usuario.findUnique({
        where:{
            ID_Usuario:Number(params.id),
        }
    });
    

    return NextResponse.json(usuarioEncontrado);

}

export async function PUT(request,{params}){

    try{
        const data =  await request.json();

        console.log(data);

        const usuarioEncontrado = await db.usuario.findUnique({
            where: {
            nombreUsuario: data.nombreUsuario,
            },
        });
    
        if (usuarioEncontrado && usuarioEncontrado.ID_Usuario !== Number(params.id)) {
            return NextResponse.json(
            {
                message: "El usuario ya existe",
            },
            {
                status: 400,
            }
            );
        }

      

        const dato = await db.usuario.update({
            where:{
                ID_Usuario:Number(params.id),
            },
            data:{
                    DPI:data.DPI,
                    primerNombre:data.primerNombre,
                    primerApellido:data.primerApellido,
                    nombreUsuario: data.nombreUsuario,
                    ID_rol: data.ID_rol,
                    ID_estado: data.ID_estado,
                    ID_carrera:data.ID_carrera,
            }
        });

        //para no mostrar la contrasenia
        const {Contrasenia: _, ...usuario} = dato

        return NextResponse.json(usuario);
} catch(error){

return NextResponse.json({
    message:error.message
},
{
    status:500
}
); 

} 

}