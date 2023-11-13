"use client"
import { signOut } from "next-auth/react";

function DashboardPage(){
    return(
        <>
            <div>
                Bienvenido 
            </div>

            <button onClick={()=>signOut({ callbackUrl: '/auth/login' })}>Cerrar sesion</button>
        
        </>
    );
}

export default DashboardPage;