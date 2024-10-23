"use client"
import { useState, useEffect } from 'react';
import CompoFacultadesPage from '@/components/IniFacultades';

function MostrarFacultades(){
    const [facultades,setFacultades] = useState([]);
    const [total, setTotal] = useState(null); 



    useEffect(()=>{
        fetch('/api/datos/reFacultadesPaginado').then(datos=>datos.json()).then(
            data=>{ 
                console.log(data);
                setFacultades(data.items);
                setTotal(data.total);
                //console.log(JSON.stringify(data));
            }
        )

       // console.log("Usuarios "+usuarios);

    },[]);

    return(
        <>
            <div>
                <CompoFacultadesPage datos={facultades} totalItems={total} />
            </div>
        </>
    );

}

export default MostrarFacultades;