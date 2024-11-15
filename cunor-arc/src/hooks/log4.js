import { useState,useEffect } from "react";

function useLog4(usuario){
    console.log(usuario);
    const [datosg4,setDatosg4 ] = useState({});
    const [usuario4, setUsuario4] = useState(usuario);


    useEffect(()=>{
        if(usuario4!=="" && usuario4!==null){
            fetch(`/api/datos/reCarreraIndividual?nombreUsuario=${usuario4}`).then(data=>data.json())
            .then(datos=> {console.log("Viendo datos: "+JSON.stringify(datos)); setDatosg4(datos)});    
        }

    },[usuario4]);


    return [datosg4, setUsuario4];


}

export default useLog4;