"use client"
import { useEffect, useState } from "react";
import {useForm} from 'react-hook-form';
import { analytics } from "@/app/firebase/firebase-config";
import {ref, uploadBytes, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import { useSession } from "next-auth/react";
import useLog2 from "@/hooks/log2";
import {useRouter} from "next/navigation";


function SubaArchivoPage(){
    const {register, handleSubmit, setValue, formState:{errors}} = useForm(); 
    const [datosg, setUsuario1] = useLog2(null);
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState(null);
    const [urlfiles, setUrlfiles] = useState("");
    const [url, setUrl] = useState("");
    const [nombreusuario, setNombreusuario] = useState("");
    const [carrera, setCarrera] = useState("");
    const [idcarrera, setIdcarrera] = useState(0);
    const [categorias, setCategorias] = useState([]);
    const [idcategoria, setIdcategoria] = useState(0);
    const [secondname, setSecondname] = useState("");
    const [thirdname, setThirdname] = useState("");
    const [secondlastname, setSecondlastname] = useState("");
    const [barraprogreso, setBarraprogreso] = useState("0%");
    const [barraprogreso2, setBarraprogreso2] = useState("0%");
    const [idtrabajo, setIdtrabajo] = useState(null);
    const [idautor, setIdautor] = useState(null);
    const [idusuario, setIdusuario] = useState(null);
    const [tamanio, setTamanio] = useState(0);
    const [data1, setData1] = useState(null);
    const [control, setControl] = useState(false);
    const [formularioenviado, setFormularioenviado] = useState(true);
    const [autores, setAutores] = useState([{ Carnet:'',primerNombre: '', segundoNombre: '', tercerNombre: '', primerApellido: '', segundoApellido: '' }]);
    const [autores3, setAutores3]=useState([]);
    const { data: session, status } = useSession();

    const router = useRouter();


    useEffect(()=>{

         
        if(session){
            const usuario = session?.user.name;
            console.log("viendo usuario " + JSON.stringify(session, null, 2));
            console.log("nombre del usuario desde subida de archivos: " + usuario);
            setNombreusuario(usuario);
           
        
        }

    },[session])
   

    
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
        fetch('/api/datos/reCategoria').then(data=>data.json()).then(
            datos=> {console.log(datos); 
                setCategorias([...datos,...categorias]);
                setIdcategoria(datos[0].ID_Categoria);
            }
        )

    },[]);


    useEffect(()=>{
        const crearRegistro = async ()=>{
            if(tamanio>0 && barraprogreso=='100%' && url!=="" && data1 !==null){

                try{
                    const respuesta1 = await fetch('/api/datos/reTrabajoGraduacion', {
                        method: 'POST',
                        body: JSON.stringify({
                            titulo: data1.titulo,
                            cantidadPaginas: Number(data1.cantidadPaginas),
                            descripcion:data1.descripcion,
                            tamanio:Number(file.size),
                            direccionGuardado:url,
                            paClave:data1.palabrasCla,
                        }),
                        headers:{
                            'Content-Type':'application/json',
                        }
                    });
                    
                    const dato1 = await respuesta1.json();
                    console.log(dato1);
                    setIdtrabajo(dato1.ID_Trabajo);

                   

                }catch(error){
                    console.log("Error al crear el nuevo registro: " + error);
                    alert("Error inesperado al realizar registro, intentelo de nuevo...");
                }

                
    
            }


        };
        crearRegistro();

    },[tamanio,barraprogreso, url, data1]);


    useEffect(()=>{
        const actualizarDetalle= async()=>{
            if(idtrabajo!==null && idusuario!==null && autores3.length!==0){
                setBarraprogreso('0%');

                try{
                        
                    const respuesta3 = await fetch('/api/datos/reDetalleTrabajo',{
                        method:'POST',
                        body:JSON.stringify({
                            ID_trabajo: Number(idtrabajo),
                            ID_categoria:Number(idcategoria),
                            ID_formato: 1,
                            ID_carrera: Number(idcarrera),
                            //ID_autor: Number(idautor),
                            ID_usuario: Number(idusuario),
                            ID_estado:1

                        }),
                        headers:{
                            'Content-Type':'application/json',
                        }
                    });
                    const dato3 = await respuesta3.json();
                    console.log(dato3);
                    

                    for(const autor of autores3 ){
                        const respuesta2 = await fetch('/api/datos/reAutor',{
                            method:'POST',
                            body: JSON.stringify({
                                primerNombre: autor.primerNombre,
                                segundoNombre: autor.segundoNombre,
                                tercerNombre: autor.tercerNombre,
                                primerApellido: autor.primerApellido,
                                segundoApellido: autor.segundoApellido,
                                carnet:autor.Carnet,
                            }),
                            headers:{
                                'Content-Type':'application/json',
                            }
                        });
                        
                        const dato2= await respuesta2.json();
                        console.log(dato2);
                        //setIdautor(dato2.ID_Autor);

                        const respuesta4 = await fetch('/api/datos/reEnlaceAutorRegistro', {
                            method:'POST',                            
                            body:JSON.stringify({
                                ID_Autor:dato2.ID_Autor,
                                ID_Detalle:dato3.ID_Detalle,
                            }),
                            headers:{
                                'Content-Type':'application/json',
                            }
                        });
                        const dato4 = await respuesta4.json();
                        console.log(dato4);

                    }

                    if(urlfiles!==''){
                        setBarraprogreso2('0%');
                        const respuesta5 = await fetch('/api/datos/reArchivoAnexo',{
                            method:'POST',
                            body:JSON.stringify({
                                direccionGuardado:urlfiles,
                                ID_detalle:dato3.ID_Detalle,
                            }),
                            headers:{
                                'Content-Type':'application/json',
                            }

                        });
                        const dato5 = await respuesta5.json();
                        console.log(dato5);
                    }

                    setControl(true);


                }catch(error){
                    console.log("Ha ocurrido un error: " + error);
                    alert("Ha ocurrido un error inesperado, intentelo de nuevo...");
                }
               
                
    
            }


        };
        actualizarDetalle();
        

    },[idtrabajo, idusuario, autores3, urlfiles]);


    useEffect(()=>{
        if(control==true){
            setTamanio(0);
            setBarraprogreso('0%');
            setUrl("");
            //setData1(null);
            setControl(false);
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

    useEffect(()=>{
        console.log(autores3);
    },[autores3])

    const onSubmit= handleSubmit (async (data)=>{
        console.log(data);
        console.log(autores);
        setFormularioenviado(false);
        let autores2 = [];
        //setAutores3(autores2);
        for (let i = 0; i < autores.length; i++) {
            let autor = autores[i];
            // Crear un nuevo objeto autor2
            let autor2 = {};
            // Iterar sobre las claves del objeto autor
            for (let key in autor) {
              // Comprobar si la clave comienza con "autores"
              if (key.startsWith("autores")) {
                // Extraer la parte después de "autores[i]."
                let newKey = key.split(".")[1];
                // Agregar la nueva clave y su valor al objeto autor2
                autor2[newKey] = autor[key];
              }else{
                autor2[key] = autor[key];
              }
            }
            // Agregar el objeto autor2 al array autores2
            autores2.push(autor2);
          }
          
        setAutores3(autores2);
        console.log(autores3);
        //e.preventDefault();
        setData1(data);

        console.log(file);
        

        const expresion = /^[0-9]+$/;

        if(!expresion.test(data.cantidadPaginas)){
            alert("Escriba un número en el numero de paginas");
        }

        if(files!==null && file!==null){
            await cargarArchivos();
        }

        if(file!==null){
            setTamanio(file.size);
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
            setFormularioenviado(true);
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
        console.log(values);
    }

    function handleAddClick() {
        setAutores([...autores, { Carnet:'',primerNombre: '', segundoNombre: '', tercerNombre: '', primerApellido: '', segundoApellido: '' }]);
    }
      
    function handleRemoveClick(index) {
        const values = [...autores];
        values.splice(index, 1);
        setAutores(values);
    }

    function cargarArchivos(){
        return new Promise((resolve)=>{
           
        
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

    return(
        <>
            <div className="card text-bg-secondary mb-3" style={{width:'95%', margin:'0 auto'}}>
                    <div className="card-header"><strong>Usuario operativo:</strong> {nombreusuario}</div>
                    <div className="card-body">
                        <legend className="text-center mb-4"><strong>Publicación de trabajos de graduación:</strong> {carrera}</legend>                       
                    </div>
            </div>


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
                            autores.map((autor, index)=> ( 
                                    <div className="d-flex flex-row mb-4" key={index}>

                                        <div className="mb-3" >
                                                <label className="col-form-label"><strong>Carnet</strong></label>
                                                <div className="col-sm-10">
                                                    <input type="number" className="form-control text-white bg-dark" {...register(`autores[${index}].Carnet`, {required: {value: true, message:'Es necesario escribir el número de carnet...'}})}  onChange={event => handleInputChange(index, event)} pattern="/\d+/"/>
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
                                                    <input type="text" className="form-control text-white bg-dark" {...register(`autores[${index}].primerNombre`, {required: {value: true, message:'Es necesario escribir el primer nombre...'}})}  onChange={event => handleInputChange(index, event)}/>
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
                                                {/* <input type="text" className="form-control text-white bg-dark" onChange={(e)=>{console.log(e.target.value); setSecondname(e.target.value)}}/> */}
                                                <input type="text" className="form-control text-white bg-dark" name='segundoNombre' onChange={event => handleInputChange(index, event)}/>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="col-form-label"><strong>Tercer nombre</strong></label>
                                            <div className="col-sm-10">
                                                {/* <input type="text" className="form-control text-white bg-dark" onChange={(e)=>{setThirdname(e.target.value)}} /> */}
                                                <input type="text" className="form-control text-white bg-dark" name='tercerNombre' onChange={event => handleInputChange(index, event)} />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="col-form-label"><strong>Primer apellido</strong></label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control text-white bg-dark" {...register(`autores[${index}].primerApellido`, {required: {value: true, message:'Es necesario escribir el primer apellido...'}})} onChange={event => handleInputChange(index, event)}/>
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
                                                {/* <input type="text" className="form-control text-white bg-dark"  onChange={(e)=>{setSecondlastname(e.target.value)}}/> */}
                                                <input type="text" className="form-control text-white bg-dark"  name='segundoApellido' onChange={event => handleInputChange(index, event)}/>
                                            </div>
                                        </div>

                                        {
                                            index!==0&&(
                                                <div className="mt-4">
                                                <button type="button" className="btn btn-danger btn-sm align-middle" onClick={() => handleRemoveClick(index)} disabled={index !==autores.length-1}><strong><i className="bi bi-trash3"></i> Eliminar</strong></button>
    
                                                </div>

                                            )
                                        }



                                </div>

                            )
                            )
                        }

                        <div className="d-flex justify-content-center align-items-center mb-4">
                            <button type="button" className="btn btn-primary" onClick={handleAddClick}><i className="bi bi-plus-circle-fill"></i> <strong>Agregar autor</strong></button>
                        </div>

                        
                        
                        <legend className="text-center mb-4"><strong>Datos generales del trabajo de graduación</strong></legend>

                        <div className="col">
                            
                            <div className="mb-3">
                                <label className="col-sm-2 col-form-label"><strong>Título</strong></label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control text-white bg-dark" {...register("titulo", {required: {value: true, message:'Es necesario escribir el titulo...'}})}/>
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
                                    <input type="number" className="form-control text-white bg-dark" {...register("cantidadPaginas", {required: {value: true, message:'Es necesario escribir la cantidad de paginas...'}})} pattern="/\d+/"/>
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
                                    <select className='form-select text-white bg-dark' onChange={obtenerIdCategoria}>
                                        {
                                            categorias.map((data)=><option  key={data.ID_Categoria} value={data.ID_Categoria}>{data.nombreCategoria}</option>)
                                        }
                                    </select>

                                </div>


                            </div>

                            <div className="mb-3 ">
                                <label className="form-label"><strong>Descripción (Resumen)</strong></label>

                                <div className="col-sm-10">
                                    <textarea className="form-control text-white bg-dark"  rows="3" {...register("descripcion", {required: {value: true, message:'Es necesario escribir una descripción...'}})} ></textarea>
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
                                    <input type="text" className="form-control text-white bg-dark" {...register("palabrasCla", {required: {value: true, message:'Es necesario escribir las palabras clave'}})} />
                                </div>

                                {
                                        errors.palabrasCla && (                                  
                                            
                                            <span className="badge rounded-pill text-bg-danger">{errors.palabrasCla.message}</span>


                                        )
                                }
                                
                            </div>

                        </div>
                        
                        
                        <div className="col">
                            <legend className="text-center mb-4"><strong>Subir archivo</strong></legend>
                            {/* <input type="file" accept=".pdf" onChange={(e)=>{setFile(e.target.files[0])}}/> */}
                            <div className="input-group mb-3">
                                <input type="file" className="form-control text-white bg-dark" id="inputGroupFile02" accept=".pdf" onChange={(e)=>{setFile(e.target.files[0])}}/>
                            </div>
                           

                            {
                                file &&(
                                    <embed src={URL.createObjectURL(file)} type="application/pdf"  width="100%" height="300px"  />
                                    
                                )

                            }



                            <button className="btn btn-success mt-4 w-100"><strong>Cargar datos</strong></button>
                        </div>

                        <div className="d-flex flex-row">
                            <div className="col">
                                <legend className="text-center mb-4"><strong>Subir archivo anexo - opcional</strong></legend>
                                <div className="input-group mb-3">
                                    <input type="file" className="form-control text-white bg-dark" id="ArchivoAnexo" accept=".pdf" onChange={(e)=>{setFiles(e.target.files[0])}}/>
                                </div>

                                {
                                    files &&(
                                        <>
                                        <div className="mt-2 mb-2">
                                        <button type="button" className="btn btn-danger btn-sm align-middle" onClick={() => removeAnnexedField()} ><strong><i className="bi bi-trash3"></i> Eliminar</strong></button>

                                        </div>

                                        <embed src={URL.createObjectURL(files)} type="application/pdf"  width="100%" height="300px"  />
                                        
                                        </>
                                    )

                                }
                            </div>

                        </div>

                    </div>

                </form>
                </fieldset>

                
            {/* 
                {
                    
                    url &&(
                        <embed src={url} type="application/pdf"  width="20%" height="300px"  />
                    )
                } */}
            
            </div>

           
            
        </>
    );
}

export default SubaArchivoPage;