"use client"
import { useState, useEffect } from 'react';
import Roles from '@/components/Roles';

function AdminRoles(){
    const [roles,setRoles] = useState([]); 



    useEffect(()=>{
        fetch('/api/datos/reRoles').then(datos=>datos.json()).then(
            data=>{ 
                console.log(data);
                setRoles([...data,...roles]);
                //console.log(JSON.stringify(data));
            }
        )

       // console.log("Usuarios "+usuarios);

    },[]);

    return (
        <>
            <div>
                <Roles datos={roles} />
            </div>
        </>
    );



}

export default AdminRoles;