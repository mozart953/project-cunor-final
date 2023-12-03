"use client"
import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';

function RegisterPage(){
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [roles, setRoles] = useState([]);
    const [idrol, setIdrol] = useState(0);
    const [idcarrera, setIdcarrera] = useState(0);
    const [carrera, setCarrera] = useState([]);
    const [registro, setRegistro] = useState(false);

    useEffect(() => {
        if (registro) {
            const timer = setTimeout(() => {
                setRegistro(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [registro]);  


    const obtenerIdRol = (event)=>{
        //event.preventDefault();
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
        fetch('/api/datos/reRoles').then(datos=>datos.json()).then(data=>{
            //console.log(data);
           // console.log(data.nombreRol);
            setRoles([...data,...roles]);
            setIdrol(data[0].ID_Rol);
            console.log(data[0].ID_Rol);
            
        })

        fetch('/api/datos/reCarrera').then(datos1=>datos1.json()).then(data1=>{
            console.log(data1);
            setCarrera([...data1,...carrera]);
            setIdcarrera(data1[0].ID_Carrera);
            console.log(data1[0].ID_Carrera);
        })


    },[]);
    
    const onSubmit = handleSubmit(async (data)=>{

        if(data.contrasenia != data.contrasenia2){
            return alert("Las contrasenias no coinciden...");

        }

        const datos = await fetch('/api/auth/register',{
            method:'POST',
            body:JSON.stringify({
                DPI:data.DPI,
                primerNombre:data.primerNombre,
                primerApellido:data.primerApellido,
                nombreUsuario: data.nombreUsuario,
                Contrasenia: data.contrasenia,
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
        }else{
            alert("El usuario ya existe..."); //cambiar diseno
        }
        console.log(datos);

        const registrar = fetch('/api/datos/reDellesU', {
            method:'POST',
            body:JSON.stringify({
                nombreUsuario:data.nombreUsuario,
                descripcion:'Resgistro de usuario'
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(data=>data.json())
        .then(datos=>console.log(datos));
        
    }); 



    return(
        <>
            <div className="card text-bg-secondary mb-3" style={{width:'50%', margin:'0 auto', borderRadius:'15px'}}>
                    <div className="card-body">
                        <legend className="text-center mb-4">Registro de usuarios -CUNOR-</legend>                       
                    </div>
            </div>

            <div className="d-flex justify-content-center align-items-center bg-dark text-white ">
                <form  onSubmit={onSubmit} className="w-50">
                    
                        
                        <div className='row mb-3'>
                            <div className="col-1">
                                <label htmlFor="disabledTextInput" className="text-white">DPI</label>
                            </div>

                            <div className="col">
                                <input type="text" placeholder="DPI" {...register("DPI", {required: {value: true, message:'El DPI es requerido...'}})} className="form-control bg-secondary text-white"/>
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
                                <input type="text" placeholder="Primer Nombre" {...register("primerNombre", {required:{value: true, message:'El primer nombre es requerido...'}})} className="form-control bg-secondary text-white"/>
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
                                <input type="text" placeholder="Primer Apellido" {...register("primerApellido", {required: {value: true, message:'El primer apellido es requerido...'}})} className="form-control bg-secondary text-white"/>
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
                                <input type="username" placeholder="Nombre de usuario" {...register("nombreUsuario", {required: {value: true, message:'El nombre de usuario es requerido...'}})} className="form-control bg-secondary text-white" />
                            </div>

                            {
                                errors.nombreUsuario && (                                   
                                    
                                    <span className="badge rounded-pill text-bg-danger">{errors.nombreUsuario.message}</span> 


                                )
                            }
                        </div>

                        <div className='row mb-3'>
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

                        </div>  

                        <div className='row mb-2'>
                            <div className='col-4'>
                                <label htmlFor="disabledTextInput" className="col-form-label">Asignar rol</label>
                            </div>

                            {/* <div className='col'>
                                <input type="number" placeholder="Rol" {...register("rol", {required: {value: true, message:'Es necesario asignar un rol...'}})} className="form-control bg-secondary text-white"/>
                            </div> */}

                            <select className='col form-select text-white bg-dark' onChange={obtenerIdRol}>
                                {roles.map((datos)=><option key={datos.ID_Rol} value={datos.ID_Rol}>{datos.nombreRol}</option>)}
                            </select> 

                            {/* {
                                errors.rol && (                                   
                                    
                                    <span className="badge rounded-pill text-bg-danger">{errors.rol.message}</span> 


                                )
                            } */}
                        </div>                   

                        {/* <div className='row mb-3'>
                            <div className='col-4'>
                                <label htmlFor="disabledTextInput" className="col-form-label">Habilitar/Deshabilitar usuario</label>
                                
                            </div>  

                            <div className='col'>
                                <input type="number" placeholder="Estado" {...register("estado", {required:{value: true, message:'Establecer estado habilitado o deshabilitado...'}})} className="form-control bg-secondary text-white"/>
                            
                            </div> 

                             {
                                errors.estado && (                                   
                                    
                                    <span className="badge rounded-pill text-bg-danger">{errors.estado.message}</span> 


                                )
                            }     

                        </div> */}

                        <div className='row mb-3'>
                            <div className='col-4'>
                                <label htmlFor="disabledTextInput" className="col-form-label">Asignar Carrera</label>
                            </div>  

                            {/* <div className='col'>
                                <input type="number" placeholder="Carrera" {...register("carrera", {required: {value: true, message:'Establecer carrera...'}})} className="form-control bg-secondary text-white"/>
                            </div> */}

                            <select className='col form-select text-white bg-dark' onChange={obtenerIdCarrera}>
                                {carrera.map((datos1)=><option key={datos1.ID_Carrera} value={datos1.ID_Carrera}>{datos1.nombreCarrera}</option>)}
                            </select>    

                            {/* {
                                errors.carrera && (                                   
                                    
                                    <span className="badge rounded-pill text-bg-danger">{errors.carrera.message}</span> 


                                ) 
                            }                 */}
                    
                        </div> 
                       

                        <button type="submit" className="btn btn-primary w-100 mt-3">
                            Registrar
                        </button>
                    
                </form>

            </div>

            {
                registro &&(

                    <div className="d-flex justify-content-end">
                        <div className="alert alert-success" role="alert">
                            ¡Usuario registrado correctamente!
                        </div>

                    </div>
                    
                )
            }
        </>
    );
}

export default RegisterPage;

