"use client";
import {useForm} from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useLog from '@/hooks/log';
import useLog3 from '@/hooks/log3';
import { useState,useEffect } from 'react';

function LoginPage() {

    const {register, handleSubmit, formState:{errors}} = useForm();
    const router = useRouter();
    const [rol, setUsuario1] = useLog (null);
    const [mensaje, setMensaje] = useState(null);
    const [mensaje1, setMensaje1] = useState(null);
    const [datosx, setDatosx] = useState(null);
    const [usuarioactual, setUsuarioactual] = useState(null);
    const [datosg, setUsuario3] = useLog3(null);

    useEffect(()=>{
        let timer = null;

            if (mensaje !== null) {
                timer = setTimeout(() => {
                    setMensaje(null);
                    //setMensaje1(null);
                }, 2000);
            }
            return () => {
                if (timer) {
                    clearTimeout(timer);
                }
            };
    },[mensaje]);

    useEffect(()=>{
        let timer = null;

            if (mensaje1!==null) {
                timer = setTimeout(() => {
                    //setMensaje(null);
                    setMensaje1(null);
                    
                }, 2000);
            }
            return () => {
                if (timer) {
                    clearTimeout(timer);
                }
            };
    },[mensaje1]);


    useEffect(()=>{

        if (rol === null) {
            return;
        }
        //console.log("Viendo rol: " + JSON.stringify(rol));

        if(rol==='Administrativo'){
            console.log("Viendo rol " + rol);
            router.push('/dashboardAdmin');
            router.refresh(); 
        }else if(rol==='Operativo'){
            console.log("Viendo rol " + rol);
            router.push('/dashboardOperador');
            router.refresh(); 
        }

    },[rol]);

    useEffect(()=>{
        const FuncV =async ()=>{
            if (datosg !== null && datosg.nombreUsuario === usuarioactual && datosx!==null) {
                if(datosg.ID_estado===1){
                    const res = await signIn('credentials', {
                        username: datosx.nombreUsuario,
                        password: datosx.contrasenia,
                        redirect:false
            
                    });
                    
                    if(res.error){
                        //alert(res.error);
                        setMensaje(res.error);
            
                    }else{
                        console.log("Enviando..." );
                        console.log(datosx.nombreUsuario);
                        setUsuario1(datosx.nombreUsuario);
                        //setUsuario3(data.nombreUsuario);
                        //useLog({usuario:data.nombreUsuario})
                        // console.log("valor del rol "+rol);
                        // router.push('/dashboardAdmin');
                        // router.refresh();
                    }
                    //console.log(res);

                }else if(datosg.ID_estado===2){
                    setMensaje1("Usuario desactivado");
                }
                

            }else if(datosg===null){
                setMensaje("Usuario no encontrado");
            }
        }
        FuncV();

    },[datosg, datosx]);


    const onSubmit = handleSubmit(async data=>{
        //console.log(data);
        setDatosx(data);
        setUsuarioactual(data.nombreUsuario);
        setUsuario3(data.nombreUsuario);



    


    });



  return (
    <>
        <div>
        <section className="text-center">
            {/* <div className="p-5 bg-image"></div> */}

            <div className="card mx-auto shadow-5-strong" style={{maxWidth: '500px', maxHeight:'450px'}}>
            <div className="card-body py-5 px-md-5">
                <div className="row d-flex justify-content-center">
                <div className="col-lg-10">
                    
                    {/* <img src="/images/cunor-logo.png" style={{ width: '150px', height: '150px', display: 'block', margin: 'auto' }} /> */}
                    {/* <h2 className="fw-bold mb-5">CUNOR</h2> */}

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {/* <h2 className="fw-bold mb-6 ml-3">CUNOR</h2> */}
                        <img src="/images/cunorl-logo3.jpg" style={{ width: '350px', height: '120px' }} />
                        
                    </div>


                    <form onSubmit={onSubmit}>
                    <div className="form-outline mb-4">
                        <input
                        type="text"
                        id="form3Example3"
                        className="form-control form-control-lg"
                        placeholder="Nombre de usuario"
                        {...register("nombreUsuario", {required: {value: true, message:'El usuario es requerido...'}})}
                        />
                        {/* <label className="form-label" htmlFor="form3Example3">
                        Ingresar usuario
                        </label> */} 
                        {
                                errors.nombreUsuario && (                                  
                                    
                                    <span className="badge rounded-pill text-bg-danger">{errors.nombreUsuario.message}</span>


                                )
                        }
                    </div>

                    <div className="form-outline mb-4">
                        <input
                        type="password"
                        id="form3Example4"
                        className="form-control form-control-lg"
                        placeholder="Contraseña"
                        {...register("contrasenia", {required: {value: true, message:'La contraseña es requerida...'}})}
                        />
                        {/* <label className="form-label" htmlFor="form3Example4">
                        Ingresar contraseña
                        </label> */}

                        {
                                errors.contrasenia && (                                  
                                    
                                    <span className="badge rounded-pill text-bg-danger">{errors.contrasenia.message}</span>


                                )
                        }
                    </div>



                    <button
                        type="submit"
                        className="btn btn-primary btn-block btn-lg mb-4"
                    >
                        Entrar
                    </button>
                    </form>
                </div>
                    {mensaje!==null&&(
                            <div className="alert alert-danger" role="alert">
                                    ¡Datos incorrectos, intentelo nuevamente!
                            </div>

                    )}
                    {mensaje1!==null&&(
                            <div className="alert alert-primary" role="alert">
                                    {mensaje1}
                            </div>

                    )}
                </div>
            </div>
            </div>
        </section>
        </div>



    </>
  );
}

export default LoginPage;
