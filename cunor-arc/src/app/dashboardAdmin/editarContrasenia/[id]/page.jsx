"use client"

import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { useRouter } from "next/navigation";

function EditarContrasenia ({params}){

    const {register, handleSubmit, formState:{errors}} = useForm();
    const [registro, setRegistro] = useState(false);
    const [nombreusuario, setNombreusuario] = useState("");

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
        fetch(`/api/datos/reUsuarios/${params.id}`).then(data=>data.json())
        .then(datos=>{
            console.log(datos.nombreUsuario);
            setNombreusuario(datos.nombreUsuario);
        })
    },[]);

    const onSubmit = handleSubmit(async (data)=>{

        if(data.contrasenia != data.contrasenia2){
            return alert("Las contrasenias no coinciden...");

        }

        const datos = await fetch(`/api/datos/reContrasenia/${params.id}`,{
            method:'PUT',
            body:JSON.stringify({
                Contrasenia: data.contrasenia,
                  
            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        //const respuesta = await datos.json();
        if(datos.ok){
           setRegistro(true);
           route.push('/dashboardAdmin/adminUsuarios');
           route.refresh();
        }else{
            alert("Algo salio mal, revise que las contrasenias coincidan..."); //cambiar diseno
        }
        console.log(datos);
        
    }); 

    return(
        <>
            
            <div className="d-flex justify-content-center align-items-center bg-dark text-white ">
                <form  onSubmit={onSubmit} className="w-50">
                    
                        <legend className="text-center mb-4"><strong>Edición de contraseña para:</strong> {nombreusuario}</legend>


                        <div className='row mb-3'>
                            <div className='col-4'>
                                <label htmlFor="disabledTextInput" className="col-form-label"><strong>Contraseña nueva</strong></label>
                            
                            </div>
                                
                            <div className='col'>
                                <input type="password" placeholder="Contraseña" {...register("contrasenia", {required: {value: true, message:'La contraseña es requerida...'}})} className="form-control bg-secondary text-white"/>
                            </div>

                            {
                                errors.contrasenia && (                                   
                                    
                                    <span className="badge rounded-pill text-bg-danger">{errors.contrasenia.message}</span> 


                                )
                            }

                            

                        </div>

                        <div className='row mb-3'>
                            <div className='col-4'>
                                <label htmlFor="disabledTextInput" className="col-form-label"><strong>Confirmar la contraseña</strong></label>
                            </div>

                            <div className='col'>
                                <input type="password" placeholder="Confirmar ontraseña" {...register("contrasenia2", {required: {value: true, message:'Se requiere confirmar la contraseña...'}})} className="form-control bg-secondary text-white"/>
                            </div>

                            {
                                errors.contrasenia2 && (                                   
                                    
                                    <span className="badge rounded-pill text-bg-danger">{errors.contrasenia2.message}</span> 


                                )
                            }

                        </div>   

                        

                        <button type="submit" className="btn  btn-outline-success w-100 mt-3">
                            Actualizar contraseña
                        </button>
                        
                    
                    
                </form>

            </div>

            {
                registro &&(

                    <div className="d-flex justify-content-end">
                        <div className="alert alert-success" role="alert">
                            ¡Contraseña cambiada correctamente!
                        </div>

                    </div>
                    
                )
            }
        </>
    );
}

export default EditarContrasenia;