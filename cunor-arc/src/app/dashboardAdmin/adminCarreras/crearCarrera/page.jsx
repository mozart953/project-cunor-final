"use client"
import React from "react";
import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { useRouter } from "next/navigation";

function CrearCarreraPage(){
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [registro, setRegistro] = useState(false);
    const [facultades, setFacultades] = useState([]);
    const [idfacultad, setIdfacultad] = useState(0);
    const [gradoAcademico, setGradoAcademico] = useState([]);
    const [idGradoAcademico, setIdGradoAcademico] = useState(0);
    //const [ID_Carrera, setIdCarrera] = useState(0);

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
                setIdfacultad(datos[0].ID_Facultad);
                console.log(datos[0].ID_Facultad);
            }
        );

        fetch(`/api/datos/reGradoAcademico`).then(data=>data.json()).then(
            datos=>{
                console.log(datos);
                setGradoAcademico([...datos, ...gradoAcademico]);
                setIdGradoAcademico(datos[0].ID_Grado);
                console.log(datos[0].ID_Grado);
            }
        );


    },[]);




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

        const datos = await fetch(`/api/datos/reCarrera`,{
            method:'POST',
            body:JSON.stringify({
                nombreCarrera:data.Carrera, 
                codigoCarrera:data.Codigo,
                ID_Facultad:Number(idfacultad),          
                  

            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        const respuesta = await datos.json();

        //setIdCarrera(respuesta.ID_Carrera)

        const datos2 = await fetch(`/api/datos/reEnlaceGradoC`,{
            method:'POST',
            body:JSON.stringify({
                ID_Grado:Number(idGradoAcademico),
                ID_Carrera:Number(respuesta.ID_Carrera),
                ID_Estado:Number(1)
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
        console.log(datos);
        
    }); 


    return(
        <>
            <div className="d-flex justify-content-between" style={{ padding: '2px 120px 10px 0px' }}>
                        <div className="d-flex content-center" style={{paddingTop:'20px', paddingLeft:'100px', paddingBottom:'10px'}}>
                            <button type="button" className="btn btn-primary" 
                                onClick={()=>{route.push('/dashboardAdmin/adminCarreras')}}
                            ><i className="bi bi-backspace-fill"></i><strong>Regresar</strong></button>
                        </div>
            </div>

              <div className="d-flex justify-content-center align-items-center bg-dark text-white ">
                <form  onSubmit={onSubmit} className="w-50">
                    
                        <legend className="text-center mb-4"><strong>Creación de carrera -CUNOR-</strong></legend>

                        <div className='row mb-3'>
                            <div className="col-4">
                                <label htmlFor="disabledTextInput" className="text-white"><strong>Nombre de la carrera</strong></label>
                            </div>

                            <div className="col"> 
                                <input type="text" placeholder="Carrera"  {...register("Carrera", {required: {value: true, message:'Es necesario escribir el nombre de la carrera...'}})}   className="form-control bg-secondary text-white" />
                            </div> 

                            {
                                errors.Carrera && (                                  
                                    
                                    <span className="badge rounded-pill text-bg-danger">{errors.Carrera.message}</span>


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



                            <select className='col form-select text-white bg-dark' onChange={obtenerIdFacultad}>
                                {facultades.map((datos)=><option key={datos.ID_Facultad} value={datos.ID_Facultad}>{datos.nombreFacultad}</option>)}
                            </select> 


                        </div>  

                        <div className='row mb-2'>
                            <div className='col-4'>
                                <label htmlFor="disabledTextInput" className="col-form-label"><strong>Asignar grado académico</strong></label>
                            </div>



                            <select className='col form-select text-white bg-dark' onChange={obtenerIdGrado}>
                                {gradoAcademico.map((datos)=><option key={datos.ID_Grado} value={datos.ID_Grado}>{datos.nombreGrado}</option>)}
                            </select> 


                        </div>  
                      
                       

                        <button type="submit" className="btn btn-outline-success w-100 mt-3">
                            Crear carrera
                        </button>
                        
                    
                    
                </form>

            </div>
            
           

            {
                registro &&(

                    <div className="d-flex justify-content-end">
                        <div className="alert alert-success" role="alert">
                            ¡Carrera creada correctamente!
                        </div>

                    </div>
                    
                )
            }
        </>
    );
}

export default CrearCarreraPage;