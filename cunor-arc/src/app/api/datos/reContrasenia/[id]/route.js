import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import db from '@/libs/db.js';

export async function PUT(request,{params}){

            try{
                        const data =  await request.json();

                        console.log(data);

                        const hashedPassword = await bcrypt.hash(data.Contrasenia, 10);

                        const dato = await db.usuario.update({
                            where:{
                                ID_Usuario:Number(params.id),

                            },
                            data:{

                                    Contrasenia: hashedPassword,
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

