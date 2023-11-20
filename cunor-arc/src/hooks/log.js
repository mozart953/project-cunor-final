import { useState,useEffect } from "react";

function useLog(usuario){
    console.log(usuario);
    const [rol,setRol ] = useState("");
    const [usuario1, setUsuario1] = useState(usuario);


    useEffect(()=>{
        if(usuario1!=="" && usuario1!==null){
            fetch(`/api/datos/reUsuarioLog?nombreUsuario=${usuario1}`).then(data=>data.json())
            .then(datos=> {console.log("Viendo el rol: "+datos.rol.nombreRol); setRol(datos.rol.nombreRol)});    
        }

    },[usuario1]);


    return [rol, setUsuario1];


}

export default useLog;