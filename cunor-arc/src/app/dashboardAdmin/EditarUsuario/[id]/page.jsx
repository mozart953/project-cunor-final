"use client"
import React from "react";
import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { useRouter } from "next/navigation";

function EditPage({params}){
    const {register, handleSubmit,setValue, formState:{errors}} = useForm();
    const [roles, setRoles] = useState([]);
    const [idrol, setIdrol] = useState(0);
    const [idcarrera, setIdcarrera] = useState(0);
    const [carrera, setCarrera] = useState([]);
    const [registro, setRegistro] = useState(false);
    const [usuario, setUsuario] = useState({});
    const [dpi, setDpi] = useState("");
    const [nombre , setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [nombreusuario, setNombreusuario] = useState("");

    const [valores, setValores] = useState({});

    const route = useRouter();

    useEffect(() => {
        if (registro) {
            const timer = setTimeout(() => {
                setRegistro(false);
            }, 6000);

            return () => clearTimeout(timer);
        }
    }, [registro]);  


    const obtenerIdRol = (event)=>{
        event.preventDefault();
        const selectRol = event.target.value;
        console.log(selectRol);
        setIdrol(selectRol); 
        
    };

    const obtenerIdCarrera = (event)=>{
        event.preventDefault();
        const selectCarrera = event.target.value;
        console.log(selectCarrera);
        setIdcarrera(selectCarrera);
    }


    useEffect(()=>{
        if(valores){
            setValue('DPI', dpi);
            setValue('primerNombre', nombre);
            setValue('primerApellido', apellido);
            setValue('nombreUsuario', nombreusuario);
        }

    },[valores])


    useEffect(()=>{
        fetch('/api/datos/reRoles').then(datos=>datos.json()).then(data=>{
            //console.log(data);
           // console.log(data.nombreRol);
            setRoles([...data,...roles]);
            // setIdrol(data[0].ID_Rol);
            // console.log(data[0].ID_Rol);
            
        })

        fetch('/api/datos/reCarrera').then(datos1=>datos1.json()).then(data1=>{
            console.log(data1);
            setCarrera([...data1,...carrera]);
            // setIdcarrera(data1[0].ID_Carrera);
            // console.log(data1[0].ID_Carrera);
        })

        
            console.log(params.id);
            fetch(`/api/datos/reUsuarios/${params.id}`).then(datos=>datos.json())
            .then(data=>{
                 setUsuario(data)

                 setValores(data)

                 setDpi(data.DPI)

                 setNombre(data.primerNombre)

                 setApellido(data.primerApellido)

                 setNombreusuario(data.nombreUsuario)
                
                 setIdrol(data.ID_rol)

                 console.log(data.ID_rol)

                 setIdcarrera(data.ID_carrera)

                 console.log(data.ID_carrera)
                });

            // fetch(`/api/datos/reRoles/${params.id}`).then(datos=>datos.json()).then(data=>{
            //     console.log(data);
            //     setIdrol(data.ID_Rol);
            //     console.log(data.ID_Rol);
                
            // })
    
            // fetch(`/api/datos/reCarrera`).then(datos1=>datos1.json()).then(data1=>{
                
            //     setIdcarrera(data1.ID_Carrera);
            //     console.log(data1.ID_Carrera);
            // })
    
            

        




    },[]);

 
    
    const onSubmit = handleSubmit(async (data)=>{
        console.log(data);

        /*if(data.contrasenia != data.contrasenia2){
            return alert("Las contrasenias no coinciden...");

        }*/

        const datos = await fetch(`/api/datos/reUsuarios/${params.id}`,{
            method:'PUT',
            body:JSON.stringify({
                DPI:data.DPI,
                primerNombre:data.primerNombre,
                primerApellido:data.primerApellido,
                nombreUsuario: data.nombreUsuario,
                ID_rol: Number(idrol),
                ID_estado: 1,
                ID_carrera:Number(idcarrera),                 
                  

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
            alert("El usuario ya existe..."); //cambiar diseno
        }
        console.log(datos);


        const registrar = fetch('/api/datos/reDellesU', {
            method:'POST',
            body:JSON.stringify({
                nombreUsuario:nombreusuario,
                descripcion:'Actualizacion de usuario'
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(data=>data.json())
        .then(datos=>console.log(datos));
        
    }); 

    return(
        <>
            <div className="card text-bg-secondary mb-3" style={{width:'40%', margin:'0 auto', borderRadius:'15px'}}>
                    <div className="card-body">
                        <legend className="text-center mb-4">Edición de usuarios -CUNOR-</legend>                       
                    </div>
            </div>

            <div className="d-flex justify-content-center align-items-center bg-dark text-white ">
                <form  onSubmit={onSubmit} className="w-50">
                    

                        <div className='row mb-3'>
                            <div className="col-1">
                                <label htmlFor="disabledTextInput" className="text-white">DPI</label>
                            </div>

                            <div className="col"> 
                                <input type="text" placeholder="DPI"  onChange={(e)=>{setValue('DPI', e.target.value, {shouldValidate:true} );setDpi(e.target.value)}} {...register("DPI", {required: {value: true, message:'Es necesario escribir el DPI...'}})}  className="form-control bg-secondary text-white" />
                            </div> 

                            
                            {
                                    errors.DPI && (                                  
                                                                
                                          <span className="badge rounded-pill text-bg-danger">{errors.DPI.message}</span>


                                    )
                            }



                

                        </div>
                        
                        <div className='row mb-3'>
                            <div className='col-4'>
                                <label htmlFor="disabledTextInput" className="col-form-label">Ingresar el primer nombre</label>
                            </div>

                            <div className='col'>
                                <input type="text" placeholder="Primer Nombre" onChange={(e)=>{setValue('primerNombre', e.target.value, {shouldValidate:true} );setNombre(e.target.value)}} {...register("primerNombre", {required: {value: true, message:'Es necesario escribir el nombre...'}})}  className="form-control bg-secondary text-white"/>
                            </div>

                            {
                                    errors.primerNombre && (                                  
                                                                
                                          <span className="badge rounded-pill text-bg-danger">{errors.primerNombre.message}</span>


                                    )
                            }

                

                        </div>

                        <div className='row mb-3'>
                            <div className='col-4'> 
                                <label htmlFor="disabledTextInput" className="col-form-label">Ingresar el primer apellido</label>
                            </div>

                            <div className='col'>
                                <input type="text" placeholder="Primer Apellido" onChange={(e)=>{setValue('primerApellido', e.target.value, {shouldValidate:true} );setApellido(e.target.value)}} {...register("primerApellido", {required: {value: true, message:'Es necesario escribir el apellido...'}})} className="form-control bg-secondary text-white"/>
                            </div>

                            {
                                    errors.primerApellido && (                                  
                                                                
                                          <span className="badge rounded-pill text-bg-danger">{errors.primerApellido.message}</span>


                                    )
                            }

                    

                        </div>

                        <div className='row mb-3'>
                            <div className='col-4'>
                                <label htmlFor="disabledTextInput" className="col-form-label">Ingresar el nombre de usuario</label>
                            </div>

                            <div className='col'>
                                <input type="username" placeholder="Nombre de usuario"  onChange={(e)=>{setValue('nombreUsuario', e.target.value, {shouldValidate:true} );setNombreusuario(e.target.value)}} {...register("nombreUsuario", {required: {value: true, message:'Es necesario escribir el nombre de usuario...'}})}  className="form-control bg-secondary text-white" disabled={true}/>
                            </div>

                            {
                                    errors.nombreUsuario && (                                  
                                                                
                                          <span className="badge rounded-pill text-bg-danger">{errors.nombreUsuario.message}</span>


                                    )
                            }

                        </div>

                        {/* <div className='row mb-3'>
                            <div className='col-4'>
                                <label htmlFor="disabledTextInput" className="col-form-label">Ingresar la contraseña</label>
                            
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
                                <label htmlFor="disabledTextInput" className="col-form-label">Confirmar la contraseña</label>
                            </div>

                            <div className='col'>
                                <input type="password" placeholder="Confirmar ontraseña" {...register("contrasenia2", {required: {value: true, message:'Se requiere confirmar la contraseña...'}})} className="form-control bg-secondary text-white"/>
                            </div>

                            {
                                errors.contrasenia2 && (                                   
                                    
                                    <span className="badge rounded-pill text-bg-danger">{errors.contrasenia2.message}</span> 


                                )
                            }

                        </div>   */}

                        <div className='row mb-2'>
                            <div className='col-4'>
                                <label htmlFor="disabledTextInput" className="col-form-label">Asignar rol</label>
                            </div>

                   
                            <select className='col form-select text-white bg-dark' value={idrol} onChange={obtenerIdRol}>
                                {roles.map((datos)=><option key={datos.ID_Rol} value={datos.ID_Rol}>{datos.nombreRol}</option>)}
                            </select> 

                 
                        </div>                   


                        <div className='row mb-3'>
                            <div className='col-4'>
                                <label htmlFor="disabledTextInput" className="col-form-label">Asignar Carrera</label>
                            </div>  

                   

                            <select className='col form-select text-white bg-dark' value={idcarrera} onChange={obtenerIdCarrera}>
                                {carrera.map((datos1)=><option key={datos1.ID_Carrera} value={datos1.ID_Carrera}>{datos1.nombreCarrera}</option>)}
                            </select>    

                 
                    
                        </div> 
                       

                        <button type="submit" className="btn btn-primary w-100 mt-3">
                            Actualizar usuario
                        </button>
                        
                    
                    
                </form>

            </div>
            <div className="d-flex justify-content-center ">
                <button type="submit" className="btn btn-outline-danger w-50 mt-3" onClick={()=>route.push(`/dashboardAdmin/editarContrasenia/${params.id}`)}> 
                                Actualizar contraseña
                </button>

            </div>
           

            {
                registro &&(

                    <div className="d-flex justify-content-end">
                        <div className="alert alert-success" role="alert">
                            ¡Usuario editado correctamente!
                        </div>

                    </div>
                    
                )
            }
        </>
    );
}

export default EditPage;

