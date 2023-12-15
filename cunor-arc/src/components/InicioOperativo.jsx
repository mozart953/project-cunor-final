"use client"
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import useLog2 from "@/hooks/log2";
import GraficoUsuarioTrabajosComponent from "@/components/graficosDashboards/graficosOperativo/GraficoUsuarioTrabajos";
import GraficoTrabajosCarrerasComponent from "@/components/graficosDashboards/graficosOperativo/GraficoTrabajosCarreras";

function InicioOperativoComponent(){
    const [datosg, setUsuario1] = useLog2(null);
    const [nombreusuario, setNombreusuario] = useState("");
    const [carrera, setCarrera] = useState("");
    const [idcarrera, setIdcarrera] = useState(0);
    const [idusuario, setIdusuario] = useState(null);
    
    const [idcarrera1, setIdcarrera1]= useState(null);
    const [iduser1, setIduser1] = useState(null);

    const { data: session, status } = useSession();
    

    
    useEffect(()=>{

         
        if(session){
            const usuario = session?.user.name;
            console.log("viendo usuario " + JSON.stringify(session, null, 2));
            console.log("nombre del usuario desde lista de trabajos: " + usuario);
            setNombreusuario(usuario);
           
        
        }

    },[session]);

    useEffect(()=>{
        setUsuario1(nombreusuario);
           
   },[nombreusuario]);

   useEffect(()=>{
       if(datosg!==null && nombreusuario !==""){
                console.log("Datos del usuario: " + JSON.stringify(datosg));
                console.log("carrera del usuario: " + datosg.carrera.nombreCarrera);
                setCarrera(datosg.carrera.nombreCarrera);
                setIdcarrera(Number(datosg.carrera.ID_Carrera));
                setIdusuario(Number(datosg.ID_Usuario));
                console.log("ID de la carrera: "+ datosg.carrera.ID_Carrera);
            }
        
        }
    ,[datosg]);


    
    useEffect(()=>{
        if(idcarrera !==0 && idusuario!==null){
            if(!idcarrera1 && !iduser1){
                setIdcarrera1(idcarrera);
                setIduser1(idusuario);
            }
        }
    },[idcarrera, idusuario]);

    return(
        <>
            
            <div className="card text-bg-secondary mb-3" style={{width:'70%', margin:'0 auto'}}>
                    <div className="card-header">Dashboard Operativo/{carrera}</div>
                    <div className="card-body">
                        <legend className="text-center mb-4">Bienvenido usuario operativo: {nombreusuario}</legend>                       
                    </div>
            </div>

            
            <div className="d-flex justify-content-center align-items-center">
                <div className="bg-dark mb-3 me-3">
                    <div>
                        <p className="text-center mb-2 text-white" style={{fontWeight:'bold'}}>Trabajos de graduación registrados por {nombreusuario}</p>
                    </div>
                    
                    <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{width:"450px", height:"230px"}}>
                        <GraficoUsuarioTrabajosComponent idUsuario={iduser1} idCarrera={idcarrera1}/>                      

                    </div>

                </div>

                
                <div className="bg-dark">
                    <div>
                        <p className="text-center mb-2 text-white" style={{fontWeight:'bold'}}>Cantidad de trabajos de graduación por carrera</p>
                    </div>
                    
                    <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{width:"600px", height:"300px"}}>
                        <GraficoTrabajosCarrerasComponent />

                    </div>

                </div>

            </div>
        </>
    );
}

export default InicioOperativoComponent;