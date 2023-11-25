"use client"
import CompoListarArchivosPage from "@/components/ListarArchivos";
import { SessionProvider } from "next-auth/react";

function listaTrabajosGraduacionPage(){

    return(
        <>
            <SessionProvider>
                <CompoListarArchivosPage />
            </SessionProvider>
        </>
    );

}

export default listaTrabajosGraduacionPage;