"use client"
import React from "react";
import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { useRouter } from "next/navigation";

function EditGradoPage({params}){
    const {register, handleSubmit, setValue,formState:{errors}} = useForm();
    const [registro, setRegistro] = useState(false);

    const [grado,setGrado] = useState();

    const [datosgrado, setDatosgrado] = useState({});
    const [niveles, setNiveles] = useState([]);
    const [idnivel, setIdnivel] = useState(0);

    const route = useRouter();
    
    useEffect(() => {
        if (registro) {
            const timer = setTimeout(() => {
                setRegistro(false);
            }, 6000);

            return () => clearTimeout(timer);
        }
    }, [registro]);  

    const obtenerIdNivel = (event)=>{
        event.preventDefault();
        const selectNivel = event.target.value;
        console.log(selectNivel);
        setIdnivel(selectNivel); 
        
    };

    useEffect(()=>{
        if(datosgrado){
            setValue('nombreGrado', grado);
        }
    },[datosgrado])


    useEffect(()=>{

        fetch(`/api/datos/reNivelEducativo`).then(data=>data.json()).then(datos=>{
            setNiveles([...datos, ...niveles]);
        });

        fetch(`/api/datos/reGradoAcademico/${params.id}`).then(datos=>datos.json())
            .then(data=>{
                
                    setDatosgrado(data);

                    setGrado(data.nombreGrado);
                    setIdnivel(data.ID_NivelEducativo);

                    console.log(data.nombreGrado);
                    console.log(data.ID_NivelEducativo);
                });
    },[]);

    const onSubmit = handleSubmit(async (data)=>{

        /*if(data.contrasenia != data.contrasenia2){
            return alert("Las contrasenias no coinciden...");

        }*/
        console.log("Comprobando datos: "+data.nombreGrado);

        const datos = await fetch(`/api/datos/reGradoAcademico/${params.id}`,{
            method:'PUT',
            body:JSON.stringify({
                nombreGrado:data.nombreGrado,
                ID_NivelEducativo:Number(idnivel),
                  

            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        //const respuesta = await datos.json();
        if(datos.ok){
           setRegistro(true);
           route.push('/dashboardAdmin/adminGradoAcademico');
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
                    
                        <legend className="text-center mb-4"><strong>Edición de Grado Académico -CUNOR-</strong></legend>

                        <div className='row mb-3'>
                            <div className="col-2">
                                <label htmlFor="disabledTextInput" className="text-white"><strong>Nombre del grado</strong></label>
                            </div>

                            <div className="col"> 
                                <input type="text" placeholder="Grado"  onChange={(e)=>{setValue('nombreGrado', e.target.value, {shouldValidate: true});setGrado(e.target.value)}}  {...register("nombreGrado", {required: {value: true, message:'Es necesario escribir el nombre del grado...'}})} className="form-control bg-secondary text-white" />
                            </div> 

                            {
                                    errors.nombreGrado && (                                  
                                                                
                                            <span className="badge rounded-pill text-bg-danger">{errors.nombreGrado.message}</span>


                                    )
                            }

                

                        </div>
                      
                        <div className='row mb-2'>
                            <div className='col-4'>
                                <label htmlFor="disabledTextInput" className="col-form-label"><strong>Asignar nivel educativo</strong></label>
                            </div>



                            <select className='col form-select text-white bg-dark' value={idnivel} onChange={obtenerIdNivel}>
                                {niveles.map((datos)=><option key={datos.ID_NivelEducativo} value={datos.ID_NivelEducativo}>{datos.nombreNivelEducativo}</option>)}
                            </select> 


                        </div>  

                        <button type="submit" className="btn btn-outline-success w-100 mt-3">
                            Actualizar grado
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

export default EditGradoPage;