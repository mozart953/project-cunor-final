import { useState,useEffect } from "react";

function useLog2(usuario){
    console.log(usuario);
    const [datosg,setDatosg ] = useState({});
    const [usuario1, setUsuario1] = useState(usuario);


    useEffect(()=>{
        if(usuario1!=="" && usuario1!==null){
            fetch(`/api/datos/reUsuarioLog?nombreUsuario=${usuario1}`).then(data=>data.json())
            .then(datos=> {console.log("Viendo datos: "+JSON.stringify(datos)); setDatosg(datos)});    
        }

    },[usuario1]);


    return [datosg, setUsuario1];


}

export default useLog2;