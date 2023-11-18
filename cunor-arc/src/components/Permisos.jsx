"use client"
import { useRouter } from "next/navigation";

function PermisosPage({datos, id}){
    const router = useRouter(); 

    return(
        <>
            
                
            <div className="d-flex justify-content-center align-items-center" style={{height: "50vh"}}>
                        <table className="table table-dark table-striped text-center">
                            <thead>
                                <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Permiso</th>
                                <th scope="col">Operaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    datos.map((data, index)=>(
                                        <tr key={index}>
                                        <th scope="row">{data.ID_Permiso}</th>
                                        <td>{data.nombrePermiso}</td>
                                        <td>
                                        <button type="button" className="btn btn-outline-success mr-4" style={{ marginRight: '10px' , marginLeft:'10px'}} onClick={()=>{router.push(`/dashboardAdmin/adminRoles/asignarPermisos/${data.ID_Rol}`)}}>Agregar permiso</button>
                                        
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

export default PermisosPage;