import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import db from '@/libs/db.js';

export async function POST(request){

            try{
                        const data =  await request.json();

                        console.log(data);

                        const usuarioEncontrado = await db.usuario.findUnique({
                            where: {
                              nombreUsuario: data.nombreUsuario,
                            },
                          });
                      
                          if (usuarioEncontrado) {
                            return NextResponse.json(
                              {
                                message: "El usuario ya existe",
                              },
                              {
                                status: 400,
                              }
                            );
                          }

                        const hashedPassword = await bcrypt.hash(data.Contrasenia, 10);

                        const dato = await db.usuario.create({
                            data:{
                                    DPI:data.DPI,
                                    primerNombre:data.primerNombre,
                                    primerApellido:data.primerApellido,
                                    nombreUsuario: data.nombreUsuario,
                                    Contrasenia: hashedPassword,
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

    

