"use client"
import React from "react";
import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { useRouter } from "next/navigation";

function EditCarreraPage({params}){
    const {register, handleSubmit, setValue,formState:{errors}} = useForm();
    const [registro, setRegistro] = useState(false);

    const [carrera,setCarrera] = useState();

    const [datoscarrera, setDatoscarrera] = useState({});

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
        if(datoscarrera){
            setValue('nombreCarrera', carrera);
        }
    },[datoscarrera])


    useEffect(()=>{
        fetch(`/api/datos/reCarrera/${params.id}`).then(datos=>datos.json())
            .then(data=>{
                
                setDatoscarrera(data);

                 setCarrera(data.nombreCarrera)

                 console.log(data.nombreCarrera)
                });
    },[]);

    const onSubmit = handleSubmit(async (data)=>{

        /*if(data.contrasenia != data.contrasenia2){
            return alert("Las contrasenias no coinciden...");

        }*/
        console.log("Comprobando datos: "+data.nombreCarrera);

        const datos = await fetch(`/api/datos/reCarrera/${params.id}`,{
            method:'PUT',
            body:JSON.stringify({
                nombreCarrera:data.nombreCarrera,            
                  

            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        //const respuesta = await datos.json();
        if(datos.ok){
           setRegistro(true);
           route.push('/dashboardAdmin/adminCarreras');
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
                    
                        <legend className="text-center mb-4">Edición de carreas -CUNOR-</legend>

                        <div className='row mb-3'>
                            <div className="col-2">
                                <label htmlFor="disabledTextInput" className="text-white">Carrera</label>
                            </div>

                            <div className="col"> 
                                <input type="text" placeholder="Carrera"  onChange={(e)=>{setValue('nombreCarrera', e.target.value, {shouldValidate: true});setCarrera(e.target.value)}}  {...register("nombreCarrera", {required: {value: true, message:'Es necesario escribir la carrera...'}})} className="form-control bg-secondary text-white" />
                            </div> 

                            {
                                    errors.nombreCarrera && (                                  
                                                                
                                            <span className="badge rounded-pill text-bg-danger">{errors.nombreCarrera.message}</span>


                                    )
                            }

                

                        </div>
                      
                       

                        <button type="submit" className="btn btn-outline-success w-100 mt-3">
                            Actualizar carrera
                        </button>
                        
                    
                    
                </form>

            </div>
            
           

            {
                registro &&(

                    <div className="d-flex justify-content-end">
                        <div className="alert alert-success" role="alert">
                            ¡Carrera editada correctamente!
                        </div>

                    </div>
                    
                )
            }
        </>
    );
}

export default EditCarreraPage;