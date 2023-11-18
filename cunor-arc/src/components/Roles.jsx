"use client"
import { useRouter } from "next/navigation";

function compoRolesPage({datos}){

    const router = useRouter();

    return(
        <>
         <div className="d-flex">
                <div style={{paddingTop:'20px', paddingLeft:'10px', paddingBottom:'10px'}}>
                    <button type="button" className="btn btn-outline-success" 
                        onClick={()=>{router.push('/dashboardAdmin/adminRoles/asignarPermisos/crearPermisos')}}
                    >Crear permiso</button>
                </div> 

                <div style={{paddingTop:'20px', paddingLeft:'10px', paddingBottom:'10px'}}>
                    <button type="button" className="btn btn-outline-danger" 
                        onClick={()=>{router.push('/dashboardAdmin/adminRoles/asignarRestricciones/crearRestricciones')}}
                    >Crear restricción</button>
                </div> 

         </div>

            

            <div className="d-flex justify-content-center align-items-center" style={{height: "50vh"}}>
                        <table className="table table-dark table-striped text-center">
                            <thead>
                                <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Nombre del rol</th>
                                <th scope="col">Operaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    datos.map((data, index)=>(
                                        <tr key={index}>
                                        <th scope="row">{data.ID_Rol}</th>
                                        <td>{data.nombreRol}</td>
                                        <td>
                                        <button type="button" className="btn btn-outline-success mr-4" style={{ marginRight: '10px' , marginLeft:'10px'}} onClick={()=>{router.push(`/dashboardAdmin/adminRoles/asignarPermisos/${data.ID_Rol}`)}}>Agregar permisos</button>
                                        <button type="button" className="btn btn-outline-warning" style={{ marginRight: '10px' }} onClick={()=>{router.push(`/dashboardAdmin/adminRoles`)}}>Agregar restricciones</button>
                                        <button type="button" className="btn btn-outline-info" style={{ marginRight: '10px' }} onClick={()=>{router.push(`/dashboardAdmin/adminRoles`)}}>Detalles</button>                                                                              
                                        

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

export default compoRolesPage;