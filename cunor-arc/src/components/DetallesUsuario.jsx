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
            <div className="card text-bg-secondary mb-3 rounded-xl" style={{width:'50%', margin:'0 auto', borderRadius:'15px'}}>
                    <div className="card-body">
                        <legend className="text-center mb-4"><i className="bi bi-person-fill"></i><strong>Detalles del usuario</strong></legend>                       
                    </div>
            </div>
           
            <div className="mt-4" style={{width:'85%', margin:'0 auto'}}>

                {
                            datos0.length > 0?
                            
                                <table className="table table-dark table-striped text-center" style={{borderRadius: '15px', overflow: 'hidden', border:'1px solid gray'}}>
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
                                                        <td>
                                                        {new Date(data.fechaRegistro).getDate()}/{new Date(data.fechaRegistro).getMonth()+1}/{new Date(data.fechaRegistro).getFullYear()}
                                                        - {new Date(data.fechaRegistro).getHours()}:{new Date(data.fechaRegistro).getMinutes()<10?'0'+new Date(data.fechaRegistro).getMinutes():new Date(data.fechaRegistro).getMinutes()}:{new Date(data.fechaRegistro).getSeconds()}
                                                        </td>
                                                        <td>{data.usuario.nombreUsuario}</td>
                                                        <td>{data.descripcion}</td>
                                                        </tr>        
                                                    ))
                                                }
                                               
                                            </tbody>
                                </table> 
                            
                            :

                            <div className="d-flex justify-content-center align-items-center" style={{height: "50vh", color: "white"}}>
                                No existen datos disponibles para este usuario
                            </div>                

                    
                }



            </div>
        </>
    );

}

export default compoDetallesUsuarioPage;