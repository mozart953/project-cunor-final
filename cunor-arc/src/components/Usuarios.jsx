"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function compoUsuariosPage({datos}){
    const router = useRouter();
    const [estado, setEstado] = useState({});
    const [datoss, setDatoss] = useState([]);
    

    const datos2 = datos.map(data=>data.rol);
    console.log("Viendo datos en Usuarios " + datos2 )
    console.log("Usuario " + datos.ID_Usuario );


    useEffect(()=>{
        setDatoss(datos);
    },[datos])
    

    console.log("Datoss: " + datoss.map(data=>data.ID_Usuario));


    useEffect(()=>{

        if(datoss){

            console.log(estado)

            const estadoInicial = {};
            datoss.forEach((data)=>{

                if(data.ID_estado==1){
                    estadoInicial[data.ID_Usuario]=true; 

                }else{
                    estadoInicial[data.ID_Usuario]=false;
                }

              
            });
                   
            setEstado(estadoInicial);
        }
        
    },[datoss])


    const actualizarEstado = async (id,estado)=>{
        console.log("valor"+estado);
        if(estado==1){
            estado=2;
        }else{
            estado=1;
        }
        
        try{

            const estaDo= await fetch(`/api/datos/reEstadoU/${id}`,{
                method:'PUT',
                body:JSON.stringify({
                    ID_estado:Number(estado),
    
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(data=>data.json())
            .then(datos=>console.log(datos));
            console.log(estaDo);

            const respuesta = await fetch('/api/datos/reUsuarios');
            const dtos = await respuesta.json();
            setDatoss(dtos);

        }catch(error){
            console.log("Ha ocurrido un error: " + error);
        }

    }

    

    return(
        <>
            
            <div className="card text-bg-secondary mb-3 rounded-xl" style={{width:'50%', margin:'0 auto', borderRadius:'15px'}}>
                    <div className="card-body">
                        <legend className="text-center mb-4">Gestión de usuarios -CUNOR-</legend>                       
                    </div>
            </div>

            <div className="mt-4">
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
                                    datoss.map((data, index)=>(
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
                                          
                                           data.ID_rol!==1 &&(estado[data.ID_Usuario]?(
                                            <button type="button" className="btn  btn-outline-danger mr-8" style={{ marginRight: '10px' }} onClick={()=>{setEstado({...estado, [data.ID_Usuario]:false}); actualizarEstado(data.ID_Usuario, data.ID_estado);}}>Deshabilitar</button>
                                        

                                           ):(
                                            <button type="button" className="btn  btn-outline-success"  style={{ marginRight: '10px' }} onClick={()=>{setEstado({...estado,[data.ID_Usuario]:true}); actualizarEstado(data.ID_Usuario, data.ID_estado);}}>Habilitar</button>


                                           ) )
                                        }
                                        
                                        <button type="button" className="btn btn-light" onClick={()=>{router.push(`/dashboardAdmin/adminUsuarios/detallesUsuario/${data.ID_Usuario}`)}}>Detalles</button>

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