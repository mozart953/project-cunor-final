"use client"
import Link from "next/link";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
//import useLog from "@/hooks/log2";
import useLog from '@/hooks/log';

// async function obtenerRol(usuario1){

//         const datos = await fetch(`${process.env.API_BASE_URL}/api/datos/reUsuarioLog?nombreUsuario=${usuario1}`);
//         return datos.json();
// }

function NavbarGComponent(){
    const [nombreusuario, setNombreusuario] = useState("");
    const [rol, setUsuario1] = useLog (null);
    const [rolUsuario, setRolUsuario]= useState("");
    const { data: session, status } = useSession();

    useEffect(()=>{

         
        if(session){
            const usuario = session?.user.name;
            console.log("viendo usuario " + JSON.stringify(session, null, 2));
            console.log("nombre del usuario desde el navbar: " + usuario);
            setNombreusuario(usuario);
           
        
        }

    },[session]);

    useEffect(
        ()=>{
            if(nombreusuario!==""){
                //setNombreusuario(nombreusuario);
                setUsuario1(nombreusuario);
            }
        },[nombreusuario]
    );

    useEffect(
        ()=>{
            if (rol === null) {
                return;
            }

            if(rol==='Administrativo'){
                
             setRolUsuario(rol);
 
            }else if(rol==='Operativo'){
                
                setRolUsuario(rol);
            }

        },[rol]   
    );

    console.log("rol desde navbar" + rol);


    useEffect(() => {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarToggler && navbarCollapse) {
            navbarToggler.addEventListener('click', (event) => {
                navbarCollapse.classList.toggle('show');
            });
        }
    }, []);

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
            </button>


                <div className="collapse navbar-collapse" id="navbarNav">
                    
                
                    <div className="text-white d-flex align-items-center" style={{borderRadius:"20px", background:"#00156d"}}>
                        <h1 className="navbar-brand">
                            <Link href='/' className="nav-link">
                                <img  src={'/images/cunor-logo2.png'}  style={{width:'200px', height:'40px', borderRadius:"20px"}}/>
                            </Link>
                        </h1>

                        <div className="justify-content-center align-items-center" >
                            <h1 className="navbar-brand text-white" >
                                <strong>Repositorio Institucional</strong>
                            </h1>
                        </div>
                    </div>               


                    
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {
                            nombreusuario=="" ? (
                            <>
                                
                                <li className="nav-item">
                                <Link href='/' className="nav-link active d-flex flex-column text-center" aria-current="page">
                                    <i className="bi bi-house-door-fill"></i><span className="small">Página inicial</span>
                                </Link>
                                </li>
                                <li className="nav-item">
                                <Link href='/dAbout' className="nav-link active d-flex flex-column text-center" aria-current="page">
                                    <i className="bi bi-info-square-fill"></i><span className="small">Acerca de</span>
                                </Link>
                                </li>
                                <li className="nav-item">
                                <Link href='/auth/login' className="nav-link d-flex flex-column text-center">
                                    <i className="bi bi-lock"></i><span className="small">Iniciar sesión</span>
                                </Link>
                                </li>
                            </>
                            ) : (   
                            rolUsuario ==="Administrativo" && rol=="Administrativo" ?(
                                    <>
                                        <li className="nav-item">
                                            <Link href='/dashboardAdmin' className="nav-link d-flex flex-column text-center">
                                                <i className="bi bi-pencil-square"></i><span className="small">Dashboard administrativo</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href='/dashboardAdmin/adminUsuarios' className="nav-link d-flex flex-column text-center">
                                                <i className="bi bi-person"></i><span className="small">Gestión de usuarios</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href='/dashboardAdmin/registro' className="nav-link d-flex flex-column text-center">
                                                <i className="bi bi-person-badge-fill"></i><span className="small">Registro de usuarios</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href='/dashboardAdmin/adminCarreras' className="nav-link d-flex flex-column text-center">
                                                <i className="bi bi-pin-angle-fill"></i><span className="small">Gestión de carreras</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href='/dashboardAdmin/adminCategorias' className="nav-link d-flex flex-column text-center">
                                                <i className="bi bi-bookmark"></i><span className="small">Gestión de categorias</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href='/dashboardAdmin/adminRoles' className="nav-link d-flex flex-column text-center">
                                                <i className="bi bi-person-lock"></i><span className="small">Roles</span>
                                            </Link>
                                        </li>
                                        
                                        <li className="nav-item">
                                            
                                            <a className="nav-link dropdown-toggle ms-auto" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                                <i className="bi bi-person-circle"></i> <span className="small">{nombreusuario}</span>
                                            </a>                                        
                                                
                                                        <ul className="text-white" style={{position:"absolute", zIndex:1, listStyle:"none", top:'30px'}}>
                                                            <li>
                                                                
                                                                <Link className="nav-link d-flex align-items-center text-center" href='/dashboardGeneralUserC'>
                                                                    <span className="small me-2">Configuraciones </span> <i className="bi bi-person-gear"></i>
                                                                </Link>

                                                            </li>
                                                            <li style={{marginTop:'-15px'}}>
                                                                
                                                                <Link className="nav-link d-flex align-items-center text-center" href='/api/auth/signout'>
                                                                    <span className="small me-2">Cerrar sesión </span> <i className="bi bi-power"></i>
                                                                </Link>
                                                            </li>
                                                            
                                                        </ul>
                                                                                                        
                                        </li>
                                    </>
                                ):(

                                    (rolUsuario === "Operativo" && rol=="Operativo") &&(
                                        <>
                                            <li className="nav-item">
                                                <Link href='/dashboardOperador' className="nav-link d-flex flex-column text-center">
                                                    <i className="bi bi-person-circle"></i><span className="small">Dashboard operativo</span>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href='/dashboardOperador/subidaTrabajos' className="nav-link d-flex flex-column text-center">
                                                    <i className="bi bi-box-arrow-up"></i><span className="small">Subir trabajo de graduación</span>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href='/dashboardOperador/listaTrabajos' className="nav-link d-flex flex-column text-center">
                                                    <i className="bi bi-file-earmark-pdf-fill"></i><span className="small">Listado de trabajos</span>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link dropdown-toggle ms-auto" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{marginTop:"-10px"}}>
                                                    <i className="bi bi-person-circle"></i> <span className="small">{nombreusuario}</span>
                                                </a>                                        
                                                    
                                                            <ul className="text-white" style={{position:"absolute", zIndex:1, listStyle:"none", top:'20px'}}>
                                                                <li>
                                                                    
                                                                    <Link className="nav-link d-flex align-items-center text-center" href='/dashboardGeneralUserC'>
                                                                        <span className="small me-2">Configuraciones </span> <i className="bi bi-person-gear"></i>
                                                                    </Link>

                                                                </li>
                                                                <li style={{marginTop:'-15px'}}>
                                                                    
                                                                    <Link className="nav-link d-flex align-items-center text-center" href='/api/auth/signout'>
                                                                        <span className="small me-2">Cerrar sesión </span> <i className="bi bi-power"></i>
                                                                    </Link>
                                                                </li>
                                                                
                                                            </ul>
                                            </li>   

                                        </>
                                    )

                                ) 

                                
                            )
                        }
                        </ul>
                </div>
            </div>
        </nav>    


    );
        

}

export default NavbarGComponent;