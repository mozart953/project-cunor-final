import { NextResponse } from "next/server";
import db from '@/libs/db.js';

export async function GET(){
    const roles = await db.rol.findMany();
    //console.log(roles);
    return NextResponse.json(roles);
}

