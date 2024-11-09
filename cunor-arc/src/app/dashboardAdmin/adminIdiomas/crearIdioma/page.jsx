"use client"
import React from "react";
import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { useRouter } from "next/navigation";

function CrearIdiomaPage(){
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

        const datos = await fetch(`/api/datos/reIdiomas`,{
            method:'POST',
            body:JSON.stringify({
                nombre:data.Nombre,            
                codigo:data.Codigo  

            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        //const respuesta = await datos.json();
        if(datos.ok){
           setRegistro(true);
           route.push('/dashboardAdmin/adminIdiomas');
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
                            onClick={()=>{route.push('/dashboardAdmin/adminIdiomas')}}
                        ><i className="bi bi-backspace-fill"></i><strong>Regresar</strong></button>
                    </div>
                </div>

              <div className="d-flex justify-content-center align-items-center bg-dark text-white ">
                <form  onSubmit={onSubmit} className="w-50">
                    
                        <legend className="text-center mb-4"><strong>Creación de idioma -CUNOR-</strong></legend>

                        <div className='row mb-3'>
                            <div className="col-4">
                                <label htmlFor="disabledTextInput" className="text-white"><strong>Nombre del idioma</strong></label>
                            </div>

                            <div className="col"> 
                                <input type="text" placeholder="Nombre"  {...register("Nombre", {required: {value: true, message:'Es necesario escribir el nombre del idioma...'}})}   className="form-control bg-secondary text-white" />
                            </div> 

                            {
                                errors.Nombre && (                                  
                                    
                                    <span className="badge rounded-pill text-bg-danger">{errors.Nombre.message}</span>


                                )
                            }

                

                        </div>

                        <div className='row mb-3'>
                            <div className="col-4">
                                <label htmlFor="disabledTextInput" className="text-white"><strong>Código del idioma</strong></label>
                            </div>

                            <div className="col"> 
                                <input type="text" placeholder="Código"  {...register("Codigo", {required: {value: true, message:'Es necesario escribir el código del idioma...'}})}   className="form-control bg-secondary text-white" />
                            </div> 

                            {
                                errors.Codigo && (                                  
                                    
                                    <span className="badge rounded-pill text-bg-danger">{errors.Codigo.message}</span>


                                )
                            }

                

                        </div>
                      
                       

                        <button type="submit" className="btn btn-outline-success w-100 mt-3">
                            Crear idioma
                        </button>
                        
                    
                    
                </form>

            </div>
            
           

            {
                registro &&(

                    <div className="d-flex justify-content-end">
                        <div className="alert alert-success" role="alert">
                            ¡Creado correctamente!
                        </div>

                    </div>
                    
                )
            }
        </>
    );
}

export default CrearIdiomaPage;