"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useLog2 from "@/hooks/log2";


function CompoEditarTrabajos({idDetalle}){
    const [datosg, setUsuario1] = useLog2(null);
    const [nombreusuario, setNombreusuario] = useState("");
    const [carrera, setCarrera] = useState("");
    const [idcarrera, setIdcarrera] = useState(0);
    const [idusuario, setIdusuario] = useState(null);
    const [datostrabajo, setDatostrabajo] = useState({});


    
    const [idcarrera1, setIdcarrera1]= useState(null);
    const [iduser1, setIduser1] = useState(null);
    const { data: session, status } = useSession();


    
    useEffect(()=>{

         
        if(session){
            const usuario = session?.user.name;
            console.log("viendo usuario " + JSON.stringify(session, null, 2));
            console.log("nombre del usuario desde editar trabajos: " + usuario);
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


    useEffect(()=>{
        if(idcarrera1 && iduser1){
            fetch(`/api/datos/reDetalleTrabajo/filtroB?idDetalle=${idDetalle}&idUsuario=${iduser1}&idCarrera=${idcarrera1}`)
            .then(data => data.json()).then(datos=>{console.log(datos); setDatostrabajo(datos)});
        }
    },[idcarrera1, iduser1]);





    console.log(idDetalle);

    return(
        <>
            <div>Edicion de archivo {idDetalle}
                <div className="card text-bg-secondary mb-3" style={{width:'80%', margin:'0 auto'}}>
                    <div className="card-header">Usuario operativo: {nombreusuario}</div>
                    <div className="card-body">
                        <legend className="text-center mb-4">Edición de trabajos de graduación: {carrera}</legend>                       
                    </div>
                </div>
            
            
            </div>

        </>
    );
}

export default CompoEditarTrabajos;