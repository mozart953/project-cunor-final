"use client"

import { useState, useEffect } from 'react';
import Carreras from '@/components/Carreras';

function AdminCarreras(){

    const [carreras,setCarreras] = useState([]);
    const [total, setTotal] = useState(null); 



    useEffect(()=>{
        fetch('/api/datos/reCarrerasPaginado').then(datos=>datos.json()).then(
            data=>{ 
                console.log(data);
                setCarreras(data.items);
                setTotal(data.total);
                //console.log(JSON.stringify(data));
            }
        )

       // console.log("Usuarios "+usuarios);

    },[]);

    return(
        <>
            <div>
                <Carreras datos={carreras} totalItems={total}/>
            </div>
        </>
    );

}

export default AdminCarreras;