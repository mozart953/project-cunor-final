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

                <div className="card text-bg-secondary mb-3" style={{width:'80%', margin:'0 auto'}}>
                    <div className="card-header">Usuario operativo: {nombreusuario}</div>
                    <div className="card-body">
                        <legend className="text-center mb-4">Trabajos de graduación: {carrera}</legend>                       
                    </div>
                </div>

                


            {
                
                        trabajos.map((data)=>(

                                
                                    
                                    <div className="card mb-4" style={{width:'80%', margin:'0 auto'}} key={data.ID_Detalle}>
                                        <div className="card-header">
                                             Autor: {data.autor.primerNombre} {data.autor.segundoNombre} {data.autor.tercerNombre} {data.autor.primerApellido} {data.autor.segundoApellido}
                                        </div>

                                        

                                        <div className="card-body">
                                            
                                            <h5 className="card-title">Título: {data.trabajoGrad.titulo}</h5>

                                            <div className="card text-bg-secondary mb-3" >
                                                <div className="card-body">
                                                    <h5 className="card-title">Resumen:</h5>
                                                    <p className="card-text">{data.trabajoGrad.descripcion}</p>
                                                </div>
                                            </div>


                                            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                
                                                <div className="col" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <h6 className="card-title" style={{ margin: 0, padding: 0 }}>Carrera: </h6>
                                                    <p className="card-text ps-2" style={{ margin: 0, padding: 0 }}>{data.carrera.nombreCarrera} </p>
                                                </div>
                                                <div className="col" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <h6 className="card-title" style={{ margin: 0, padding: 0 }}>Categoría: </h6>
                                                    <p className="card-text ps-2" style={{ margin: 0, padding: 0 }}>{data.categoria.nombreCategoria} </p>
                                                </div>
                                                <div className="col" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <h6 className="card-title" style={{ margin: 0, padding: 0 }}>No. páginas: </h6>
                                                    <p className="card-text ps-2" style={{ margin: 0, padding: 0 }}>{data.trabajoGrad.cantidadPaginas} </p>
                                                </div>
                                                <div className="col" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <h6 className="card-title" style={{ margin: 0, padding: 0 }}>Formato: </h6>
                                                    <p className="card-text ps-2" style={{ margin: 0, padding: 0 }}>{data.archivo.formato} </p>
                                                </div>
                                                <div className="col" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <h6 className="card-title" style={{ margin: 0, padding: 0 }}>Fecha de carga: </h6>
                                                    <p className="card-text ps-2" style={{ margin: 0, padding: 0 }}>
                                                        {new Date(data.fechaCarga).getDate()}/{new Date(data.fechaCarga).getMonth()+1}/{new Date(data.fechaCarga).getFullYear()}
                                                         - {new Date(data.fechaCarga).getHours()}:{new Date(data.fechaCarga).getMinutes()<10?'0'+new Date(data.fechaCarga).getMinutes():new Date(data.fechaCarga).getMinutes()}:{new Date(data.fechaCarga).getSeconds()}
                                                    </p>
                                                </div>
                                                <div className="col" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <h6 className="card-title" style={{ margin: 0, padding: 0 }}>URL: </h6>
                                                    <h6 className="card-text ps-2" style={{ margin: 0, padding: 0 }}>
                                                       <a href={data.trabajoGrad.direccionGuardado}>{data.trabajoGrad.titulo}</a>  
                                                    </h6>
                                                </div>

                                            </div>

                                            <embed src={data.trabajoGrad.direccionGuardado} type="application/pdf"  width="100%" height="300px"  />
                                             
                                            <div className="col" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                                <button type="button" className="btn btn-danger">Eliminar</button>
                                                <button type="button" className="btn btn-warning">Editar</button>
                                            </div>

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