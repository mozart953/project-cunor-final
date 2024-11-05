"use client"
import { useState, useEffect } from 'react';
import CompoPaisesPage from '@/components/IniPaises';

function MostrarPaises(){
    const [datosG,setDatosG] = useState([]);
    const [total, setTotal] = useState(null); 



    useEffect(()=>{
        fetch('/api/datos/rePaisPaginado').then(datos=>datos.json()).then(
            data=>{ 
                console.log(data);
                setDatosG(data.items);
                setTotal(data.total);
                //console.log(JSON.stringify(data));
            }
        )

       // console.log("Usuarios "+usuarios);

    },[]);

    return(
        <>
            <div>
                <CompoPaisesPage datos={datosG} totalItems={total} />
            </div>
        </>
    );

}

export default MostrarPaises;