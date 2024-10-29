"use client"
import { useState, useEffect } from 'react';
import CompoIdiomasPage from '@/components/IniIdiomas';

function MostrarIdiomas(){
    const [datosG,setDatosG] = useState([]);
    const [total, setTotal] = useState(null); 



    useEffect(()=>{
        fetch('/api/datos/reIdiomasPaginado').then(datos=>datos.json()).then(
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
                <CompoIdiomasPage datos={datosG} totalItems={total} />
            </div>
        </>
    );

}

export default MostrarIdiomas;