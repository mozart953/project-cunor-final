"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function compoCarrerasPage({datos}){
    const router = useRouter();


    return(
        <>
            <div className="card text-bg-secondary mb-3" style={{width:'50%', margin:'0 auto', borderRadius:'15px'}}>
                    <div className="card-body">
                        <legend className="text-center mb-4"><i className="bi bi-pin-angle-fill"></i>Gestión de carreras -CUNOR-</legend>                       
                    </div>
            </div>

            <div className="d-flex content-center" style={{paddingTop:'20px', paddingLeft:'100px', paddingBottom:'10px'}}>
                <button type="button" className="btn btn-success" 
                    onClick={()=>{router.push('/dashboardAdmin/adminCarreras/crearCarrera')}}
                ><i className="bi bi-plus-lg"></i>Agregar carrera</button>
            </div>
            

            <div className="mt-4" style={{width:'85%', margin:'0 auto'}}>
                        <table className="table table-dark table-striped text-center" style={{borderRadius: '15px', overflow: 'hidden', border:'1px solid gray'}}>
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
                                        <button type="button" className="btn btn-secondary mr-4" style={{ marginRight: '10px' }} onClick={()=>{router.push(`/dashboardAdmin/adminCarreras/editarCarrera/${data.ID_Carrera}`)}}><i className="bi bi-pencil-square"></i></button>
                                        
                                        
                                        

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