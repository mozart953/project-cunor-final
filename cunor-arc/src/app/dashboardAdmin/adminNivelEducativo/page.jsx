"use client"
import { useState, useEffect } from 'react';
import CompoNivelEducativoPage from '@/components/IniNivelEducativo';

function MostrarNivelEducativo(){
    const [niveleducativo,setNiveleducativo] = useState([]);
    const [total, setTotal] = useState(null); 



    useEffect(()=>{
        fetch('/api/datos/reNivelEPaginado').then(datos=>datos.json()).then(
            data=>{ 
                console.log(data);
                setNiveleducativo(data.items);
                setTotal(data.total);
                //console.log(JSON.stringify(data));
            }
        )

       // console.log("Usuarios "+usuarios);

    },[]);

    return(
        <>
            <div>
                <CompoNivelEducativoPage datos={niveleducativo} totalItems={total} />
            </div>
        </>
    );

}

export default MostrarNivelEducativo;