"use client"
import React from "react";
import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { useRouter } from "next/navigation";

function EditFacultadPage({params}){
    const {register, handleSubmit, setValue,formState:{errors}} = useForm();
    const [registro, setRegistro] = useState(false);

    const [facultad,setFacultad] = useState();

    const [datosfacultad, setDatosfacultad] = useState({});

    const route = useRouter();
    
    useEffect(() => {
        if (registro) {
            const timer = setTimeout(() => {
                setRegistro(false);
            }, 6000);

            return () => clearTimeout(timer);
        }
    }, [registro]);  

    useEffect(()=>{
        if(datosfacultad){
            setValue('nombreFacultad', facultad);
        }
    },[datosfacultad])


    useEffect(()=>{
        fetch(`/api/datos/reFacultades/${params.id}`).then(datos=>datos.json())
            .then(data=>{
                
                setDatosfacultad(data);

                 setFacultad(data.nombreFacultad);

                 console.log(data.nombreFacultad);
                });
    },[]);

    const onSubmit = handleSubmit(async (data)=>{

        /*if(data.contrasenia != data.contrasenia2){
            return alert("Las contrasenias no coinciden...");

        }*/
        console.log("Comprobando datos: "+data.nombreFacultad);

        const datos = await fetch(`/api/datos/reFacultades/${params.id}`,{
            method:'PUT',
            body:JSON.stringify({
                nombreFacultad:data.nombreFacultad,            
                  

            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        //const respuesta = await datos.json();
        if(datos.ok){
           setRegistro(true);
           route.push('/dashboardAdmin/adminFacultades');
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
                    
                        <legend className="text-center mb-4"><strong>Edición de facultad -CUNOR-</strong></legend>

                        <div className='row mb-3'>
                            <div className="col-2">
                                <label htmlFor="disabledTextInput" className="text-white"><strong>Nombre de la facultad</strong></label>
                            </div>

                            <div className="col"> 
                                <input type="text" placeholder="Facultad"  onChange={(e)=>{setValue('nombreFacultad', e.target.value, {shouldValidate: true});setFacultad(e.target.value)}}  {...register("nombreFacultad", {required: {value: true, message:'Es necesario escribir el nombre de la facultad...'}})} className="form-control bg-secondary text-white" />
                            </div> 

                            {
                                    errors.nombreFacultad && (                                  
                                                                
                                            <span className="badge rounded-pill text-bg-danger">{errors.nombreFacultad.message}</span>


                                    )
                            }

                

                        </div>
                      
                       

                        <button type="submit" className="btn btn-outline-success w-100 mt-3">
                            Actualizar facultad
                        </button>
                        
                    
                    
                </form>

            </div>
            
           

            {
                registro &&(

                    <div className="d-flex justify-content-end">
                        <div className="alert alert-success" role="alert">
                            ¡Editado correctamente!
                        </div>

                    </div>
                    
                )
            }
        </>
    );
}

export default EditFacultadPage;