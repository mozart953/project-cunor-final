"use client";
import {useForm} from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useLog from '@/hooks/log';
import { useEffect } from 'react';

function LoginPage() {

    const {register, handleSubmit, formState:{errors}} = useForm();
    const router = useRouter();
    const [rol, setUsuario1] = useLog (null);


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

    const onSubmit = handleSubmit(async data=>{
        console.log(data);
        const res = await signIn('credentials', {
            username: data.nombreUsuario,
            password: data.contrasenia,
            redirect:false

        });
        
        if(res.error){
            alert(res.error);

        }else{
            console.log("Enviando..." );
            console.log(data.nombreUsuario);
            setUsuario1(data.nombreUsuario);
            //useLog({usuario:data.nombreUsuario})
            // console.log("valor del rol "+rol);
            // router.push('/dashboardAdmin');
            // router.refresh();
        }
        console.log(res);

    });



  return (
    <>
        <div>
        <section className="text-center">
            <div className="p-5 bg-image"></div>

            <div className="card mx-auto shadow-5-strong" style={{maxWidth: '500px', maxHeight:'450px'}}>
            <div className="card-body py-5 px-md-5">
                <div className="row d-flex justify-content-center">
                <div className="col-lg-10">
                    
                    {/* <img src="/images/cunor-logo.png" style={{ width: '150px', height: '150px', display: 'block', margin: 'auto' }} /> */}
                    {/* <h2 className="fw-bold mb-5">CUNOR</h2> */}

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h2 className="fw-bold mb-6 ml-3">CUNOR</h2>
                        <img src="/images/cunor-logo.png" style={{ width: '150px', height: '150px' }} />
                        
                    </div>


                    <form onSubmit={onSubmit}>
                    <div className="form-outline mb-4">
                        <input
                        type="text"
                        id="form3Example3"
                        className="form-control form-control-lg"
                        placeholder="Nombre de usuario"
                        {...register("nombreUsuario", {required: {value: true, message:'El usuario requerido...'}})}
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
                </div>
            </div>
            </div>
        </section>
        </div>



    </>
  );
}

export default LoginPage;
