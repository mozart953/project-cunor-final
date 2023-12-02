"use client"
import { SessionProvider } from "next-auth/react";
import CompoConfigurarUsuario from "@/components/ConfigurarUsuario";
function GeneralPage(){

    return(
        <>
            <SessionProvider>
                <CompoConfigurarUsuario />
            </SessionProvider>

        </>
    );

}

export default GeneralPage;