"use client"
import SubaArchivoPage from '@/components/subidaArchivo';
import { SessionProvider } from "next-auth/react";


function subidaTrabajosPage(){
    return(
        <>
             <SessionProvider>
                <SubaArchivoPage />
             </SessionProvider>
                
             
            
        </>
    );
}

export default subidaTrabajosPage;