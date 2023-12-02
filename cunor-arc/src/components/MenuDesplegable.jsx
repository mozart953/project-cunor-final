import { useState } from "react";

function MenuDesplegableComponent({nombreUsuario}){

    const [control, setControl] = useState(false);

    const cambiarEstado = ()=>{
        setControl(!control);
    }


    return(
        <>
            
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={cambiarEstado}>
                        <span className="small">{nombreUsuario}</span>
            </a>

            {
                control&&(
                    <ul className="dropdown-menu" style={{position:"absolute", zIndex:1}}>
                               <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                                                        
                    </ul>
                )
            }


        </>
    )

}

export default MenuDesplegableComponent;