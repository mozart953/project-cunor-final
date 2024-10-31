"use client"
import { useState, useEffect } from 'react';
import CompoMaterialesPage from '@/components/IniMateriales';

function MostrarMateriales(){
    const [datosG,setDatosG] = useState([]);
    const [total, setTotal] = useState(null); 



    useEffect(()=>{
        fetch('/api/datos/reMaterialPaginado').then(datos=>datos.json()).then(
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
                <CompoMaterialesPage datos={datosG} totalItems={total} />
            </div>
        </>
    );

}

export default MostrarMateriales;