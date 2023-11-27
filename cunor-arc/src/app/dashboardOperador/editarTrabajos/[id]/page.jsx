"use client"
import { SessionProvider } from "next-auth/react";
import CompoEditarTrabajos from "@/components/EditarTrabajo";

function editarTrabajosPage({params}){

    return(
        <>
            <SessionProvider>
                <CompoEditarTrabajos idDetalle={params.id} />

            </SessionProvider>
        </>
    );

}

export default editarTrabajosPage;