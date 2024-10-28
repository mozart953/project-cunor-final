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

    const [facultades, setFacultades] = useState([]);
    const [idfacultad, setIdfacultad] = useState(0);
    const [gradoAcademico, setGradoAcademico] = useState([]);
    const [idGradoAcademico, setIdGradoAcademico] = useState(0);
    const [idGradoAcademicoA, setIdGradoAcademicoA] = useState(0);
    const [codigoCarrera, setCodigoCarrera] = useState();

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
            setValue('Codigo', codigoCarrera);
        }
    },[datoscarrera]);

    const obtenerIdFacultad = (event)=>{
        event.preventDefault();
        const selectFacultad = event.target.value;
        console.log(selectFacultad);
        setIdfacultad(selectFacultad);
    }

    const obtenerIdGrado = (event)=>{
        event.preventDefault();
        const selectGrado = event.target.value;
        console.log(selectGrado);
        setIdGradoAcademico(selectGrado);
    }


    useEffect(()=>{
        fetch(`/api/datos/reFacultades`).then(data=>data.json()).then(
            datos=>{
                console.log(datos);
                setFacultades([...datos, ...facultades]);
          
            }
        );

        fetch(`/api/datos/reGradoAcademico`).then(data=>data.json()).then(
            datos=>{
                console.log(datos);
                setGradoAcademico([...datos, ...gradoAcademico]);

            }
        );


    },[]);


    useEffect(()=>{
        fetch(`/api/datos/reCarrera/${params.id}`).then(datos=>datos.json())
            .then(data=>{
                
                setDatoscarrera(data);

                 setCarrera(data.nombreCarrera);

                 setCodigoCarrera(data.codigoCarrera);

                 setIdfacultad(data.ID_Facultad);

                 console.log(data.nombreCarrera)
                });

        fetch(`/api/datos/reCarreraEG/${params.id}`).then(data=>data.json()).then(
            datos=>{
                console.log(datos.gradoAcademico[0].ID_Grado);
                console.log(datos);
                console.log("ID_Grado " + datos.gradoAcademico[0].ID_Grado);
                setIdGradoAcademico(datos.gradoAcademico[0].ID_Grado);
                setIdGradoAcademicoA(datos.gradoAcademico[0].ID_Grado);
                
            }
        )

        
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
                codigoCarrera:data.Codigo,
                ID_Facultad:Number(idfacultad),              
                  

            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        const respuesta = await datos.json();

        if(idGradoAcademico!== idGradoAcademicoA){
            const datos2 = await fetch(`/api/datos/reEnlaceGradoC/${params.id}`,{
                method:'PUT',
                body:JSON.stringify({
                    old_ID_Grado:Number(idGradoAcademicoA),
                    new_ID_Grado:Number(idGradoAcademico),
                    ID_Estado:Number(1),
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            });

            const respuesta2 = await datos2.json();

            if(datos.ok && datos2.ok){
                setRegistro(true);
                route.push('/dashboardAdmin/adminCarreras');
                route.refresh();
             }else{
                 alert("Algo salio mal..."); //cambiar diseno
             }
        }else{
            
            if(datos.ok){
                setRegistro(true);
                route.push('/dashboardAdmin/adminCarreras');
                route.refresh();
            }else{
                alert("Algo salio mal..."); //cambiar diseno
            }
            console.log(datos);
        }


        
    }); 


    return(
        <>
        

            <div className="d-flex justify-content-center align-items-center bg-dark text-white ">
                <form  onSubmit={onSubmit} className="w-50">
                    
                        <legend className="text-center mb-4"><strong>Edición de carreas -CUNOR-</strong></legend>

                        <div className='row mb-3'>
                            <div className="col-2">
                                <label htmlFor="disabledTextInput" className="text-white"><strong>Carrera</strong></label>
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

                        <div className='row mb-3'>
                            <div className="col-4">
                                <label htmlFor="disabledTextInput" className="text-white"><strong>Código de carrera</strong></label>
                            </div>

                            <div className="col"> 
                                <input type="text" placeholder="Código"  {...register("Codigo", {required: {value: true, message:'Es necesario escribir el código de carrera...'}})}   className="form-control bg-secondary text-white" />
                            </div> 

                            {
                                errors.Codigo && (                                  
                                    
                                    <span className="badge rounded-pill text-bg-danger">{errors.Codigo.message}</span>


                                )
                            }

                

                        </div>

                        <div className='row mb-2'>
                            <div className='col-4'>
                                <label htmlFor="disabledTextInput" className="col-form-label"><strong>Asignar facultad</strong></label>
                            </div>



                            <select className='col form-select text-white bg-dark' value={idfacultad} onChange={obtenerIdFacultad}>
                                {facultades.map((datos)=><option key={datos.ID_Facultad} value={datos.ID_Facultad}>{datos.nombreFacultad}</option>)}
                            </select> 


                        </div>  

                        <div className='row mb-2'>
                            <div className='col-4'>
                                <label htmlFor="disabledTextInput" className="col-form-label"><strong>Asignar Grado Académico</strong></label>
                            </div>



                            <select className='col form-select text-white bg-dark' value={idGradoAcademico} onChange={obtenerIdGrado}>
                                {gradoAcademico.map((datos)=><option key={datos.ID_Grado} value={datos.ID_Grado}>{datos.nombreGrado}</option>)}
                            </select> 


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