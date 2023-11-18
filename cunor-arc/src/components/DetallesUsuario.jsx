"use client"
import { useEffect, useState } from "react";

function compoDetallesUsuarioPage({id}){

    const [datos0, setDatos] = useState([]);
    const [datos1, setDatos1] = useState({usuario:{}});
    console.log(id);

    useEffect(
        ()=>{
            fetch(`/api/datos/reDellesU/${id}`).then(data=>data.json())
            .then(datos=>{
                //console.log(datos0.usuario.nombreUsuario);
                setDatos(datos);
                setDatos1(datos);
            }
            )

        },[]
    );

    console.log(datos0.usuario);

    return(
        <>
           
            <div>

                {
                            datos0.length > 0?
                            
                                <table className="table table-dark table-striped text-center">
                                            <thead>
                                                <tr>
                                                <th scope="col">No.</th>
                                                <th scope="col">Fecha de Registro</th>
                                                <th scope="col">Usuario</th>
                                                <th scope="col">Descripcion</th>
                
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    datos0.map((data)=>(
                
                                                        <tr key={data.ID_Registro}>
                                                        <th scope="row">{data.ID_Registro}</th>
                                                        <td>{data.fechaRegistro}</td>
                                                        <td>{data.usuario.nombreUsuario}</td>
                                                        <td>{data.descripcion}</td>
                                                        </tr>        
                                                    ))
                                                }
                                               
                                            </tbody>
                                </table> 
                            
                            :

                            <div className="d-flex justify-content-center align-items-center" style={{height: "100vh", color: "white"}}>
                                No existen datos disponibles
                            </div>                

                    
                }



            </div>
        </>
    );

}

export default compoDetallesUsuarioPage;