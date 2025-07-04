"use client"
import { SessionProvider } from "next-auth/react";
import CompRolPage from "@/components/compRol";


 function DashboardPage(){

    // const sesion = await getServerSession(authOptions);

    // const rol = sesion?.user?.role;
    // console.log(rol);

    // const role = session?.user?.data?.role;
   
    // console.log(role);
   


    return(
        <>
        

          
                    {/* <div>
                        Bienvenido 
                    </div> */}


                    <SessionProvider>
               
                        <CompRolPage />
                    </SessionProvider>

     
                    

                    {/* <button onClick={()=>signOut({ callbackUrl: '/auth/login' })}>Cerrar sesion</button> */}


                   
            
        
        </>
    );
}

export default DashboardPage;