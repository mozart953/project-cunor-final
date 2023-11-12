"use client"
import {useForm} from 'react-hook-form';

function RegisterPage(){
    const {register, handleSubmit, formState:{errors}} = useForm();
    
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
                ID_rol: Number(data.rol),
                ID_estado: Number(data.estado),
                ID_carrera: Number(data.carrera),                
                  

            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        const respuesta = await datos.json();
        console.log(respuesta);
    }) 



    return(
        <>
            <div className="d-flex justify-content-center align-items-center bg-dark text-white ">
                <form  onSubmit={onSubmit} className="w-50">
                    
                        <legend className="text-center mb-4">Registro de usuarios -CUNOR-</legend>

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

                        <div className='row mb-3'>
                            <div className='col-4'>
                                <label htmlFor="disabledTextInput" className="col-form-label">Asignar rol</label>
                            </div>

                            <div className='col'>
                                <input type="number" placeholder="Rol" {...register("rol", {required: {value: true, message:'Es necesario asignar un rol...'}})} className="form-control bg-secondary text-white"/>
                            </div>

                            {
                                errors.rol && (                                   
                                    
                                    <span className="badge rounded-pill text-bg-danger">{errors.rol.message}</span> 


                                )
                            }
                        </div>                   

                        <div className='row mb-3'>
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

                        </div>

                        <div className='row mb-3'>
                            <div className='col-4'>
                                <label htmlFor="disabledTextInput" className="col-form-label">Asignar Carrera</label>
                            </div>  

                            <div className='col'>
                                <input type="number" placeholder="Carrera" {...register("carrera", {required: {value: true, message:'Establecer carrera...'}})} className="form-control bg-secondary text-white"/>
                            </div>    

                            {
                                errors.carrera && (                                   
                                    
                                    <span className="badge rounded-pill text-bg-danger">{errors.carrera.message}</span> 


                                ) 
                            }                
                    
                        </div>
                       

                        <button type="submit" className="btn btn-primary w-100 mt-3">
                            Registrar
                        </button>
                    
                </form>

            </div>
        </>
    );
}

export default RegisterPage;

