"use client"
import React from "react";
import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { useRouter } from "next/navigation";

function CrearPermisoPage(){

    const {register, handleSubmit, formState:{errors}} = useForm();
    const [registro, setRegistro] = useState(false);

    //const [carrera,setCarrera] = useState();

    const route = useRouter();
    
    useEffect(() => {
        if (registro) {
            const timer = setTimeout(() => {
                setRegistro(false);
            }, 6000);

            return () => clearTimeout(timer);
        }
    }, [registro]);  


    /*useEffect(()=>{
        fetch(`/api/datos/reCarrera/${params.id}`).then(datos=>datos.json())
            .then(data=>{
                 
                 setCarrera(data.nombreCarrera)

                 console.log(data.nombreCarrera)
                });
    },[]);*/

    const onSubmit = handleSubmit(async (data)=>{

        /*if(data.contrasenia != data.contrasenia2){
            return alert("Las contrasenias no coinciden...");

        }*/

        const datos = await fetch(`/api/datos/rePermisos`,{
            method:'POST',
            body:JSON.stringify({
                nombrePermiso:data.Permiso,            
                  

            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        //const respuesta = await datos.json();
        if(datos.ok){
           setRegistro(true);
           route.push('/dashboardAdmin/adminRoles');
           route.refresh();
        }else{
            alert("Algo salio mal..."); //cambiar diseno
        }
        console.log(datos);
        
    }); 



    return(
        <>
            <div className="d-flex justify-content-center align-items-center bg-dark text-white ">
                <form  onSubmit={onSubmit} className="w-50">
                    
                        <legend className="text-center mb-4">Creación de permisos -CUNOR-</legend>

                        <div className='row mb-3'>
                            <div className="col-4">
                                <label htmlFor="disabledTextInput" className="text-white">Nombre del permiso</label>
                            </div>

                            <div className="col"> 
                                <input type="text" placeholder="Permiso"  {...register("Permiso", {required: {value: true, message:'Es necesario escribir el nombre del permiso...'}})}   className="form-control bg-secondary text-white" />
                            </div> 

                            {
                                errors.Permiso && (                                  
                                    
                                    <span className="badge rounded-pill text-bg-danger">{errors.Permiso.message}</span>


                                )
                            }

                

                        </div>
                      
                       

                        <button type="submit" className="btn btn-outline-success w-100 mt-3">
                            Crear permiso
                        </button>
                        
                    
                    
                </form>

            </div>
            
           

            {
                registro &&(

                    <div className="d-flex justify-content-end">
                        <div className="alert alert-success" role="alert">
                            ¡Permiso creado correctamente!
                        </div>

                    </div>
                    
                )
            }
            
        </>
    );
}

export default CrearPermisoPage;