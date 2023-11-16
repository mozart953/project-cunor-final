"use client"

import { useState, useEffect } from 'react';
import Carreras from '@/components/Carreras';

function AdminCarreras(){

    const [carreras,setCarreras] = useState([]); 



    useEffect(()=>{
        fetch('/api/datos/reCarrera').then(datos=>datos.json()).then(
            data=>{ 
                console.log(data);
                setCarreras([...data,...carreras]);
                //console.log(JSON.stringify(data));
            }
        )

       // console.log("Usuarios "+usuarios);

    },[]);

    return(
        <>
            <div>
                <Carreras datos={carreras}/>
            </div>
        </>
    );

}

export default AdminCarreras;