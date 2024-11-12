"use client"

import { useEffect, useState } from "react";
import {useForm} from 'react-hook-form';
import { useRouter } from "next/navigation";

function EditarCategoriaPage({params}){
    console.log(params.id);
    const {register, handleSubmit, setValue,formState:{errors}} = useForm();
    const [categoria, setCategoria] = useState(null); 
    const [registro, setRegistro] = useState(false);

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
        if(categoria!==null){
            setValue('nombreCategoria', categoria);
        }
    },[categoria]);

    useEffect(()=>{
        const consultarDatos = async ()=>{
            try{
                const respuesta = await fetch(`/api/datos/reCategoria/${params.id}`);
                const datos = await respuesta.json();
                console.log(datos);
                setCategoria(datos.nombreCategoria);

            }catch(error){
                console.log("Hay un error: " + error);                
            }
        }

        consultarDatos();
        
    },[]);

    const onSubmit = handleSubmit(async (data)=>{

        /*if(data.contrasenia != data.contrasenia2){
            return alert("Las contrasenias no coinciden...");

        }*/
        console.log("Comprobando datos: "+data.nombreCategoria);

        const datos = await fetch(`/api/datos/reCategoria/${params.id}`,{
            method:'PUT',
            body:JSON.stringify({
                nombreCategoria:data.nombreCategoria,            
                  

            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        //const respuesta = await datos.json();
        if(datos.ok){
           setRegistro(true);
           route.push('/dashboardAdmin/adminCategorias');
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
                            onClick={()=>{route.push('/dashboardAdmin/adminCategorias')}}
                        ><i className="bi bi-backspace-fill"></i><strong>Regresar</strong></button>
                    </div>
                </div>
            
            <div className="d-flex justify-content-center align-items-center bg-dark text-white ">
                <form  onSubmit={onSubmit} className="w-50">
                    
                        <legend className="text-center mb-4"><strong>Edición de categoria -CUNOR-</strong></legend>

                        <div className='row mb-3'>
                            <div className="col-2">
                                <label htmlFor="disabledTextInput" className="text-white"><strong>Categoria</strong></label>
                            </div>

                            <div className="col"> 
                                <input type="text" placeholder="Carrera"  onChange={(e)=>{setValue('nombreCategoria', e.target.value, {shouldValidate: true});setCategoria(e.target.value)}}  {...register("nombreCategoria", {required: {value: true, message:'Es necesario escribir la categoria...'}})} className="form-control bg-secondary text-white" />
                            </div> 

                            {
                                    errors.nombreCategoria && (                                  
                                                                
                                            <span className="badge rounded-pill text-bg-danger">{errors.nombreCategoria.message}</span>


                                    )
                            }

                

                        </div>
                      
                       

                        <button type="submit" className="btn btn-outline-success w-100 mt-3">
                            Actualizar categoria
                        </button>
                        
                    
                    
                </form>

            </div>
            
           

            {
                registro &&(

                    <div className="d-flex justify-content-end">
                        <div className="alert alert-success" role="alert">
                            ¡Categoria editada correctamente!
                        </div>

                    </div>
                    
                )
            }
        </>
    );
    
}

export default EditarCategoriaPage;