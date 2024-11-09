"use client"
import React from "react";
import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { useRouter } from "next/navigation";

function EditPaisPage({params}){
    const {register, handleSubmit, setValue,formState:{errors}} = useForm();
    const [registro, setRegistro] = useState(false);

    const [pais,setPais] = useState();
    const [codigopais, setCodigoPais] = useState();

    const [datospais, setDatosPais] = useState({});

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
        if(datospais){
            setValue('nombrePais', pais);
            setValue('codigoPais', codigopais);
        }
    },[datospais])


    useEffect(()=>{
        fetch(`/api/datos/rePaises/${params.id}`).then(datos=>datos.json())
            .then(data=>{
                
                setDatosPais(data);

                 setPais(data.nombrePais);
                 setCodigoPais(data.codigo);

                 console.log(data.nombre);
                });
    },[]);

    const onSubmit = handleSubmit(async (data)=>{

        /*if(data.contrasenia != data.contrasenia2){
            return alert("Las contrasenias no coinciden...");

        }*/
        console.log("Comprobando datos: "+data.nombrePais);

        const datos = await fetch(`/api/datos/rePaises/${params.id}`,{
            method:'PUT',
            body:JSON.stringify({
                nombrePais:data.nombrePais,
                codigo:data.codigoPais            
                  

            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        //const respuesta = await datos.json();
        if(datos.ok){
           setRegistro(true);
           route.push('/dashboardAdmin/adminPaises');
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
                                onClick={()=>{route.push('/dashboardAdmin/adminPaises')}}
                            ><i className="bi bi-backspace-fill"></i><strong>Regresar</strong></button>
                        </div>
            </div>

            <div className="d-flex justify-content-center align-items-center bg-dark text-white ">
                <form  onSubmit={onSubmit} className="w-50">
                    
                        <legend className="text-center mb-4"><strong>Edición de país -CUNOR-</strong></legend>

                        <div className='row mb-3'>
                            <div className="col-2">
                                <label htmlFor="disabledTextInput" className="text-white"><strong>Nombre del país</strong></label>
                            </div>

                            <div className="col"> 
                                <input type="text" placeholder="País"  onChange={(e)=>{setValue('nombrePais', e.target.value, {shouldValidate: true});setPais(e.target.value)}}  {...register("nombrePais", {required: {value: true, message:'Es necesario escribir el nombre del país...'}})} className="form-control bg-secondary text-white" />
                            </div> 

                            {
                                    errors.nombrePais && (                                  
                                                                
                                            <span className="badge rounded-pill text-bg-danger">{errors.nombrePais.message}</span>


                                    )
                            }

                

                        </div>

                        <div className='row mb-3'>
                            <div className="col-2">
                                <label htmlFor="disabledTextInput" className="text-white"><strong>Código del país</strong></label>
                            </div>

                            <div className="col"> 
                                <input type="text" placeholder="Código"  onChange={(e)=>{setValue('codigoPais', e.target.value, {shouldValidate: true});setCodigoPais(e.target.value)}}  {...register("codigoPais", {required: {value: true, message:'Es necesario escribir el código del pais...'}})} className="form-control bg-secondary text-white" />
                            </div> 

                            {
                                    errors.codigoPais && (                                  
                                                                
                                            <span className="badge rounded-pill text-bg-danger">{errors.codigoPais.message}</span>


                                    )
                            }

                

                        </div>
                      
                       

                        <button type="submit" className="btn btn-outline-success w-100 mt-3">
                            Actualizar Pais
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

export default EditPaisPage;