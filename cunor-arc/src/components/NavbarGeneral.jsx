import Link from "next/link";
import {getServerSession} from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


async function Navbar(){
    
    const sesion = await getServerSession(authOptions);
    console.log(sesion); 
    

    return(
        <nav className="navbar navbar-expand-lg  navbar-dark bg-primary">
            <div className="container-fluid">
            <h1 className="navbar-brand" >
                <Link href='/' className="nav-link">CUNOR- by Wilson Pop</Link>
                
            </h1>

                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav ml-auto">
                        {
                            !sesion?.user?(
                                <>
                                <li className="nav-item">
                                    <Link href='/' className="nav-link" aria-current="page">Página inicial</Link>
                                </li>
                
                
                        
                                <li className="nav-item">
                                    <Link href='/auth/login' className="nav-link">Iniciar sesión</Link>
                                </li>
                                
                                </>
                                    
                    

                            ):(
                                <>
                                            
                                    <li className="nav-item">
                                        <Link href='/dashboardAdmin' className="nav-link">Dashboard</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link href='/dashboardAdmin/adminUsuarios' className="nav-link">Gestión de usuarios</Link>
                                    </li>
                        
                    
                                    <li className="nav-item">
                                        <Link href='/dashboardAdmin/registro' className="nav-link">Registro de usuarios</Link>
                                    </li>

                                    
                                    <li className="nav-item">
                                        <Link href='/dashboardAdmin/adminCarreras' className="nav-link">Gestión de carreras</Link>
                                    </li>

                                    
                                    <li className="nav-item"> 
                                        <Link href='/dashboardAdmin/adminRoles' className="nav-link">Roles</Link>
                                    </li> 

                                    <li className="nav-item"> 
                                        <Link href='/api/auth/signout' className="nav-link">Cerrar sesion</Link>
                                    </li>


                                </>
                            )

                        }


                    

                
                    </ul>

                </div>
            
            </div>    

        </nav>
        

    );
}

export default Navbar;