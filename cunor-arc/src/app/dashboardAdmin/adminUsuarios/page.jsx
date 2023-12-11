"use client"

import { useState, useEffect } from 'react';
import Usuarios from '@/components/Usuarios';


 function AdminUsuariosPage(){
    const [usuarios,setUsuarios] = useState([]); 
    const [total, setTotal] = useState(null);



    useEffect(()=>{
        fetch('/api/datos/reUsuariosPaginado').then(datos=>datos.json()).then(
            data=>{ 
                //console.log(data);
                setUsuarios(data.items);
                setTotal(data.total);
                //console.log(JSON.stringify(data));
            }
        )

       // console.log("Usuarios "+usuarios);

    },[]);

      

    return(
        <>
            <div>
                {
                    
                   <Usuarios datos={usuarios} totalItems={total}/>
                }
                
            </div>
        </>
    );
}

export default AdminUsuariosPage;