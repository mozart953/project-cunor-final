import { NextResponse } from "next/server";
import db from '@/libs/db.js';

export async function GET(){
    const categora = await db.categoria.findMany();

    return NextResponse.json(categora);
}

export async function POST(request){
    const datos = await request.json();
    

    try{
        const categoria = await db.categoria.create(
            {
                data:{
                    nombreCategoria:datos.nombreCategoria,
                }
            }
        )
    
        return NextResponse.json(categoria);

    }catch(error){
        return NextResponse.json( {message:error.message}, {status:500});
    }


}