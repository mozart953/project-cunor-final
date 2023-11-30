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

    //trabajoGrad

    const [idtrabajo, setIdtrabajo] = useState(null);
    const [titulo, setTitulo] = useState(null);
    const [cantidadpaginas, setCantidadpaginas]= useState(null);
    const [descripcion, setDescripcion]=useState(null);
    const [url, setUrl] = useState("");

    const [ocultar, setOcultar] = useState(true);
    const [eliminado, setEliminado] = useState(false);
    const [interruptor, setInterruptor] = useState(false);
            
    const [idcarrera1, setIdcarrera1]= useState(null);
    const [iduser1, setIduser1] = useState(null);
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
        if(datostrabajo){
            setValue('titulo', titulo);
            setValue('cantidadPaginas',cantidadpaginas);
            setValue('descripcion', descripcion);
            setValue('primerNombre', primernombre);
            setValue('segundoNombre', segundonombre);
            setValue('tercerNombre', tercernombre);
            setValue('primerApellido', primerapellido);
            setValue('segundoApellido', segundoapellido);
        }
    },[datostrabajo]);


    useEffect(()=>{
        if(idcarrera1 && iduser1){
            fetch(`/api/datos/reDetalleTrabajo/filtroB?idDetalle=${idDetalle}&idUsuario=${iduser1}&idCarrera=${idcarrera1}`)
            .then(data => data.json()).then(datos=>{
                console.log(datos); setDatostrabajo(datos);
                setIdautor(datos.autor.ID_Autor);
                setPrimernombre(datos.autor.primerNombre);
                setSegundonombre(datos.autor.segundoNombre);
                setTercerNombre(datos.autor.tercerNombre);
                setPrimerapellido(datos.autor.primerApellido);
                setSegundoapellido(datos.autor.segundoApellido);

                setIdtrabajo(datos.trabajoGrad.ID_Trabajo);
                setTitulo(datos.trabajoGrad.titulo);
                setCantidadpaginas(datos.trabajoGrad.cantidadPaginas);
                setDescripcion(datos.trabajoGrad.descripcion);
                setTamanio(datos.trabajoGrad.tamanio);
                setUrl(datos.trabajoGrad.direccionGuardado);

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

            if(tamanio>0 && barraprogreso=='100%' && url!=="" && data1 !==null && idautor!==null && idtrabajo!==null){
                console.log("viendo datos" +JSON.stringify(data1));
                console.log(tamanio + " " + " " +barraprogreso + " " + url+  " " + idautor + " "+ idtrabajo );

                try{

                    const respuesta1 = await fetch(`/api/datos/reTrabajoGraduacion/${idtrabajo}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            titulo: data1.titulo,
                            cantidadPaginas: Number(data1.cantidadPaginas),
                            descripcion:data1.descripcion,
                            tamanio:Number(tamanio),
                            direccionGuardado:url,
                        }),
                        headers:{
                            'Content-Type':'application/json',
                        }
                    });
                    const datos1 = await respuesta1.json();
                    console.log(datos1);
                    setControl1(true);

            
                    const respuesta2 = await fetch(`/api/datos/reAutor/${idautor}`,{
                        method:'PUT',
                        body: JSON.stringify({
                            primerNombre: data1.primerNombre,
                            segundoNombre: data1.segundoNombre,
                            tercerNombre: data1.tercerNombre,
                            primerApellido: data1.primerApellido,
                            segundoApellido: data1.segundoApellido,
                        }),
                        headers:{
                            'Content-Type':'application/json',
                        }
                    });
                    const datos2 = await respuesta2.json();
                    console.log(datos2);
                    setControl2(true);        

                }catch(error){
                    console.log("Error al actualizar trabajos o autor: " + error);
                    alert("Ha ocurrido un problema inesperado, intentalo de nuevo...");
                }         
                

            }




        };
        actualizarDatos();    

    },[tamanio,barraprogreso, url, data1, idautor, idtrabajo]);

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





    console.log(idDetalle);

    return(
        <>
            <div>Edicion de archivo {idDetalle}
                <div className="card text-bg-secondary mb-3" style={{width:'80%', margin:'0 auto'}}>
                    <div className="card-header">Usuario operativo: {nombreusuario}</div>
                    <div className="card-body">
                        <legend className="text-center mb-4">Edición de trabajos de graduación: {carrera}</legend>                       
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
                                        
                                        <div className="row bg-secondary rounded" style={{width: '80%', margin: '0 auto'}}>
                                            <div className="col">
                                                <legend className="text-center mb-4">Datos generales del trabajo de graduación</legend>
                                                <div className="mb-3">
                                                    <label className="col-sm-2 col-form-label">Título</label>
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
                                                    <label className="col-sm-2 col-form-label">Carrera</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control text-white bg-dark" value={carrera} onChange={(e)=>{e.target.value}} disabled/>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="col-form-label">Cantidad de páginas</label>
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
                                                    <label className="col-form-label">Categoria</label>
                                                    <div className="col-sm-10">
                                                        <select className='form-select text-white bg-dark' value={idcategoria} onChange={obtenerIdCategoria}>
                                                            {
                                                                categorias.map((data)=><option  key={data.ID_Categoria} value={data.ID_Categoria}>{data.nombreCategoria}</option>)
                                                            }
                                                        </select>

                                                    </div>


                                                </div>

                                                <div className="mb-3 ">
                                                    <label className="form-label">Descripción (Resumen)</label>

                                                    <div className="col-sm-10">
                                                        <textarea className="form-control text-white bg-dark"  rows="3" onChange={(e)=>{setValue('descripcion', e.target.value, {shouldValidate: true});setDescripcion(e.target.value)}} {...register("descripcion", {required: {value: true, message:'Es necesario escribir una descripción...'}})} ></textarea>
                                                    </div>

                                                    {
                                                            errors.descripcion && (                                  
                                                                
                                                                <span className="badge rounded-pill text-bg-danger">{errors.descripcion.message}</span>


                                                            )
                                                    }
                                                    
                                                </div>

                                            </div>
                                            
                                            <div className="col">
                                                <legend className="text-center mb-4">Datos generales del autor</legend>
                                                <div className="mb-3">
                                                        <label className="col-form-label">Primer nombre</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control text-white bg-dark"  onChange={(e)=>{setValue('primerNombre', e.target.value, {shouldValidate: true}); setPrimernombre(e.target.value)}} {...register("primerNombre", {required: {value: true, message:'Es necesario escribir el primer nombre...'}})} />
                                                        </div>

                                                        {
                                                            errors.primerNombre && (                                  
                                                                
                                                                <span className="badge rounded-pill text-bg-danger">{errors.primerNombre.message}</span>


                                                            )
                                                        }
                                                </div>
                                                <div className="mb-3">
                                                    <label className="col-form-label">Segundo nombre</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control text-white bg-dark" onChange={(e)=>{setValue('segundoNombre', e.target.value, {shouldValidate: true}); setSegundonombre(e.target.value)}} {...register("segundoNombre")}/>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="col-form-label">Tercer nombre</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control text-white bg-dark" onChange={(e)=>{setValue('tercerNombre', e.target.value, {shouldValidate: true}); setTercerNombre(e.target.value)}} {...register("tercerNombre")}/>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="col-form-label">Primer apellido</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control text-white bg-dark" onChange={(e)=>{setValue('primerApellido', e.target.value, {shouldValidate: true});setPrimerapellido(e.target.value)}} {...register("primerApellido", {required: {value: true, message:'Es necesario escribir el primer apellido...'}})}/>
                                                    </div>

                                                    {
                                                            errors.primerApellido && (                                  
                                                                
                                                                <span className="badge rounded-pill text-bg-danger">{errors.primerApellido.message}</span>


                                                            )
                                                    }
                                                </div>
                                                <div className="mb-3">
                                                    <label className="col-form-label">Segundo apellido</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control text-white bg-dark" onChange={(e)=>{setValue('segundoApellido', e.target.value, {shouldValidate: true}); setSegundoapellido(e.target.value)}} {...register("segundoApellido")}/>
                                                    </div>
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
                                                                    <legend className="text-center mb-4">Subir archivo</legend>
                                                                    
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