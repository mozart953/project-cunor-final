import { useState,useEffect } from "react";

function useLog3(usuario){
    console.log(usuario);
    const [datosg,setDatosg ] = useState({});
    const [usuario3, setUsuario3] = useState(usuario);


    useEffect(()=>{
        if(usuario3!=="" && usuario3!==null){
            fetch(`/api/datos/reUsuarioLog?nombreUsuario=${usuario3}`).then(data=>data.json())
            .then(datos=> {setDatosg(datos)});    
        }

    },[usuario3]);


    return [datosg, setUsuario3];


}

export default useLog3;