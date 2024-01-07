"use client"
import {useForm} from 'react-hook-form';
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';

function CrearCategoriaPage(){
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


    
    const onSubmit = handleSubmit(async (data)=>{

        /*if(data.contrasenia != data.contrasenia2){
            return alert("Las contrasenias no coinciden...");

        }*/
        console.log(data);
        console.log("Comprobando datos: "+data.nombreCategoria);

        const datos = await fetch('/api/datos/reCategoria',{
            method:'POST',
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

                        
                         <div className="d-flex justify-content-center align-items-center bg-dark text-white ">
                            <form  onSubmit={onSubmit} className="w-50">
                                
                                    <legend className="text-center mb-4"><strong>Creación de categorias</strong></legend>

                                    <div className='row mb-3'>
                                        <div className="col-2">
                                            <label htmlFor="disabledTextInput" className="text-white"><strong>Categoria</strong></label>
                                        </div>

                                        <div className="col"> 
                                            <input type="text" placeholder="Carrera"  onChange={(e)=>{setCategoria(e.target.value)}}  {...register("nombreCategoria", {required: {value: true, message:'Es necesario escribir la categoria...'}})} className="form-control bg-secondary text-white" />
                                        </div> 

                                        {
                                                errors.nombreCategoria && (                                  
                                                                            
                                                        <span className="badge rounded-pill text-bg-danger">{errors.nombreCategoria.message}</span>


                                                )
                                        }

                            

                                    </div>
                                
                                

                                    <button type="submit" className="btn btn-outline-success w-100 mt-3">
                                        Crear categoria
                                    </button>
                                    
                                
                                
                            </form>

                        </div>
                        
                    

                        {
                            registro &&(

                                <div className="d-flex justify-content-end">
                                    <div className="alert alert-success" role="alert">
                                        ¡Categoria creada correctamente!
                                    </div>

                                </div>
                                
                            )
                        }

        </>
    );
}

export default CrearCategoriaPage;