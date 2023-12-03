"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function compoCarrerasPage({datos}){
    const router = useRouter();


    return(
        <>
            <div className="card text-bg-secondary mb-3" style={{width:'50%', margin:'0 auto', borderRadius:'15px'}}>
                    <div className="card-body">
                        <legend className="text-center mb-4">Gestión de carreras -CUNOR-</legend>                       
                    </div>
            </div>

            <div style={{paddingTop:'20px', paddingLeft:'10px', paddingBottom:'10px'}}>
                <button type="button" className="btn btn-outline-success" 
                    onClick={()=>{router.push('/dashboardAdmin/adminCarreras/crearCarrera')}}
                >Agregar carrera</button>
            </div>
            

            <div>
                        <table className="table table-dark table-striped text-center">
                            <thead>
                                <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Nombre de la carrera</th>
                                <th scope="col">Operaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    datos.map((data, index)=>(
                                        <tr key={index}>
                                        <th scope="row">{data.ID_Carrera}</th>
                                        <td>{data.nombreCarrera}</td>
                                        <td>
                                        <button type="button" className="btn btn-secondary mr-4" style={{ marginRight: '10px' }} onClick={()=>{router.push(`/dashboardAdmin/adminCarreras/editarCarrera/${data.ID_Carrera}`)}}>Editar</button>
                                        
                                        
                                        

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

export default compoCarrerasPage;