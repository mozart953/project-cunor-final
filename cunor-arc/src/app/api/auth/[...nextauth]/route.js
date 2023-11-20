import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from '@/libs/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const authOptions ={
    providers:[
        CredentialsProvider(
            {
                name:"Credentials",
                
                credentials:{
                    username:{label: "Username", type: "text", placeholder: "jsmith"},
                    password: { label: "Password", type: "password", placeholder: "password"  }
                },

                async authorize(credentials, req){

                    const usuarioEncontrado = await db.usuario.findUnique({
                        where:{
                            nombreUsuario: credentials.username,
                            
                        },
                        include:{
                            rol:true,
                        },
                    });

                    if(!usuarioEncontrado){throw new Error('Usuario no encontrado...')}

                    console.log(usuarioEncontrado);

                    const comparandoContrasenias = await bcrypt.compare(credentials.password, usuarioEncontrado.Contrasenia);
                    
                    if(!comparandoContrasenias){
                        throw new Error('Contraseña incorrecta')
                    }

                    const user = {
                        
                        id: usuarioEncontrado.ID_Usuario,
                        name: usuarioEncontrado.nombreUsuario,
                        role: usuarioEncontrado.rol.nombreRol,
                        

                    };

                    const token = jwt.sign({ ...user, exp: Math.floor(Date.now() / 1000) + 60 * 60 }, process.env.NEXTAUTH_SECRET);

                    return {
                        ...user,
                        token,
                    };
                },
            }
        )
    ],
    pages: {
        signIn:"/auth/login",
    }, 
           
    
};

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
