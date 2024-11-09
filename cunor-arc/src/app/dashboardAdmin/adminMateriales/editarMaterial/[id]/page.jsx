"use client"
import React from "react";
import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { useRouter } from "next/navigation";

function EditMaterialPage({params}){
    const {register, handleSubmit, setValue,formState:{errors}} = useForm();
    const [registro, setRegistro] = useState(false);

    const [material,setMaterial] = useState();

    const [datosmaterial, setDatosmaterial] = useState({});

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
        if(datosmaterial){
            setValue('nombreMaterial', material);
        }
    },[datosmaterial]);


    useEffect(()=>{
        fetch(`/api/datos/reMaterial/${params.id}`).then(datos=>datos.json())
            .then(data=>{
                
                setDatosmaterial(data);

                 setMaterial(data.nombreTipoMaterial);

                 console.log(data.nombreTipoMaterial);
                });
    },[]);

    const onSubmit = handleSubmit(async (data)=>{

        /*if(data.contrasenia != data.contrasenia2){
            return alert("Las contrasenias no coinciden...");

        }*/
        console.log("Comprobando datos: "+data.nombreMaterial);

        const datos = await fetch(`/api/datos/reMaterial/${params.id}`,{
            method:'PUT',
            body:JSON.stringify({
                nombreTipoMaterial:data.nombreMaterial,            
                  

            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        //const respuesta = await datos.json();
        if(datos.ok){
           setRegistro(true);
           route.push('/dashboardAdmin/adminMateriales');
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
                                onClick={()=>{route.push('/dashboardAdmin/adminMateriales')}}
                            ><i className="bi bi-backspace-fill"></i><strong>Regresar</strong></button>
                        </div>
            </div>
            
            <div className="d-flex justify-content-center align-items-center bg-dark text-white ">
                <form  onSubmit={onSubmit} className="w-50">
                    
                        <legend className="text-center mb-4"><strong>Edición de material -CUNOR-</strong></legend>

                        <div className='row mb-3'>
                            <div className="col-2">
                                <label htmlFor="disabledTextInput" className="text-white"><strong>Nombre del material</strong></label>
                            </div>

                            <div className="col"> 
                                <input type="text" placeholder="Material"  onChange={(e)=>{setValue('nombreMaterial', e.target.value, {shouldValidate: true});setMaterial(e.target.value)}}  {...register("nombreMaterial", {required: {value: true, message:'Es necesario escribir el nombre del material...'}})} className="form-control bg-secondary text-white" />
                            </div> 

                            {
                                    errors.nombreMaterial && (                                  
                                                                
                                            <span className="badge rounded-pill text-bg-danger">{errors.nombreMaterial.message}</span>


                                    )
                            }

                

                        </div>
                      
                       

                        <button type="submit" className="btn btn-outline-success w-100 mt-3">
                            Actualizar material
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

export default EditMaterialPage;