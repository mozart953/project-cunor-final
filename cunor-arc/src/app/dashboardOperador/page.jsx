"use client"
import { SessionProvider } from "next-auth/react";
import InicioOperativoComponent from "@/components/InicioOperativo";
function DashboardOperadorPage(){

    return(
        <>
            <SessionProvider>
                <InicioOperativoComponent />
            </SessionProvider>

        </>
    );

}

export default DashboardOperadorPage;