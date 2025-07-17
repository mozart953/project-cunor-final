"use client"
import { useEffect, useState } from "react";
import {set, useForm} from 'react-hook-form';
import { analytics } from "@/app/firebase/firebase-config";
import {ref,deleteObject, uploadBytes, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import useLog2 from "@/hooks/log2";
import useLog4 from "@/hooks/log4";


function CompoEditarTrabajos({idDetalle}){
    const [datosg, setUsuario1] = useLog2(null);
    const [datosg4, setUsuario4] = useLog4("");
    const [nombreusuario, setNombreusuario] = useState("");
    const [carrera, setCarrera] = useState("");
    const [idcarrera, setIdcarrera] = useState(0);
    const [facultad, setFacultad] = useState("");
    const [codigoCarrera, setCodigoCarrera] = useState("");
    const [gradoAcademico, setGradoAcademico] = useState("");
    const [nivelEducativo, setNivelEducativo] = useState("");
    const [carreraG, setCarreraG] = useState(null);
    const [idusuario, setIdusuario] = useState(null);
    const [datostrabajo, setDatostrabajo] = useState({});

    const {register, handleSubmit, setValue, unregister, formState:{errors}} = useForm(); 
    const [tamanio, setTamanio] = useState(0);
    const [data1, setData1] = useState(null);
    const [barraprogreso, setBarraprogreso] = useState("0%");
    const [idcategoria, setIdcategoria] = useState(0);
    const [categorias, setCategorias] = useState([]);
    const [file, setFile] = useState(null);
    const [control, setControl] = useState(false);

    const [control1, setControl1] = useState(false);
    const [control2, setControl2] = useState(false);
    const [control3, setControl3] = useState(false);

    //autor
    const [idautor, setIdautor] = useState(null);
    const [primernombre, setPrimernombre] = useState(null);
    const [segundonombre, setSegundonombre] = useState(null);
    const [tercernombre, setTercerNombre] = useState(null);
    const [primerapellido, setPrimerapellido] = useState(null);
    const [segundoapellido, setSegundoapellido] = useState(null);
    const [carnet, setCarnet] = useState(null);

    //trabajoGrad

    const [idtrabajo, setIdtrabajo] = useState(null);
    const [titulo, setTitulo] = useState(null);
    const [cantidadpaginas, setCantidadpaginas]= useState(null);
    const [descripcion, setDescripcion]=useState(null);
    const [url, setUrl] = useState("");
    const [palcl, setPalcl] = useState("");

    const [ocultar, setOcultar] = useState(true);
    const [ocultarx, setOcultarx] = useState(true);
    const [formularioenviado, setFormularioenviado] = useState(true);
    const [archivosanexos, setArchivosanexos] = useState([]);
    const [files, setFiles] = useState(null);
    const [urlfiles, setUrlfiles] = useState("");
    const [barraprogreso2, setBarraprogreso2] = useState("0%");
    const [eliminado, setEliminado] = useState(false);
    const [interruptor, setInterruptor] = useState(false);

    const [isChecked, setIsChecked] = useState(false);
    const [tipoMaterial, setTipoMaterial] = useState([]);
    const [idMaterial, setIdMaterial] = useState(0);
    const [paises, setPaises] = useState([]);
    const [idPais, setIdPais] = useState(0);
    const [idiomas, setIdiomas] = useState([]);
    const [idIdioma, setIdIdioma] = useState(0);
    const [correlativo, setCorrelativo] = useState("");
    const [notaTesis, setNotaTesis] = useState("");
    const [editorial, setEditorial] = useState("");
    const [fechaPublicacion, SetFechaPublicacion] = useState(new Date().toISOString().split('T')[0]);
            
    const [idcarrera1, setIdcarrera1]= useState(null);
    const [iduser1, setIduser1] = useState(null);
    const [autores, setAutores] = useState([{ ID_Autor:'', Carnet:'',primerNombre: '', segundoNombre: '', tercerNombre: '', primerApellido: '', segundoApellido: '' }]);
    const [autores3, setAutores3]=useState([]);
    const [autorCorp,setAutorCorp]= useState("");
    const [idautorCorp, setIdautorCorp] = useState(null);
    const { data: session, status } = useSession();

    const router = useRouter();
    
    useEffect(()=>{

         
        if(session){
            const usuario = session?.user.name;
            console.log("viendo usuario " + JSON.stringify(session, null, 2));
            console.log("nombre del usuario desde editar trabajos: " + usuario);
            setNombreusuario(usuario);
           
        
        }

    },[session]);


    useEffect(()=>{
        setUsuario1(nombreusuario);
        setUsuario4(nombreusuario);
           
   },[nombreusuario]);

   useEffect(()=>{
       if(datosg!==null && nombreusuario !==""){
           console.log("Datos del usuario: " + JSON.stringify(datosg));
           console.log("carrera del usuario: " + datosg.carrera.nombreCarrera);
           setCarrera(datosg.carrera.nombreCarrera);
           setIdcarrera(Number(datosg.carrera.ID_Carrera));
           setIdusuario(Number(datosg.ID_Usuario));
           console.log("ID de la carrera: "+ datosg.carrera.ID_Carrera);
       }
       
   }
   ,[datosg]);


   
   useEffect(()=>{
        if(idcarrera !==0 && idusuario!==null){
            if(!idcarrera1 && !iduser1){
                setIdcarrera1(idcarrera);
                setIduser1(idusuario);
            }
        }
    },[idcarrera, idusuario]);

    useEffect(()=>{
        if(datosg4!==null && nombreusuario!==""){
            setCarreraG(datosg4);
            setFacultad(datosg4.carrera.facultad.nombreFacultad);
            setCodigoCarrera(datosg4.carrera.codigoCarrera);
            setGradoAcademico(datosg4.carrera.gradoAcademico[0].gradoAcademico.nombreGrado);
            setNivelEducativo(datosg4.carrera.gradoAcademico[0].gradoAcademico.nivelEducativo.nombreNivelEducativo);
            console.log(datosg4);
        }
    },[datosg4])


    useEffect(()=>{
        if(datostrabajo && (autores.length!==0 || autorCorp !=="") && !control3 && correlativo!=="" && notaTesis!==""){
            setValue('titulo', titulo);
            setValue('cantidadPaginas',cantidadpaginas);
            setValue('descripcion', descripcion);
            setValue('correlativo', correlativo);
            setValue('notaTesis', notaTesis);
            setValue('editorial', editorial);

            if(editorial!==""){
                setIsChecked(true);
            }

            if(autores.length!==0){
                console.log(autores);
                autores.map(
                    (autor, index)=>{
                        setValue(`autores[${index}].primerNombre`, autor.primerNombre);
                        setValue(`autores[${index}].segundoNombre`, autor.segundoNombre);
                        setValue(`autores[${index}].tercerNombre`, autor.tercerNombre);
                        setValue(`autores[${index}].primerApellido`, autor.primerApellido);
                        setValue(`autores[${index}].segundoApellido`, autor.segundoApellido);
                        setValue(`autores[${index}].Carnet`, autor.Carnet);

                    }
                )
            }else{
                if(autorCorp!==""){
                    setValue('Acorporativo', autorCorp);
                }
            }



            setValue('palabrasCla', palcl);
        }
    },[datostrabajo, autores, autorCorp, control3, correlativo, notaTesis, editorial]);


    useEffect(()=>{
        if(idcarrera1 && iduser1){
            fetch(`/api/datos/reDetalleTrabajo/filtroB?idDetalle=${idDetalle}&idUsuario=${iduser1}&idCarrera=${idcarrera1}`)
            .then(data => data.json()).then(datos=>{
                console.log(datos); setDatostrabajo(datos);

                // setIdautor(datos.autor.ID_Autor);
                // setPrimernombre(datos.autor.primerNombre);
                // setSegundonombre(datos.autor.segundoNombre);
                // setTercerNombre(datos.autor.tercerNombre);
                // setPrimerapellido(datos.autor.primerApellido);
                // setSegundoapellido(datos.autor.segundoApellido);
                // setCarnet(datos.autor.carnet);

                const autores = datos.autores.map(dato=>({
                    ID_Autor:dato.autor.ID_Autor,
                    Carnet:dato.autor.carnet,
                    primerNombre: dato.autor.primerNombre, 
                    segundoNombre: dato.autor.segundoNombre, 
                    tercerNombre: dato.autor.tercerNombre, 
                    primerApellido: dato.autor.primerApellido, 
                    segundoApellido: dato.autor.segundoApellido,
                }));
                console.log(autores);
                setAutores(autores);

                if(datos.autoresCorp.length!==0){
                    setAutorCorp(datos.autoresCorp[0].autorCorp.nombreAutor);
                    setIdautorCorp(datos.autoresCorp[0].autorCorp.ID_AutorC);
                }


                setIdtrabajo(datos.trabajoGrad.ID_Trabajo);
                setTitulo(datos.trabajoGrad.titulo);
                setCantidadpaginas(datos.trabajoGrad.cantidadPaginas);
                setDescripcion(datos.trabajoGrad.descripcion);
                setTamanio(datos.trabajoGrad.tamanio);
                setUrl(datos.trabajoGrad.direccionGuardado);
                setPalcl(datos.trabajoGrad.paClave);
                setCorrelativo(datos.trabajoGrad.correlativo);
                setNotaTesis(datos.trabajoGrad.notaTesis);
                setEditorial(datos.trabajoGrad.editorial);
                SetFechaPublicacion(new Date(datos.fechaPublicacion).toISOString().split('T')[0]);

                setIdcategoria(datos.categoria.ID_Categoria); 
                setIdMaterial(datos.tipoMaterial.ID_TipoMaterial);
                setIdPais(datos.paises.ID_Pais);
                setIdIdioma(datos.idiomas.ID_Idioma);
                setArchivosanexos(datos.archivoAnexo);
                console.log(datos.archivoAnexo);
            });
        }
    },[idcarrera1, iduser1]);


    useEffect(()=>{
        fetch('/api/datos/reCategoria').then(data=>data.json()).then(
            datos=> {console.log(datos); 
                setCategorias([...datos,...categorias]);
                //setIdcategoria(datos[0].ID_Categoria);
            }
        )

        fetch('/api/datos/reMaterial').then(data=>data.json()).then(datos=>{console.log(datos);
            setTipoMaterial([...datos, ...tipoMaterial]);
            //setIdMaterial(datos[0].ID_TipoMaterial);
        });

        fetch('/api/datos/rePaises').then(data=>data.json()).then(datos=>{console.log(datos);
            setPaises([...datos, ...paises]);
            //setIdPais(datos[0].ID_Pais);
        });

        fetch('/api/datos/reIdiomas').then(data=>data.json()).then(datos=>{
            console.log(datos);
            setIdiomas([...datos, ...idiomas]);
            //setIdIdioma(datos[0].ID_Idioma);
        })



    },[]);


    
    useEffect(()=>{
        const actualizarDatos= async ()=>{

            if(tamanio>0 && barraprogreso=='100%' && url!=="" && data1 !==null && (autores.length!==0 || (autorCorp!=="" && idautorCorp!==null)) && idtrabajo!==null){
                console.log("viendo datos" +JSON.stringify(data1));
                //console.log(tamanio + " " + " " +barraprogreso + " " + url+  " " + idautor + " "+ idtrabajo );

                try{

                    const respuesta1 = await fetch(`/api/datos/reTrabajoGraduacion/${idtrabajo}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            correlativo:data1.correlativo,
                            titulo: data1.titulo,
                            cantidadPaginas: Number(data1.cantidadPaginas),
                            descripcion:data1.descripcion,
                            tamanio:Number(tamanio),
                            direccionGuardado:url,
                            paClave:data1.palabrasCla,
                            notaTesis:data1.notaTesis,
                            editorial:isChecked?data1.editorial:"",

                        }),
                        headers:{
                            'Content-Type':'application/json',
                        }
                    });
                    const datos1 = await respuesta1.json();
                    console.log(datos1);
                    setControl1(true);


                    if(autorCorp==""){
                        for(let i=0;i< data1.autores.length;i++){
                            let idAutor = autores[i].ID_Autor;
                            console.log("el id del autor es> " + idAutor);

                            if(idAutor!==undefined && idAutor!==''){
                                
                                const respuesta2 = await fetch(`/api/datos/reAutor/${idAutor}`,{
                                    method:'PUT',
                                    body: JSON.stringify({
                                        primerNombre: data1.autores[i].primerNombre,
                                        segundoNombre: data1.autores[i].segundoNombre,
                                        tercerNombre: data1.autores[i].tercerNombre,
                                        primerApellido: data1.autores[i].primerApellido,
                                        segundoApellido: data1.autores[i].segundoApellido,
                                        carnet:data1.autores[i].Carnet,
                                    }),
                                    headers:{
                                        'Content-Type':'application/json',
                                    }
                                });
                                const datos2 = await respuesta2.json();
                                console.log(datos2);

                            }else{
                                const respuesta2 = await fetch('/api/datos/reAutor',{
                                    method:'POST',
                                    body: JSON.stringify({
                                        primerNombre: data1.autores[i].primerNombre,
                                        segundoNombre: data1.autores[i].segundoNombre,
                                        tercerNombre: data1.autores[i].tercerNombre,
                                        primerApellido: data1.autores[i].primerApellido,
                                        segundoApellido: data1.autores[i].segundoApellido,
                                        carnet:data1.autores[i].Carnet,
                                    }),
                                    headers:{
                                        'Content-Type':'application/json',
                                    }
                                });
                                
                                const dato2= await respuesta2.json();
                                console.log(dato2);

                                const respuesta4 = await fetch('/api/datos/reEnlaceAutorRegistro', {
                                    method:'POST',                            
                                    body:JSON.stringify({
                                        ID_Autor:dato2.ID_Autor,
                                        ID_Detalle:Number(idDetalle),
                                    }),
                                    headers:{
                                        'Content-Type':'application/json',
                                    }
                                });
                                const dato4 = await respuesta4.json();
                                console.log(dato4);

                            }


                        }
                    }else{
                        const respuesta2 = await fetch(`/api/datos/reAutorC/${idautorCorp}`,{
                            method:'PUT',
                            body:JSON.stringify({
                                nombreAutor: data1.Acorporativo,
                            }),
                            headers:{
                                'Content-Type':'application/json',
                            }
                        });

                        const dato2= await respuesta2.json();
                        console.log(dato2);

                    }

                    if(urlfiles!==''){
                        if(archivosanexos.length!==0){
                            setBarraprogreso2('0%');
                            const respuesta5 = await fetch(`/api/datos/reArchivoAnexo/${archivosanexos[0].ID_Archivo}`,{
                                method:'PUT',
                                body:JSON.stringify({
                                    direccionGuardado:urlfiles
                                }),
                                headers:{
                                    'Content-Type':'application/json',
                                }
                            });
                            const dato5= await respuesta5.json();
                            console.log(dato5);
                        }
                        else{
                            setBarraprogreso2('0%');
                            const respuesta5 = await fetch('/api/datos/reArchivoAnexo',{
                                method:'POST',
                                body:JSON.stringify({
                                    direccionGuardado:urlfiles,
                                    ID_detalle:idDetalle,
                                }),
                                headers:{
                                    'Content-Type':'application/json',
                                }
    
                            });
                            const dato5 = await respuesta5.json();
                            console.log(dato5);
                        }
                    }

                    setControl2(true);        

                }catch(error){
                    console.log("Error al actualizar trabajos o autor: " + error);
                    alert("Ha ocurrido un problema inesperado, intentalo de nuevo...");
                }         
                

            }




        };
        actualizarDatos();    

    },[tamanio,barraprogreso, url, data1, autores, idtrabajo, urlfiles, autorCorp, idautorCorp]);

    useEffect(()=>{
        if(control1 && control2){
            setBarraprogreso('0%');
            try{
                let fechaActualizacion = new Date().toISOString();

                fetch(`/api/datos/reDetalleTrabajo/${idDetalle}`,{
                    method:'PUT',
                    body:JSON.stringify({
                        ID_categoria:Number(idcategoria),
                        fechaActualizacion:fechaActualizacion,
                        fechaPublicacion: fechaPublicacion && fechaPublicacion !== "" ? new Date(fechaPublicacion).toISOString() : new Date().toISOString(),
                        ID_TipoMaterial: Number(idMaterial),
                        ID_Idioma:Number(idIdioma),
                        ID_Pais:Number(idPais),                        
    
                    }),
                    headers:{
                        'Content-Type':'application/json',
                    }
                }).then(data=>data.json()).then((datos)=>{console.log(datos); setControl(true);});
    
    

            }catch(error){
                console.log("Error al actualizar los datos" + error);
            }
        }
    },[control1, control2])

    
    useEffect(()=>{
        if(control==true){
            setTamanio(0);
            setBarraprogreso('0%');
            setUrl("");
            setInterruptor(false);
            //setData1(null);
            setControl(false);
            setControl1(false);
            setControl2(false);
            setEliminado(false);

            setIdtrabajo(null);
            setIdautor(null);
            router.push("/dashboardOperador/listaTrabajos");
            router.refresh();
            

        }
    },[control]);

    


    const obtenerIdCategoria = (e)=>{
        e.preventDefault();

        const selectCategoria = e.target.value;
        console.log(selectCategoria);
        setIdcategoria(selectCategoria);
    }

    const obtenerIdMaterial = (e)=>{
        e.preventDefault();

        const selectMaterial = e.target.value;
        console.log(selectMaterial);
        setIdMaterial(selectMaterial);
    }

    const obtenerIdPais = (e)=>{
        e.preventDefault();

        const selectPais = e.target.value;
        console.log(selectPais);
        setIdPais(selectPais);
    } 

    const obtenerIdIdioma = (e)=>{
        e.preventDefault();

        const selectIdioma = e.target.value;
        console.log(selectIdioma);
        setIdIdioma(selectIdioma);
    }


    const handleCheckboxChange = (event) => { setIsChecked(event.target.checked); };


    const onSubmit= handleSubmit (async (data)=>{
        console.log(data);
        //e.preventDefault();
        setData1(data);

        console.log(file);
        
        setFormularioenviado(false);

        const expresion = /^[0-9]+$/;

        if(!expresion.test(data.cantidadPaginas)){
            alert("Escriba un número en el numero de paginas");
        }

        if(files!==null){
            await cargarArchivos();
        }

        if(file!==null){
            setTamanio(file.size);
            setUrl("");

            let urldecodificada = decodeURIComponent(url);
            let inicioNombre = urldecodificada.lastIndexOf('/')+1;
            let finNombre = urldecodificada.indexOf('?');
            let nombre = urldecodificada.slice(inicioNombre, finNombre);
            console.log(nombre);

            const desertRef = ref(analytics, `newfiles/${nombre}`);

            // Delete the file
            deleteObject(desertRef).then(() => {
                console.log("Archivo eliminado")
            }).catch((error) => {
                console.log("ocurrio un error: " +error);
            });

                //cargar archivo
                            
                const tiempoHoy = Date.now();
                //const nombreArchivo = file.name.split('.').slice(0, -1).join('.');
                const nombreCompletoArchivo = tiempoHoy + "_archivo";    

                const fileref = ref(analytics, `newfiles/${nombreCompletoArchivo}`);
                //si ocurre un error, descomentar el codigo siguiente
                // uploadBytes(fileref, file).then((data)=>{
                //     getDownloadURL(data.ref).then((url)=>{console.log(url); setUrl(url)});
                // })

                const uploadTask = uploadBytesResumable(fileref,file);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        setBarraprogreso(progress+'%');
                        switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        }
                    }, 
                    (error) => {
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                        }
                    }, 
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            setUrl(downloadURL);
                        });
                    
                    }
                    );
            

        }else{
            alert("Seleccionar archivo de trabajo de graduación");
            const valor = confirm("¿Desea conservar el mismo archivo?");
            console.log(valor);
            //setInterruptor(valor);
            if(valor==true){
                setBarraprogreso('100%');
            }else{
                setFormularioenviado(true);
            }

        }

        // if(file!==null && barraprogreso=='100%'){

            

        // }


        // const formdata = new FormData();
        // formdata.append('file', file);

        // const res = await fetch('/api/subidaArchivo', {
        //     method: 'POST',
        //     body:formdata,
        // });

        // console.log(res);

    });

    const handleInputChange= (index, event)=> {
        const values = [...autores];
        values[index][event.target.name] = event.target.value;
        setAutores(values);
        //setValue(`autores[${index}].Carnet`, event.target.value, { shouldValidate: true });

        console.log(values);
    }

    // const handleInputChange= (index, event)=> {
    //     console.log("handleInputChange is triggered");
    //     const values = [...autores];
    //     const { name, value } = event.target;
    //     const keys = name.split('.');
    //     const lastKey = keys.pop();
    //     keys.reduce((prevObj, key) => prevObj[key], values[index])[lastKey] = value;
    //     setAutores(values);
    //     console.log(values);
    // };
    // const handleInputChange= (index, event)=> {
    //     console.log("handleInputChange is triggered");
    //     const values = [...autores];
    //     const { name, value } = event.target;
    //     values[index][name] = value;
    //     setAutores(values);
    //     console.log(values);
    // };

    function handleAddClick() {
        setControl3(true);
        setAutores([...autores, { ID_Autor:'',Carnet:'',primerNombre: '', segundoNombre: '', tercerNombre: '', primerApellido: '', segundoApellido: '' }]);
        console.log(autores);
    }
      
    function handleRemoveClick(index) {
        setControl3(true);
        const values = [...autores];
        values.splice(index, 1);
        setAutores(values);
        console.log(autores);
        console.log("index> " + index);

        unregister(`autores[${index}].primerNombre`);
        unregister(`autores[${index}].segundoNombre`);
        unregister(`autores[${index}].tercerNombre`);
        unregister(`autores[${index}].primerApellido`);
        unregister(`autores[${index}].segundoApellido`);
        unregister(`autores[${index}].Carnet`);
    }

    function cargarArchivos(){
        return new Promise((resolve)=>{

            if(archivosanexos.length!==0){
                let urldecodificada = decodeURIComponent(archivosanexos[0].direccionGuardado);
                let inicioNombre = urldecodificada.lastIndexOf('/')+1;
                let finNombre = urldecodificada.indexOf('?');
                let nombre = urldecodificada.slice(inicioNombre, finNombre);
                console.log(nombre);

                const desertRef = ref(analytics, `newfiles/${nombre}`);

                // Delete the file
                deleteObject(desertRef).then(() => {
                    console.log("Archivo eliminado")
                }).catch((error) => {
                    console.log("ocurrio un error: " +error);
                });

            }
           
        
            const tiempoHoy = Date.now();
            //const nombreArchivo = file.name.split('.').slice(0, -1).join('.');
            const nombreCompletoArchivo = tiempoHoy + "_archivo";    

            const fileref = ref(analytics, `newfiles/${nombreCompletoArchivo}`);
            //si ocurre un error, descomentar el codigo siguiente
            // uploadBytes(fileref, file).then((data)=>{
            //     getDownloadURL(data.ref).then((url)=>{console.log(url); setUrl(url)});
            // })

            const uploadTask = uploadBytesResumable(fileref,files);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setBarraprogreso2(progress+'%');
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    }
                }, 
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    }
                }, 
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setUrlfiles(downloadURL);
                        resolve(downloadURL);
                    });
                
                }
                );
            }
        );
    }

    function removeAnnexedField(){
        const valor = confirm("¿Está seguro de eliminar el archivo anexo?");
        if(valor==true){
            setFiles(null);
        }
    }


    console.log(idDetalle);

    return(
        <>
            <div>Edicion de archivo {idDetalle}
                <div className="card text-bg-secondary mb-3" style={{width:'95%', margin:'0 auto'}}>
                    <div className="card-header"><strong>Usuario operativo:</strong> {nombreusuario}</div>
                    <div className="card-body">
                        <legend className="text-center mb-2"><strong>Nombre de facultad:</strong> {facultad}</legend>
                        <legend className="text-center mb-4"><strong>Edición de trabajos de graduación:</strong> {carrera}</legend>                       
                    </div>
                    <div className="card-footer bg-transparent border-dark">
                        <strong>Código de carrera:</strong> {codigoCarrera} -  
                        <strong> Nivel educativo:</strong> {nivelEducativo} - 
                        <strong> Grado académico:</strong> {gradoAcademico}

                    </div>
                </div>

                {
                    datostrabajo &&(

                        <div className="text-white mt-4">

                                <div className="mb-3" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor:'black', width:'80%', margin:'0 auto'}}>
                                    <div className="progress" role="progressbar" aria-label="Warning example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{backgroundColor:'black', width:'95%', margin:'0 auto'}}>
                                        <div className="progress-bar bg-warning" style={{width: barraprogreso2}}></div>
                                    </div> 
                                    {
                                        barraprogreso2=='100%' &&(
                                            <div>
                                                <img src="/images/icono-verde.jpg" alt="" style={{width:'25px'}}/>
                                            </div>
                                        )
                                    }
                                </div>
                          
                                <div className="mb-3" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor:'black', width:'80%', margin:'0 auto'}}>
                                    <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{backgroundColor:'black', width:'95%', margin:'0 auto'}}>
                                        <div className="progress-bar" style={{width: barraprogreso}}></div>
                                    </div> 
                                    {
                                        barraprogreso=='100%' &&(
                                            <div>
                                                <img src="/images/icono-verde.jpg" alt="" style={{width:'25px'}}/>
                                            </div>
                                        )
                                    }
                                </div>
                                <fieldset disabled={!formularioenviado}>
                                <form onSubmit={onSubmit}>
                                        
                                        <div className="row bg-secondary rounded" style={{width: '95%', margin: '0 auto'}}>
                                        <legend className="text-center mb-4"><strong>Datos generales del autor</strong></legend>
                                            
                                            {
                                                 autores.length!==0&&(autores.map((autor, index)=>(
                                                    <div className="d-flex flex-row mb-4" key={index}>
                                                            
                                                            <div className="mb-3">
                                                                    <label className="col-form-label"><strong>Carnet</strong></label>
                                                                    <div className="col-sm-10">
                                                                        <input type="number"   className="form-control text-white bg-dark"  onChange={(e)=>{setValue(`autores[${index}].Carnet`, e.target.value, {shouldValidate: true}); handleInputChange(index, e)}} {...register(`autores[${index}].Carnet`, {required: {value: true, message:'Es necesario escribir el número de carnet...'}})}  />
                                                                    </div>

                                                                    {
                                                                        errors.autores && errors.autores[index] && errors.autores[index].Carnet && (                                  
                                                                            
                                                                            <span className="badge rounded-pill text-bg-danger">{errors.autores[index].Carnet.message}</span>


                                                                        )
                                                                    }
                                                            </div>                                                
                                                            <div className="mb-3">
                                                                    <label className="col-form-label"><strong>Primer nombre</strong></label>
                                                                    <div className="col-sm-10">
                                                                        <input type="text" className="form-control text-white bg-dark"  onChange={(e)=>{setValue(`autores[${index}].primerNombre`, e.target.value, {shouldValidate: true}); handleInputChange(index, e)}} {...register(`autores[${index}].primerNombre`, {required: {value: true, message:'Es necesario escribir el primer nombre...'}})} />
                                                                    </div>

                                                                    {
                                                                        errors.autores && errors.autores[index] && errors.autores[index].primerNombre && (                                  
                                                                            
                                                                            <span className="badge rounded-pill text-bg-danger">{errors.autores[index].primerNombre.message}</span>


                                                                        )
                                                                    }
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="col-form-label"><strong>Segundo nombre</strong></label>
                                                                <div className="col-sm-10">
                                                                    <input type="text" className="form-control text-white bg-dark" onChange={(e)=>{setValue(`autores[${index}].segundoNombre`, e.target.value, {shouldValidate: true}); handleInputChange(index, e)}} {...register(`autores[${index}].segundoNombre`)}/>
                                                                </div>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="col-form-label"><strong>Tercer nombre</strong></label>
                                                                <div className="col-sm-10">
                                                                    <input type="text" className="form-control text-white bg-dark" onChange={(e)=>{setValue(`autores[${index}].tercerNombre`, e.target.value, {shouldValidate: true}); handleInputChange(index, e)}} {...register(`autores[${index}].tercerNombre`)}/>
                                                                </div>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="col-form-label"><strong>Primer apellido</strong></label>
                                                                <div className="col-sm-10">
                                                                    <input type="text" className="form-control text-white bg-dark" onChange={(e)=>{setValue(`autores[${index})].primerApellido`, e.target.value, {shouldValidate: true});handleInputChange(index, e)}} {...register(`autores[${index}].primerApellido`, {required: {value: true, message:'Es necesario escribir el primer apellido...'}})}/>
                                                                </div>

                                                                {
                                                                        errors.autores && errors.autores[index] && errors.autores[index].primerApellido && (                                  
                                                                            
                                                                            <span className="badge rounded-pill text-bg-danger">{errors.autores[index].primerApellido.message}</span>


                                                                        )
                                                                }
                                                            </div>
                                                            <div className="mb-3">
                                                                <label className="col-form-label"><strong>Segundo apellido</strong></label>
                                                                <div className="col-sm-10">
                                                                    <input type="text" className="form-control text-white bg-dark" onChange={(event)=>{setValue(`autores[${index}].segundoApellido`, event.target.value, {shouldValidate: true}); handleInputChange(index,event)}} {...register(`autores[${index}].segundoApellido`)}/>
                                                                </div>
                                                            </div>
                                                            
                                                                {
                                                                    !autor.ID_Autor&&(
                                                                        <div className="mt-4">
                                                                        <button type="button" className="btn btn-danger btn-sm align-middle" onClick={() => handleRemoveClick(index)} disabled={index !== autores.length - 1}><strong><i className="bi bi-trash3"></i> Eliminar</strong></button>
                            
                                                                        </div>

                                                                    )
                                                                }


                                                    </div>

                                                )
                                                ))

                                            }

                                            {
                                                autores.length!==0&&(<div className="d-flex justify-content-center align-items-center mb-4">
                                                    <button type="button" className="btn btn-primary" onClick={handleAddClick}><i className="bi bi-plus-circle-fill"></i> <strong>Agregar autor</strong></button>
                                                </div>)
                                            }

                                            {
                                                    autorCorp!==""&&(
                                                        <div className="mt-3">
                                                            <div className="mt-3">
                                                                <label className="col-sm-2 col-form-label"><strong>Autor Corporativo</strong></label>
                                                            </div>
                                                            <div className="d-flex align-items-center mb-3">
                                                                
                                                                <div className="col-sm-5">
                                                                    <div>
                                                                        <input type="text" className="form-control text-white bg-dark" {...register("Acorporativo", {required: {value: true, message:'Es necesario escribir el nombre del autor corporativo...'}})}/>
                                                                    </div>
                                                        
                                                                                        
                                                                    {
                                                                    errors.Acorporativo && (                                  
                                                                                                    
                                                                        <span className="badge rounded-pill text-bg-danger">{errors.Acorporativo.message}</span>
                                                        
                                                        
                                                                    )
                                                                    }

                                                                </div>
                                                                
                                                    
                                                            </div>
                                                        </div>
                                                    
                                                    )
                                        }

                                            <legend className="text-center mb-4"><strong>Datos generales del trabajo de graduación</strong></legend>

                                            <div className="col">

                                                <div className="mb-3">
                                                    <label className="col-sm-2 col-form-label"><strong>Correlativo</strong></label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control text-white bg-dark" {...register("correlativo", {required: {value: true, message:'Es necesario escribir el correlativo...'}})}/>
                                                    </div>

                                                    
                                                        {
                                                            errors.correlativo && (                                  
                                                                
                                                                <span className="badge rounded-pill text-bg-danger">{errors.correlativo.message}</span>


                                                            )
                                                        }

                                                </div>

                                                <div className="mb-3">
                                                    <label className="col-sm-12 col-form-label"><strong>Fecha de publicación</strong></label>
                                                    <div className="col-sm-10">
                                                        <input type="date" className="form-control bg-dark text-white" value={fechaPublicacion ||  new Date().toISOString().split('T')[0]} onChange={(e)=>{SetFechaPublicacion(e.target.value)}}/>    
                                                    </div>                                       
                                                        
                                                </div>

                                                
                                                <div className="mb-3">
                                                    <label className="col-sm-2 col-form-label"><strong>Título</strong></label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control text-white bg-dark"  onChange={(e)=>{setValue('titulo', e.target.value, {shouldValidate: true});setTitulo(e.target.value)}} {...register("titulo", {required: {value: true, message:'Es necesario escribir el titulo...'}})}/>
                                                    </div>

                                                    
                                                        {
                                                            errors.titulo && (                                  
                                                                
                                                                <span className="badge rounded-pill text-bg-danger">{errors.titulo.message}</span>


                                                            )
                                                        }

                                                </div>

                                                <div className="mb-3">
                                                    <label className="col-sm-10 col-form-label"><strong>Facultad</strong></label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control text-white bg-dark" value={facultad} onChange={(e)=>{e.target.value}} disabled/>
                                                    </div>
                                                </div>


                                                <div className="mb-3">
                                                    <label className="col-sm-10 col-form-label"><strong>Nivel educativo</strong></label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control text-white bg-dark" value={nivelEducativo} onChange={(e)=>{e.target.value}} disabled/>
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="col-sm-10 col-form-label"><strong>Grado académico</strong></label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control text-white bg-dark" value={gradoAcademico} onChange={(e)=>{e.target.value}} disabled/>
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="col-sm-2 col-form-label"><strong>Carrera</strong></label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control text-white bg-dark" value={carrera} onChange={(e)=>{e.target.value}} disabled/>
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="col-sm-10 col-form-label"><strong>Código de carrera</strong></label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control text-white bg-dark" value={codigoCarrera} onChange={(e)=>{e.target.value}} disabled/>
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="col-form-label"><strong>Cantidad de páginas</strong></label>
                                                    <div className="col-sm-10">
                                                        <input type="number" className="form-control text-white bg-dark" onChange={(e)=>{setValue('cantidadPaginas', e.target.value, {shouldValidate: true});setCantidadpaginas(e.target.value)}} {...register("cantidadPaginas", {required: {value: true, message:'Es necesario escribir la cantidad de paginas...'}})} pattern="/\d+/"/>
                                                    </div>
                                                    {
                                                            errors.cantidadPaginas && (                                  
                                                                
                                                                <span className="badge rounded-pill text-bg-danger">{errors.cantidadPaginas.message}</span>


                                                            )
                                                    }

                                                </div>

                                                <div className="mb-3">
                                                    <label className="col-form-label"><strong>Categoria</strong></label>
                                                    <div className="col-sm-10">
                                                        <select className='form-select text-white bg-dark' value={idcategoria} onChange={obtenerIdCategoria}>
                                                            {
                                                                categorias.map((data)=><option  key={data.ID_Categoria} value={data.ID_Categoria}>{data.nombreCategoria}</option>)
                                                            }
                                                        </select>

                                                    </div>


                                                </div>

                                                <div className="mb-3">
                                                    <label className="col-form-label"><strong>Material</strong></label>
                                                    <div className="col-sm-10">
                                                        <select className='form-select text-white bg-dark' value={idMaterial} onChange={obtenerIdMaterial}>
                                                            {
                                                                tipoMaterial.map((data)=><option  key={data.ID_TipoMaterial} value={data.ID_TipoMaterial}>{data.nombreTipoMaterial}</option>)
                                                            }
                                                        </select>

                                                    </div>


                                                </div>


                                                <div className="mb-3">
                                                    <label className="col-form-label"><strong>País</strong></label>
                                                    <div className="col-sm-10">
                                                        <select className='form-select text-white bg-dark' value={idPais} onChange={obtenerIdPais}>
                                                            {
                                                                paises.map((data)=><option  key={data.ID_Pais} value={data.ID_Pais}>{data.nombrePais}</option>)
                                                            }
                                                        </select>

                                                    </div>


                                                </div>


                                                <div className="mb-3">
                                                    <label className="col-form-label"><strong>Idioma</strong></label>
                                                    <div className="col-sm-10">
                                                        <select className='form-select text-white bg-dark' value={idIdioma} onChange={obtenerIdIdioma}>
                                                            {
                                                                idiomas.map((data)=><option  key={data.ID_Idioma} value={data.ID_Idioma}>{data.nombre}</option>)
                                                            }
                                                        </select>

                                                    </div>


                                                </div>

                                                


                                                <div className="mb-3 ">
                                                    <label className="form-label"><strong>Descripción (Resumen)</strong></label>

                                                    <div className="col-sm-10">
                                                        <textarea className="form-control text-white bg-dark"  rows="3" onChange={(e)=>{setValue('descripcion', e.target.value, {shouldValidate: true});setDescripcion(e.target.value)}} {...register("descripcion", {required: {value: true, message:'Es necesario escribir una descripción...'}})} ></textarea>
                                                    </div>

                                                    {
                                                            errors.descripcion && (                                  
                                                                
                                                                <span className="badge rounded-pill text-bg-danger">{errors.descripcion.message}</span>


                                                            )
                                                    }
                                                    
                                                </div>


                                                {
                                                    editorial==""&&(
                                                        <div className="form-check form-check-inline mb-3">
                                                                <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" checked={isChecked} onChange={handleCheckboxChange} />
                                                                <label className="form-check-label" htmlFor="inlineCheckbox1"><strong>{!isChecked?"Agregar editorial":"Quitar editorial"}</strong></label>
                                                        </div>
                                                    )
                                                }

                                                {
                                                    isChecked&&(
                                                    
                                                        <div className="mb-3 ">
                                                        <label className="form-label"><strong>Editorial</strong></label>

                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control text-white bg-dark" {...register("editorial", {required: {value: true, message:'Es necesario escribir la editorial'}})} />
                                                        </div>

                                                        {
                                                                errors.editorial && (                                  
                                                                    
                                                                    <span className="badge rounded-pill text-bg-danger">{errors.editorial.message}</span>


                                                                )
                                                        }
                                                        
                                                    </div>
                                                    )
                                                }


                                                <div className="mb-3 ">
                                                    <label className="form-label"><strong>Nota de tesis</strong></label>

                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control text-white bg-dark" {...register("notaTesis", {required: {value: true, message:'Es necesario escribir nota de tesis'}})} />
                                                    </div>

                                                    {
                                                            errors.notaTesis && (                                  
                                                                
                                                                <span className="badge rounded-pill text-bg-danger">{errors.notaTesis.message}</span>


                                                            )
                                                    }
                                                    
                                                </div>

                                                <div className="mb-3 ">
                                                    <label className="form-label"><strong>Palabras clave (separadas por ,)</strong></label>

                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control text-white bg-dark"  onChange={(e)=>{setValue('palabrasCla', e.target.value, {shouldValidate: true});setPalcl(e.target.value)}} {...register("palabrasCla", {required: {value: true, message:'Es necesario escribir las palabras clave'}})} />
                                                    </div>

                                                    {
                                                            errors.palabrasCla && (                                  
                                                                
                                                                <span className="badge rounded-pill text-bg-danger">{errors.palabrasCla.message}</span>


                                                            )
                                                    }
                                                    
                                                </div>

                                            </div>
                                            


                                            <div className="col">
                                                <embed className="mt-4" src={!file?url:(URL.createObjectURL(file))} type="application/pdf"  width="100%" height="300px"  />
                                                                            
                                                <div className="mt-4 d-flex justify-content-center align-items-center">
                                                    <button type="button" className="btn btn-primary" onClick={()=>{
                                                        if(ocultar){
                                                            setOcultar(!ocultar);
                                                        }else{
                                                            setOcultar(!ocultar);
                                                            setFile(null);
                                                        }
                                                        
                                                        }}>
                                                            {ocultar?"Cambiar archivo":"Conservar archivo anterior"}
                                                    </button>
                                                    
                                                </div>

                                                {
                                                            
                                                        !ocultar &&(
                                                                
                                                                <div className="justify-content-center align-items-center">
                                                                    <legend className="text-center mb-4"><strong>Subir archivo</strong></legend>
                                                                    
                                                                    <div className="input-group mb-3">
                                                                        <input type="file" className="form-control text-white bg-dark" id="inputGroupFile02" accept=".pdf" onChange={(e)=>{setFile(e.target.files[0])}}/>
                                                                    </div>
                                                                
                                                                </div>
                                                        ) 

                                                }

                                                                                                                                      


                                                <button className="btn btn-success mt-4 w-100"><strong>Actualizar datos</strong></button>
                                            </div>

                                            <div className="d-flex flex-row">
                            
                                            <div className="col">
                                                <legend className="text-center mb-4"><strong>Subir archivo anexo - opcional</strong></legend>
                                                
                                                {
                                                    archivosanexos.length!==0&&(
                                                        <div className="mt-4 mb-4 d-flex justify-content-center align-items-center">
                                                            <button type="button" className="btn btn-primary" onClick={()=>{
                                                                if(ocultarx){
                                                                    setOcultarx(!ocultarx);
                                                                }else{
                                                                    setOcultarx(!ocultarx);
                                                                    setFiles(null);
                                                                }
                                                                
                                                                }}>
                                                                    {ocultarx?"Cambiar archivo":"Conservar archivo anterior"}
                                                            </button>
                                                            
                                                        </div>

                                                    )
                                                }
                                                
                                                
                                                {
                                                    archivosanexos.length!==0?(
                                                        !ocultarx &&(
                                                            <div className="input-group mb-3">
                                                                <input type="file" className="form-control text-white bg-dark" id="ArchivoAnexo" accept=".pdf" onChange={(e)=>{setFiles(e.target.files[0])}}/>
                                                            </div> 
                                                        )

                                                    ):(
                                                        <div className="input-group mb-3">
                                                            <input type="file" className="form-control text-white bg-dark" id="ArchivoAnexo" accept=".pdf" onChange={(e)=>{setFiles(e.target.files[0])}}/>
                                                        </div>

                                                    )
                                                    
                                                }


                                                    {
                                                         files ? (
                                                            <>
                                                            <div className="mt-2 mb-2">
                                                            <button type="button" className="btn btn-danger btn-sm align-middle" onClick={() => removeAnnexedField()} ><strong><i className="bi bi-trash3"></i> Eliminar</strong></button>
                    
                                                            </div>
                                                            <embed src={URL.createObjectURL(files)} type="application/pdf"  width="100%" height="300px"  />
                                                            </>
                                                        ) : archivosanexos.length!==0 ? (
                                                            <embed src={archivosanexos[0].direccionGuardado} type="application/pdf"  width="100%" height="300px"  />
                                                        ) : null

                                                    }
                                                </div>

                                            </div>

                                        </div>

                            </form>
                            </fieldset>


                        </div>



                    )
                }
            
            
            </div>

        </>
    );
}

export default CompoEditarTrabajos;