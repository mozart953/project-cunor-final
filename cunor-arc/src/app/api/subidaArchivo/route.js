import { NextResponse } from "next/server";

export async function POST(request){

    const res = await request.formData();
    const archivo = res.get("file");
    console.log(res);

    if(!archivo){
        return NextResponse.json("No se ha seleccionado ningun archivo...", {
            status:400,
        })
    }

    return NextResponse.json("subida de archivo");
}