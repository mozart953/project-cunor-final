"use client"

import { useState, useEffect } from 'react';
import Usuarios from '@/components/Usuarios';


 function AdminUsuariosPage(){
    const [usuarios,setUsuarios] = useState([]); 



    useEffect(()=>{
        fetch('/api/datos/reUsuarios').then(datos=>datos.json()).then(
            data=>{ 
                //console.log(data);
                setUsuarios([...data,...usuarios]);
                //console.log(JSON.stringify(data));
            }
        )

       // console.log("Usuarios "+usuarios);

    },[]);

      

    return(
        <>
            <div>
                {
                    
                   <Usuarios datos={usuarios} />
                }
                
            </div>
        </>
    );
}

export default AdminUsuariosPage;