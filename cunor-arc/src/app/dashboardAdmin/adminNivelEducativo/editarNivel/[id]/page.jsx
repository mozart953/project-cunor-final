"use client"
import React from "react";
import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { useRouter } from "next/navigation";

function EditNivelPage({params}){
    const {register, handleSubmit, setValue,formState:{errors}} = useForm();
    const [registro, setRegistro] = useState(false);

    const [nivel,setNivel] = useState();

    const [datosnivel, setDatosnivel] = useState({});

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
        if(datosnivel){
            setValue('nombreNivel', nivel);
        }
    },[datosnivel])


    useEffect(()=>{
        fetch(`/api/datos/reNivelEducativo/${params.id}`).then(datos=>datos.json())
            .then(data=>{
                
                setDatosnivel(data);

                 setNivel(data.nombreNivelEducativo)

                 console.log(data.nombreNivelEducativo)
                });
    },[]);

    const onSubmit = handleSubmit(async (data)=>{

        /*if(data.contrasenia != data.contrasenia2){
            return alert("Las contrasenias no coinciden...");

        }*/
        console.log("Comprobando datos: "+data.nombreNivel);

        const datos = await fetch(`/api/datos/reNivelEducativo/${params.id}`,{
            method:'PUT',
            body:JSON.stringify({
                nombreNivelEducativo:data.nombreNivel,            
                  

            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        //const respuesta = await datos.json();
        if(datos.ok){
           setRegistro(true);
           route.push('/dashboardAdmin/adminNivelEducativo');
           route.refresh();
        }else{
            alert("Algo salio mal..."); //cambiar diseno
        }
        console.log(datos);
        
    }); 


    return(
        <>
            <div className="d-flex justify-content-between" style={{ padding: '2px 120px 10px 0px' }}>
                        <div className="d-flex content-center" style={{paddingTop:'20px', paddingLeft:'100px', paddingBottom:'10px'}}>
                            <button type="button" className="btn btn-primary" 
                                onClick={()=>{route.push('/dashboardAdmin/adminNivelEducativo')}}
                            ><i className="bi bi-backspace-fill"></i><strong>Regresar</strong></button>
                        </div>
            </div>

            <div className="d-flex justify-content-center align-items-center bg-dark text-white ">
                <form  onSubmit={onSubmit} className="w-50">
                    
                        <legend className="text-center mb-4"><strong>Edición de nivel educativo -CUNOR-</strong></legend>

                        <div className='row mb-3'>
                            <div className="col-2">
                                <label htmlFor="disabledTextInput" className="text-white"><strong>Nombre del nivel</strong></label>
                            </div>

                            <div className="col"> 
                                <input type="text" placeholder="Nivel"  onChange={(e)=>{setValue('nombreNivel', e.target.value, {shouldValidate: true});setNivel(e.target.value)}}  {...register("nombreNivel", {required: {value: true, message:'Es necesario escribir el nombre del nivel...'}})} className="form-control bg-secondary text-white" />
                            </div> 

                            {
                                    errors.nombreNivel && (                                  
                                                                
                                            <span className="badge rounded-pill text-bg-danger">{errors.nombreNivel.message}</span>


                                    )
                            }

                

                        </div>
                      
                       

                        <button type="submit" className="btn btn-outline-success w-100 mt-3">
                            Actualizar nivel educativo
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

export default EditNivelPage;