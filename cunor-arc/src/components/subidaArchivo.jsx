"use client"
import { useEffect, useState } from "react";
import {useForm} from 'react-hook-form';
import { analytics } from "@/app/firebase/firebase-config";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { useSession } from "next-auth/react";
import useLog2 from "@/hooks/log2";


function SubaArchivoPage(){
    const {register, handleSubmit, formState:{errors}} = useForm(); 
    const [datosg, setUsuario1] = useLog2(null);
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");
    const [nombreusuario, setNombreusuario] = useState("");
    const [carrera, setCarrera] = useState("");
    const [idcarrera, setIdcarrera] = useState(0);
    const [categorias, setCategorias] = useState([]);
    const [idcategoria, setIdcategoria] = useState(0);
    const { data: session, status } = useSession();


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

    const obtenerIdCategoria = (e)=>{
        e.preventDefault();

        const selectCategoria = e.target.value;
        console.log(selectCategoria);
        setIdcategoria(selectCategoria);
    }



    const onSubmit= handleSubmit (async (data)=>{
        console.log(data);
        //e.preventDefault();

        console.log(file);

        if(file!==null){
            const fileref = ref(analytics, 'newfiles/notes');
            uploadBytes(fileref, file).then((data)=>{
                getDownloadURL(data.ref).then((url)=>{console.log(url); setUrl(url)});
            })

        }else{
            alert("seleccionar archivo");
        }

        // const formdata = new FormData();
        // formdata.append('file', file);

        // const res = await fetch('/api/subidaArchivo', {
        //     method: 'POST',
        //     body:formdata,
        // });

        // console.log(res);

    });

    return(
        <>
            <div className="text-white mt-5">
                <form onSubmit={onSubmit}>
                    <legend className="text-center mb-4">Publicación de trabajo de graduación</legend>

                    <div className="row bg-secondary rounded" style={{width: '80%', margin: '0 auto'}}>
                        <div className="col">
                            <legend className="text-center mb-4">Datos generales del trabajo de graduación</legend>
                            <div className="mb-3">
                                <label className="col-sm-2 col-form-label">Título</label>
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
                                <label className="col-sm-2 col-form-label">Carrera</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control text-white bg-dark" value={carrera} onChange={(e)=>{e.target.value}} disabled/>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label">Cantidad de páginas</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control text-white bg-dark" {...register("cantidadPaginas", {required: {value: true, message:'Es necesario escribir la cantidad de paginas...'}})} pattern="\d*"/>
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
                                    <select className='form-select text-white bg-dark' onChange={obtenerIdCategoria}>
                                        {
                                            categorias.map((data)=><option  key={data.ID_Categoria} value={data.ID_Categoria}>{data.nombreCategoria}</option>)
                                        }
                                    </select>

                                </div>


                            </div>

                            <div className="mb-3 ">
                                <label className="form-label">Descripción</label>

                                <div className="col-sm-10">
                                    <textarea className="form-control text-white bg-dark"  rows="3" {...register("descripcion", {required: {value: true, message:'Es necesario escribir una descripción...'}})} ></textarea>
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
                                        <input type="text" className="form-control text-white bg-dark" {...register("primerNombre", {required: {value: true, message:'Es necesario escribir el primer nombre...'}})} />
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
                                    <input type="text" className="form-control text-white bg-dark" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label">Tercer nombre</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control text-white bg-dark" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label">Primer apellido</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control text-white bg-dark" {...register("primerApellido", {required: {value: true, message:'Es necesario escribir el primer apellido...'}})}/>
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
                                    <input type="text" className="form-control text-white bg-dark"  />
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <legend className="text-center mb-4">Subir archivo</legend>
                            {/* <input type="file" accept=".pdf" onChange={(e)=>{setFile(e.target.files[0])}}/> */}
                            <div className="input-group mb-3">
                                <input type="file" className="form-control text-white bg-dark" id="inputGroupFile02" accept=".pdf" onChange={(e)=>{setFile(e.target.files[0])}}/>
                            </div>

                            {
                                file &&(
                                    <embed src={URL.createObjectURL(file)} type="application/pdf"  width="100%" height="300px"  />
                                )

                            }



                            <button className="btn btn-success mt-4 w-100">Cargar datos</button>
                        </div>

                    </div>

                </form>

                
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