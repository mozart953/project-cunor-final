"use client"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useLog2 from "@/hooks/log2";

function CompoListarArchivosPage(){
    const [datosg, setUsuario1] = useLog2(null);
    const [nombreusuario, setNombreusuario] = useState("");
    const [carrera, setCarrera] = useState("");
    const [idcarrera, setIdcarrera] = useState(0);
    const [idusuario, setIdusuario] = useState(null);
    const [trabajos, setTrabajos] = useState([]);
    const { data: session, status } = useSession();


    

    useEffect(()=>{

         
        if(session){
            const usuario = session?.user.name;
            console.log("viendo usuario " + JSON.stringify(session, null, 2));
            console.log("nombre del usuario desde lista de trabajos: " + usuario);
            setNombreusuario(usuario);
           
        
        }

    },[session])
   

    
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
        if(idcarrera!==0 && idusuario!==null){
            fetch(`/api/datos/reDetalleTrabajo?idUsuario=${idusuario}&idCarrera=${idcarrera}`)
            .then(data=>data.json()).then(datos=>{console.log(datos); setTrabajos([...datos,...trabajos])});
        }

    },[idcarrera, idusuario])





    return(
        <>
            <div className="text-white mb-5" style={{width:'80%', margin:'0 auto'}}>
                <legend className="text-center mb-4">Trabajos de graduación: {carrera}</legend>


            {
                
                        trabajos.map((data)=>(

                                
                                    
                                    <div className="card mb-4" style={{width:'80%', margin:'0 auto'}} key={data.ID_Detalle}>
                                        <div className="card-header">
                                             Autor: {data.autor.primerNombre} {data.autor.segundoNombre} {data.autor.tercerNombre} {data.autor.primerApellido} {data.autor.segundoApellido}
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Título: {data.trabajoGrad.titulo}</h5>
                                            <p className="card-text">Resumen: {data.trabajoGrad.descripcion} </p>
                                            <embed src={data.trabajoGrad.direccionGuardado} type="application/pdf"  width="100%" height="300px"  />
                                            <button type="button" className="btn btn-warning">Editar</button>
                                            <button type="button" className="btn btn-danger">Eliminar</button>
                        
                        
                                        </div>
                                    </div>
                               


                            )
                        
                            
                        )
            }

            </div>

            

        </>
    )
}

export default CompoListarArchivosPage;