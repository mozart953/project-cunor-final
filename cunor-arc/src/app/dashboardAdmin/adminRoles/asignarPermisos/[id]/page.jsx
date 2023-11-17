"use client"
import { useEffect, useState } from "react";
import Permisos from '@/components/Permisos';

function AsignarRestriccionesPage({params}){
    const [permisos, setPermisos]=useState([]);
    
    useEffect(
        ()=>{
            fetch('/api/datos/rePermisos').then(data=>data.json())
            .then(datos=>{
                setPermisos([...datos,...permisos]);
            })

        },[] )


    return(
        <>
            <Permisos datos={permisos} id={params.id} />
        </>
    )
}

export default AsignarRestriccionesPage;