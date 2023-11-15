"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function compoUsuariosPage({datos}){
    const router = useRouter();
    const [estado, setEstado] = useState({});
    

    const datos2 = datos.map(data=>data.rol);
    console.log("Viendo datos en Usuarios " + datos2 )
    console.log("Usuario " + datos.ID_Usuario );


    useEffect(()=>{
            console.log(estado)

            const estadoInicial = {};
            datos.forEach((data)=>{
                estadoInicial[data.ID_Usuario]=true;
            });
                   
            setEstado(estadoInicial);
        
    },[datos])

    

    return(
        <>
            <div>
                        <table className="table table-dark table-striped text-center">
                            <thead>
                                <tr>
                                <th scope="col">No.</th>
                                <th scope="col">DPI</th>
                                <th scope="col">Primer nombre</th>
                                <th scope="col">Primer apellido</th>
                                <th scope="col">Nombre de usuario</th>
                                <th scope="col">Rol</th>
                                <th scope="col">Carrera que opera</th>
                                <th scope="col">Operaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    datos.map((data, index)=>(
                                        <tr key={index}>
                                        <th scope="row">{data.ID_Usuario}</th>
                                        <td>{data.DPI}</td>
                                        <td>{data.primerNombre}</td>
                                        <td>{data.primerApellido}</td>
                                        <td>{data.nombreUsuario}</td>
                                        <td>{data.rol.nombreRol}</td>
                                        <td>{data.carrera.nombreCarrera}</td>
                                        <td>
                                        <button type="button" className="btn btn-secondary mr-4" style={{ marginRight: '10px' }} onClick={()=>{router.push(`/dashboardAdmin/EditarUsuario/${data.ID_Usuario}`)}}>Editar</button>
                                        
                                        {
                                          
                                           estado[data.ID_Usuario]?(
                                            <button type="button" className="btn  btn-outline-danger mr-8" style={{ marginRight: '10px' }} onClick={()=>{setEstado({...estado, [data.ID_Usuario]:false})}}>Deshabilitar</button>
                                        

                                           ):(
                                            <button type="button" className="btn  btn-outline-success"  style={{ marginRight: '10px' }} onClick={()=>{setEstado({...estado,[data.ID_Usuario]:true})}}>Habilitar</button>


                                           )
                                        }
                                        
                                        <button type="button" className="btn btn-light">Detalles</button>

                                        </td>
                                        </tr>        

                                    ))
                                }
                               
                            </tbody>
                        </table>


            </div>
                
        </>
    );

}

export default compoUsuariosPage;