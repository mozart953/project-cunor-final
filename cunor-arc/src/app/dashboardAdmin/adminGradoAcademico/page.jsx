"use client"
import { useState, useEffect } from 'react';
import CompoGradoAcademicoPage from '@/components/IniGradoAcademico';

function MostrarGradoAcademico(){
    const [gradoacademico,setGradoacademico] = useState([]);
    const [total, setTotal] = useState(null); 



    useEffect(()=>{
        fetch('/api/datos/reGradoAPaginado').then(datos=>datos.json()).then(
            data=>{ 
                console.log(data);
                setGradoacademico(data.items);
                setTotal(data.total);
                //console.log(JSON.stringify(data));
            }
        )

       // console.log("Usuarios "+usuarios);

    },[]);

    return(
        <>
            <div>
                <CompoGradoAcademicoPage datos={gradoacademico} totalItems={total} />
            </div>
        </>
    );

}

export default MostrarGradoAcademico;