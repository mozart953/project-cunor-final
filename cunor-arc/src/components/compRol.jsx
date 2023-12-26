"use client"
import { useSession } from "next-auth/react";
import GraficoBarrasComponent from "@/components/graficosDashboards/graficosAdmin/GraficoBarras";
import GraficoBarrasUsuarioCarreraComponent from "@/components/graficosDashboards/graficosAdmin/GraficoBarrasUsuarioCarrera";
import GraficoTrabajosTotalesGComponent from "@/components/graficosDashboards/graficosAdmin/GraficosTrabajosTotalesG";
import GraficoTrabajosCarrerasGComponent from "@/components/graficosDashboards/graficosAdmin/GraficosTrabajosCarrerasG";
import GraficoTrabajosCategoriasGComponent from "@/components/graficosDashboards/graficosAdmin/GraficoTrabajosCategoriasG";

import { useState, useEffect } from "react";

function CompRolPage(){

    const { data: session, status } = useSession()
    const loading = status === 'loading';
    const [nombreusuario, setNombreusuario] = useState("");

    
    // const role = session?.user?.role;
    // console.log("viendo rol " + JSON.stringify(session, null, 2));
    console.log("Entranda a dashboard admin");

    useEffect(()=>{

         
        if(session){
            const usuario = session?.user.name;
            //console.log("viendo usuario " + JSON.stringify(session, null, 2));
            console.log("nombre del usuario desde lista de trabajos: " + usuario);
            setNombreusuario(usuario);
           
        
        }

    },[session]);

    // if (loading) {
    //     return <div>Cargando...</div>;
    // }


  return (
   
      <>

                <div className="card text-bg-secondary mb-3" style={{width:'70%', margin:'0 auto'}}>
                    <div className="card-header">Dashboard Administrativo</div>
                    <div className="card-body">
                        <legend className="text-center mb-4">Bienvenido usuario administrativo: {nombreusuario}</legend>                       
                    </div>
                </div>

            <div className="d-flex justify-content-center align-items-center mb-3">
                <div className="bg-dark mb-3 me-3">
                    <div>
                        <p className="text-center mb-2 text-white" style={{fontWeight:'bold'}}>Usuarios del sistema</p>
                    </div>
                    
                    <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{width:"450px", height:"230px"}}>
                        
                        <GraficoBarrasComponent />
                    </div>

                </div>

                
                <div className="bg-dark">
                    <div>
                        <p className="text-center mb-2 text-white" style={{fontWeight:'bold'}}>Usuarios registrados por carrera</p>
                    </div>
                    
                    <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{width:"600px", height:"300px"}}>
                        
                        <GraficoBarrasUsuarioCarreraComponent />
                    </div>

                </div>

            </div>

            
            <div className="d-flex justify-content-center align-items-center mb-3">
                <div className="bg-dark mb-3 me-3">
                    <div>
                        <p className="text-center mb-2 text-white" style={{fontWeight:'bold'}}>Registros totales de trabajos de graduación</p>
                    </div>
                    
                    <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{width:"450px", height:"230px"}}>
                        
                        <GraficoTrabajosTotalesGComponent />
                    </div>

                </div>

                
                <div className="bg-dark">
                    <div>
                        <p className="text-center mb-2 text-white" style={{fontWeight:'bold'}}>Cantidad de trabajos de graduación por carrera</p>
                    </div>
                    
                    <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{width:"600px", height:"300px"}}>
                        <GraficoTrabajosCarrerasGComponent />
                    </div>

                </div>

            </div>

            
            <div className="d-flex justify-content-center align-items-center">
                <div className="bg-dark mb-3 me-3">
                    <div>
                        <p className="text-center mb-2 text-white" style={{fontWeight:'bold'}}>Cantidad de trabajos de graduación por categoria</p>
                    </div>
                    
                    <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{width:"600px", height:"300px"}}>
                        
                        <GraficoTrabajosCategoriasGComponent />
                    </div>

                </div>


            </div>


      </>
   
  );
}


export default CompRolPage;
