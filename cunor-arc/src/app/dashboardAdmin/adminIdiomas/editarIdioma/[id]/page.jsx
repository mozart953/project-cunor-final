"use client"
import React from "react";
import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { useRouter } from "next/navigation";

function EditIdiomaPage({params}){
    const {register, handleSubmit, setValue,formState:{errors}} = useForm();
    const [registro, setRegistro] = useState(false);

    const [idioma,setIdioma] = useState();
    const [codigoidioma, setCodigoIdioma] = useState();

    const [datosidioma, setDatosIdioma] = useState({});

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
        if(datosidioma){
            setValue('nombreIdioma', idioma);
            setValue('codigoIdioma', codigoidioma);
        }
    },[datosidioma])


    useEffect(()=>{
        fetch(`/api/datos/reIdiomas/${params.id}`).then(datos=>datos.json())
            .then(data=>{
                
                setDatosIdioma(data);

                 setIdioma(data.nombre);
                 setCodigoIdioma(data.codigo);

                 console.log(data.nombre);
                });
    },[]);

    const onSubmit = handleSubmit(async (data)=>{

        /*if(data.contrasenia != data.contrasenia2){
            return alert("Las contrasenias no coinciden...");

        }*/
        console.log("Comprobando datos: "+data.nombreIdioma);

        const datos = await fetch(`/api/datos/reIdiomas/${params.id}`,{
            method:'PUT',
            body:JSON.stringify({
                nombre:data.nombreIdioma,
                codigo:data.codigoIdioma            
                  

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
        

            <div className="d-flex justify-content-center align-items-center bg-dark text-white ">
                <form  onSubmit={onSubmit} className="w-50">
                    
                        <legend className="text-center mb-4"><strong>Edición de Idioma -CUNOR-</strong></legend>

                        <div className='row mb-3'>
                            <div className="col-2">
                                <label htmlFor="disabledTextInput" className="text-white"><strong>Nombre del idioma</strong></label>
                            </div>

                            <div className="col"> 
                                <input type="text" placeholder="Idioma"  onChange={(e)=>{setValue('nombreIdioma', e.target.value, {shouldValidate: true});setIdioma(e.target.value)}}  {...register("nombreIdioma", {required: {value: true, message:'Es necesario escribir el nombre del idioma...'}})} className="form-control bg-secondary text-white" />
                            </div> 

                            {
                                    errors.nombreIdioma && (                                  
                                                                
                                            <span className="badge rounded-pill text-bg-danger">{errors.nombreIdioma.message}</span>


                                    )
                            }

                

                        </div>

                        <div className='row mb-3'>
                            <div className="col-2">
                                <label htmlFor="disabledTextInput" className="text-white"><strong>Código del idioma</strong></label>
                            </div>

                            <div className="col"> 
                                <input type="text" placeholder="Código"  onChange={(e)=>{setValue('codigoIdioma', e.target.value, {shouldValidate: true});setCodigoIdioma(e.target.value)}}  {...register("codigoIdioma", {required: {value: true, message:'Es necesario escribir el código del idioma...'}})} className="form-control bg-secondary text-white" />
                            </div> 

                            {
                                    errors.codigoIdioma && (                                  
                                                                
                                            <span className="badge rounded-pill text-bg-danger">{errors.codigoIdioma.message}</span>


                                    )
                            }

                

                        </div>
                      
                       

                        <button type="submit" className="btn btn-outline-success w-100 mt-3">
                            Actualizar idioma
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

export default EditIdiomaPage;