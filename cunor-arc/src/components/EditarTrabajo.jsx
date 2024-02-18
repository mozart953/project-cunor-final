"use client"
import { useEffect, useState } from "react";
import {useForm} from 'react-hook-form';
import { analytics } from "@/app/firebase/firebase-config";
import {ref,deleteObject, uploadBytes, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import useLog2 from "@/hooks/log2";


function CompoEditarTrabajos({idDetalle}){
    const [datosg, setUsuario1] = useLog2(null);
    const [nombreusuario, setNombreusuario] = useState("");
    const [carrera, setCarrera] = useState("");
    const [idcarrera, setIdcarrera] = useState(0);
    const [idusuario, setIdusuario] = useState(null);
    const [datostrabajo, setDatostrabajo] = useState({});

    const {register, handleSubmit, setValue, formState:{errors}} = useForm(); 
    const [tamanio, setTamanio] = useState(0);
    const [data1, setData1] = useState(null);
    const [barraprogreso, setBarraprogreso] = useState("0%");
    const [idcategoria, setIdcategoria] = useState(0);
    const [categorias, setCategorias] = useState([]);
    const [file, setFile] = useState(null);
    const [control, setControl] = useState(false);

    const [control1, setControl1] = useState(false);
    const [control2, setControl2] = useState(false);

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
    const [eliminado, setEliminado] = useState(false);
    const [interruptor, setInterruptor] = useState(false);
            
    const [idcarrera1, setIdcarrera1]= useState(null);
    const [iduser1, setIduser1] = useState(null);
    const [autores, setAutores] = useState([{ ID_Autor:'', Carnet:'',primerNombre: '', segundoNombre: '', tercerNombre: '', primerApellido: '', segundoApellido: '' }]);
    const [autores3, setAutores3]=useState([]);
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
        if(datostrabajo && autores.length!==0){
            setValue('titulo', titulo);
            setValue('cantidadPaginas',cantidadpaginas);
            setValue('descripcion', descripcion);
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


            setValue('palabrasCla', palcl);
        }
    },[datostrabajo, autores]);


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


                setIdtrabajo(datos.trabajoGrad.ID_Trabajo);
                setTitulo(datos.trabajoGrad.titulo);
                setCantidadpaginas(datos.trabajoGrad.cantidadPaginas);
                setDescripcion(datos.trabajoGrad.descripcion);
                setTamanio(datos.trabajoGrad.tamanio);
                setUrl(datos.trabajoGrad.direccionGuardado);
                setPalcl(datos.trabajoGrad.paClave);

                setIdcategoria(datos.categoria.ID_Categoria); 
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

    },[]);


    
    useEffect(()=>{
        const actualizarDatos= async ()=>{

            if(tamanio>0 && barraprogreso=='100%' && url!=="" && data1 !==null && autores.length!==0 && idtrabajo!==null){
                console.log("viendo datos" +JSON.stringify(data1));
                //console.log(tamanio + " " + " " +barraprogreso + " " + url+  " " + idautor + " "+ idtrabajo );

                try{

                    const respuesta1 = await fetch(`/api/datos/reTrabajoGraduacion/${idtrabajo}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            titulo: data1.titulo,
                            cantidadPaginas: Number(data1.cantidadPaginas),
                            descripcion:data1.descripcion,
                            tamanio:Number(tamanio),
                            direccionGuardado:url,
                            paClave:data1.palabrasCla,
                        }),
                        headers:{
                            'Content-Type':'application/json',
                        }
                    });
                    const datos1 = await respuesta1.json();
                    console.log(datos1);
                    setControl1(true);

                    for(let i=0;i< data1.autores.length;i++){
                        let idAutor = autores[i].ID_Autor;
                        console.log("el id del autor es> " + idAutor);

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

                    }

                    setControl2(true);        

                }catch(error){
                    console.log("Error al actualizar trabajos o autor: " + error);
                    alert("Ha ocurrido un problema inesperado, intentalo de nuevo...");
                }         
                

            }




        };
        actualizarDatos();    

    },[tamanio,barraprogreso, url, data1, autores, idtrabajo]);

    useEffect(()=>{
        if(control1 && control2){
            setBarraprogreso('0%');
            try{

                fetch(`/api/datos/reDetalleTrabajo/${idDetalle}`,{
                    method:'PUT',
                    body:JSON.stringify({
                        ID_categoria:Number(idcategoria),                        
    
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



    const onSubmit= handleSubmit (async (data)=>{
        console.log(data);
        //e.preventDefault();
        setData1(data);

        console.log(file);
        

        const expresion = /^[0-9]+$/;

        if(!expresion.test(data.cantidadPaginas)){
            alert("Escriba un número en el numero de paginas");
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
            alert("seleccionar archivo");
            const valor = confirm("¿Desea conservar el mismo archivo?");
            console.log(valor);
            //setInterruptor(valor);
            if(valor==true){
                setBarraprogreso('100%');
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
        setAutores([...autores, { Carnet:'',primerNombre: '', segundoNombre: '', tercerNombre: '', primerApellido: '', segundoApellido: '' }]);
    }
      
    function handleRemoveClick(index) {
        const values = [...autores];
        values.splice(index, 1);
        setAutores(values);
    }


    console.log(idDetalle);

    return(
        <>
            <div>Edicion de archivo {idDetalle}
                <div className="card text-bg-secondary mb-3" style={{width:'95%', margin:'0 auto'}}>
                    <div className="card-header"><strong>Usuario operativo:</strong> {nombreusuario}</div>
                    <div className="card-body">
                        <legend className="text-center mb-4"><strong>Edición de trabajos de graduación:</strong> {carrera}</legend>                       
                    </div>
                </div>

                {
                    datostrabajo &&(

                        <div className="text-white mt-4">
                          
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

                                <form onSubmit={onSubmit}>
                                        
                                        <div className="row bg-secondary rounded" style={{width: '95%', margin: '0 auto'}}>
                                        <legend className="text-center mb-4"><strong>Datos generales del autor</strong></legend>
                                            
                                            {
                                                autores.map((autor, index)=>(
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
                                                    </div>

                                                )
                                                )

                                            }

                                            <div className="d-flex justify-content-center align-items-center mb-4">
                                                <button type="button" className="btn btn-primary" onClick={handleAddClick}><i className="bi bi-plus-circle-fill"></i> <strong>Agregar autor</strong></button>
                                            </div>

                                            <div className="col">
                                                <legend className="text-center mb-4"><strong>Datos generales del trabajo de graduación</strong></legend>
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
                                                    <label className="col-sm-2 col-form-label"><strong>Carrera</strong></label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control text-white bg-dark" value={carrera} onChange={(e)=>{e.target.value}} disabled/>
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

                                                                                                                                      


                                                <button className="btn btn-success mt-4 w-100">Actualizar datos</button>
                                            </div>

                                        </div>

                            </form>


                        </div>



                    )
                }
            
            
            </div>

        </>
    );
}

export default CompoEditarTrabajos;