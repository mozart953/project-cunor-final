"use client"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useLog2 from "@/hooks/log2";
import {useForm} from 'react-hook-form';
import { useRouter } from "next/navigation";


function CompoConfigurarUsuario(){
    const {register, handleSubmit,setValue, formState:{errors}} = useForm();
    const [datosg, setUsuario1] = useLog2(null);
    const [nombreusuario, setNombreusuario] = useState("");
    const [idcarrera, setIdcarrera] = useState(0);
    const [idusuario, setIdusuario] = useState(null);

    const [nombreCarrera, setNombreCarrera] = useState(null);
    const [idcarrera1, setIdcarrera1]= useState(null);
    const [iduser1, setIduser1] = useState(null);
    const [idrol, setIdrol] = useState(null);
    const [idrol1, setIdrol1] = useState(null);


    const [dpi, setDpi] = useState("");
    const [nombre , setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [valores, setValores] = useState({});


    const [registro, setRegistro] = useState(false);
    const [registro2, setRegistro2] = useState(false);
    const [interruptor, setInterruptor] = useState(false);
    
    const route = useRouter();


    const { data: session, status } = useSession();

    
    useEffect(() => {
        if (registro) {
            const timer = setTimeout(() => {
                setRegistro(false);
            }, 6000);

            return () => clearTimeout(timer);
        }
    }, [registro]);

    
    useEffect(() => {
        if (registro2) {
            const timer = setTimeout(() => {
                setRegistro2(false);
            }, 6000);

            return () => clearTimeout(timer);
        }
    }, [registro2]);

    
    useEffect(()=>{

         
        if(session){
            const usuario = session?.user.name;
            console.log("viendo usuario " + JSON.stringify(session, null, 2));
            console.log("nombre del usuario desde configuracion de usuario: " + usuario);
            setNombreusuario(usuario);
           
        
        }

    },[session]);

    
    useEffect(()=>{
        setUsuario1(nombreusuario);
           
   },[nombreusuario]);

    
    useEffect(()=>{
        if(valores){
            setValue('DPI', dpi);
            setValue('primerNombre', nombre);
            setValue('primerApellido', apellido);
            setValue('nombreUsuario', nombreusuario);
        }

    },[valores]);

   
   useEffect(()=>{
    if(datosg!==null && nombreusuario !==""){
        console.log("Datos del usuario: " + JSON.stringify(datosg));
        console.log("carrera del usuario: " + datosg.carrera.nombreCarrera);
        setValores(datosg);
        setIdcarrera(Number(datosg.carrera.ID_Carrera));
        setNombreCarrera(datosg.carrera.nombreCarrera);
        setIdusuario(Number(datosg.ID_Usuario));
        setIdrol(Number(datosg.rol.ID_Rol));
        setDpi(datosg.DPI);
        setNombre(datosg.primerNombre);
        setApellido(datosg.primerApellido);

        console.log("ID de la carrera: "+ datosg.carrera.ID_Carrera);
    }
    
  },[datosg]);

  
  useEffect(()=>{
    if(idcarrera !==0 && idusuario!==null && idrol!==null){
        if(!idcarrera1 && !iduser1 && !idrol1){
            setIdcarrera1(idcarrera);
            setIduser1(idusuario);
            setIdrol1 (idrol);
        }
    }
  },[idcarrera, idusuario, idrol]);


    const onSubmit = handleSubmit(async (data)=>{
        console.log(data);
        console.log(idrol1 + " " + idcarrera1 + iduser1);

        /*if(data.contrasenia != data.contrasenia2){
            return alert("Las contrasenias no coinciden...");

        }*/

        const datos = await fetch(`/api/datos/reUsuarios/${iduser1}`,{
            method:'PUT',
            body:JSON.stringify({
                DPI:data.DPI,
                primerNombre:data.primerNombre,
                primerApellido:data.primerApellido,
                nombreUsuario: data.nombreUsuario,
                ID_rol: Number(idrol1),
                ID_estado: 1,
                ID_carrera:Number(idcarrera1),                 
                

            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        //const respuesta = await datos.json();
        if(datos.ok){
            setRegistro(true);
            route.refresh();
        }else{
            alert("El usuario ya existe..."); //cambiar diseno
        }
        console.log(datos);


        // const registrar = fetch('/api/datos/reDellesU', {
        //     method:'POST',
        //     body:JSON.stringify({
        //         nombreUsuario:nombreusuario,
        //         descripcion:'Actualizacion de usuario'
        //     }),
        //     headers:{
        //         'Content-Type':'application/json'
        //     }
        // }).then(data=>data.json())
        // .then(datos=>console.log(datos));
        
    }); 

    const onSubmit2 = handleSubmit(async (data)=>{
        console.log(data);

        if(data.contrasenia != data.contrasenia2){
            return alert("Las contraseñas no coinciden...");

        }

        const datos = await fetch(`/api/datos/reContrasenia/${iduser1}`,{
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
           setRegistro2(true);
           route.refresh();
        }else{
            alert("Algo salio mal, revise que las contrasenias coincidan..."); //cambiar diseno
        }
        console.log(datos);
        
    }); 



    return(
        <>


            <div className="card text-bg-secondary mb-3" style={{width:'80%', margin:'0 auto'}}>
                    <div className="card-header"><strong>Usuario:</strong> {nombreusuario}</div>
                    <div className="card-body">
                        <legend className="text-center mb-4"><strong>Carrera asociada:</strong> {nombreCarrera}</legend>                       
                    </div>
            </div>
            
            <div className="d-flex justify-content-center align-items-center bg-dark text-white ">
                

                <form  onSubmit={onSubmit} className="w-50">
                    
                        <legend className="text-center mb-4"><strong>Configuraciones generales de usuario</strong></legend>

                        <div className='row mb-3'>
                            <div className="col-1">
                                <label htmlFor="disabledTextInput" className="text-white"><strong>DPI</strong></label>
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
                                <label htmlFor="disabledTextInput" className="col-form-label"><strong>Ingresar el primer nombre</strong></label>
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
                                <label htmlFor="disabledTextInput" className="col-form-label"><strong>Ingresar el primer apellido</strong></label>
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
{/* 
                        <div className='row mb-3'>
                            <div className='col-4'>
                                <label htmlFor="disabledTextInput" className="col-form-label">Ingresar el nombre de usuario</label>
                            </div>

                            <div className='col'>
                                <input type="username" placeholder="Nombre de usuario"  onChange={(e)=>{setValue('nombreUsuario', e.target.value, {shouldValidate:true} );setNombreusuario(e.target.value)}} {...register("nombreUsuario", {required: {value: true, message:'Es necesario escribir el nombre de usuario...'}})}  className="form-control bg-secondary text-white" />
                            </div>

                            {
                                    errors.nombreUsuario && (                                  
                                                                
                                          <span className="badge rounded-pill text-bg-danger">{errors.nombreUsuario.message}</span>


                                    )
                            }

                        </div> */}

                       

                        <button type="submit" className="btn btn-primary w-100 mt-3">
                            Actualizar usuario
                        </button>
                        
                    
                    
                </form>

            </div>
            <div className="d-flex justify-content-center ">
                <button type="submit" className="btn btn-outline-danger w-50 mt-3" onClick={()=>{setInterruptor(!interruptor)}} > 
                                Actualizar contraseña
                </button>

            </div>


            
            {
                    interruptor&&(
                        
                            <div className="d-flex justify-content-center align-items-center bg-dark text-white ">
                            <form  onSubmit={onSubmit2} className="w-50">
                                
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
                    )
                }


           

            {
                registro &&(

                    <div className="d-flex justify-content-end">
                        <div className="alert alert-success" role="alert">
                            ¡Usuario actualizado correctamente!
                        </div>

                    </div>
                    
                )
            }
            
            {
                registro2 &&(

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

export default CompoConfigurarUsuario;