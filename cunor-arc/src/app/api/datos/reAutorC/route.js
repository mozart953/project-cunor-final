import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function POST(request){
    const datos = await request.json();

    const autorC = await db.autorCorporativo.create(
        {
            data:{
                nombreAutor: datos.nombreAutor,

            }
        }
    )

    return NextResponse.json(autorC);
}