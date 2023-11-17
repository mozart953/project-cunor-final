"use client"
import React from "react";
import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { useRouter } from "next/navigation";

function CrearRestriccionPage(){

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

        const datos = await fetch(`/api/datos/reRestricciones`,{
            method:'POST',
            body:JSON.stringify({
                nombreRestriccion:data.Restriccion,            
                  

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
                    
                        <legend className="text-center mb-4">Creación de restricciones -CUNOR-</legend>

                        <div className='row mb-3'>
                            <div className="col-4">
                                <label htmlFor="disabledTextInput" className="text-white">Nombre de la restricción</label>
                            </div>

                            <div className="col"> 
                                <input type="text" placeholder="Restriccion"  {...register("Restriccion", {required: {value: true, message:'Es necesario escribir el nombre de la restricción...'}})}   className="form-control bg-secondary text-white" />
                            </div> 

                            {
                                errors.Restriccion && (                                  
                                    
                                    <span className="badge rounded-pill text-bg-danger">{errors.Restriccion.message}</span>


                                )
                            }

                

                        </div>
                      
                       

                        <button type="submit" className="btn btn-outline-success w-100 mt-3">
                            Crear restricción
                        </button>
                        
                    
                    
                </form>

            </div>
            
           

            {
                registro &&(

                    <div className="d-flex justify-content-end">
                        <div className="alert alert-success" role="alert">
                            ¡Restricción creado correctamente!
                        </div>

                    </div>
                    
                )
            }
            
        </>
    );
}

export default CrearRestriccionPage;