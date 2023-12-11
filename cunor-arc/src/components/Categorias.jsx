"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function CompoCategorias(){
    const [datos, setDatos] = useState([]);

    const router = useRouter();

    useEffect(
        ()=>{
            fetch('/api/datos/reCategoria').then(data=>data.json())
            .then(datos=>{console.log("categorias: "+ datos);setDatos(datos)});
        },[])


    return(
        <>
            <div className="card text-bg-secondary mb-3 rounded-xl" style={{width:'50%', margin:'0 auto', borderRadius:'15px'}}>
                    <div className="card-body">
                        <legend className="text-center mb-4"><i className="bi bi-bookmark-fill"></i>Gestión de categorias</legend>                       
                    </div>
            </div>

            <div className="d-flex content-center" style={{paddingTop:'20px', paddingLeft:'100px', paddingBottom:'10px'}}>
                <button type="button" className="btn btn-success" onClick={()=>{router.push('/dashboardAdmin/adminCategorias/crearCategoria')}}><i className="bi bi-plus-lg"></i>Crear categoria</button>
            </div>

            <div className="mt-4 d-flex content-center" style={{width:'85%', margin:'0 auto'}}>
                <table className="table table-dark table-striped text-center" style={{borderRadius: '15px', overflow: 'hidden', border:'1px solid gray'}}>
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Operaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datos.map((data)=>(
                                <tr key={data.ID_Categoria}>
                                    <th scope="row">{data.ID_Categoria}</th>
                                    <td>{data.nombreCategoria}</td>
                                    <td>
                                        <button type="button" className="btn btn-secondary" 
                                        onClick={()=>{router.push(`/dashboardAdmin/adminCategorias/editarCategoria/${data.ID_Categoria}`)}}><i className="bi bi-pencil-square"></i></button>
                                    </td>
                                </tr>
                            )

                            )
                        }
                    </tbody>

                </table>

            </div>
        </>
    );
}

export default CompoCategorias;