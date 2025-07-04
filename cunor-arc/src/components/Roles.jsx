"use client"
import { useRouter } from "next/navigation";

function CompoRolesPage({datos}){

    const router = useRouter();

    return(
        <>
            <div className="card text-bg-secondary mb-3" style={{width:'40%', margin:'0 auto', borderRadius:'15px'}}>
                    <div className="card-body">
                        <legend className="text-center mb-4"> <i className="bi bi-person-fill-lock"></i> <strong>Roles del sistema</strong></legend>                       
                    </div>
            </div>

{/* 
         <div className="d-flex content-center" style={{paddingTop:'20px', paddingLeft:'100px', paddingBottom:'10px'}}>
                <div style={{paddingTop:'20px', paddingLeft:'10px', paddingBottom:'10px'}}>
                    <button type="button" className="btn btn-success" 
                        onClick={()=>{router.push('/dashboardAdmin/adminRoles/asignarPermisos/crearPermisos')}}
                    ><i className="bi bi-plus-lg"></i>Crear permiso</button>
                </div> 

                <div style={{paddingTop:'20px', paddingLeft:'10px', paddingBottom:'10px'}}>
                    <button type="button" className="btn btn-danger" 
                        onClick={()=>{router.push('/dashboardAdmin/adminRoles/asignarRestricciones/crearRestricciones')}}
                    ><i className="bi bi-plus-lg"></i>Crear restricción</button>
                </div> 

         </div> */}

            

            <div className="mt-4 d-flex content-center" style={{width:'85%', margin:'0 auto'}}>
                        <table className="table table-dark table-striped text-center" style={{borderRadius: '15px', overflow: 'hidden', border:'1px solid gray'}}>
                            <thead>
                                <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Nombre del rol</th>
                                {/* <th scope="col">Operaciones</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    datos.map((data, index)=>(
                                        <tr key={index}>
                                        <th scope="row">{data.ID_Rol}</th>
                                        <td>{data.nombreRol}</td>
                                        {/* <td>
                                        <button type="button" className="btn btn-success mr-4" style={{ marginRight: '10px' , marginLeft:'10px'}} onClick={()=>{router.push(`/dashboardAdmin/adminRoles/asignarPermisos/${data.ID_Rol}`)}}><i className="bi bi-plus-lg"></i>Agregar permisos</button>
                                        <button type="button" className="btn btn-warning" style={{ marginRight: '10px' }} onClick={()=>{router.push(`/dashboardAdmin/adminRoles`)}}><i className="bi bi-plus-lg"></i>Agregar restricciones</button>
                                        <button type="button" className="btn btn-info" style={{ marginRight: '10px' }} onClick={()=>{router.push(`/dashboardAdmin/adminRoles`)}}><i className="bi bi-plus-lg"></i>Detalles</button>                                                                              
                                        

                                        </td> */}
                                        </tr>        

                                    ))
                                }
                               
                            </tbody>
                        </table>


            </div>
        
        </>
    );


}

export default CompoRolesPage;