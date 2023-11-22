"use client"
import { useState } from "react";
import {useForm} from 'react-hook-form';
import { analytics } from "@/app/firebase/firebase-config";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"


function SubaArchivoPage(){
    const {register, handleSubmit, formState:{errors}} = useForm(); 
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");

    const onSubmit= async (e)=>{
        e.preventDefault();

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

    }

    return(
        <>
            <div className="text-white mt-5">
                <form onSubmit={onSubmit}>
                    <legend className="text-center mb-4">Publicación de trabajo de graduación</legend>

                    <div className="row bg-secondary rounded" style={{width: '80%', margin: '0 auto'}}>
                        <div className="col">
                            <legend className="text-center mb-4">Datos generales del trabajo de graduación</legend>
                            <div className="mb-3">
                                <label className="col-sm-2 col-form-label">Titulo</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control text-white bg-dark" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="col-sm-2 col-form-label">Carrera</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control text-white bg-dark" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label">Cantidad de páginas</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control text-white bg-dark" pattern="\d*"/>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="col-form-label">Categoria</label>
                                <div className="col-sm-10">
                                    <select className='form-select text-white bg-dark'>

                                    </select>

                                </div>


                            </div>

                            <div className="mb-3 ">
                                <label className="form-label">Descripción</label>

                                <div className="col-sm-10">
                                    <textarea className="form-control text-white bg-dark"  rows="3"></textarea>
                                </div>
                                
                            </div>

                        </div>
                        
                        <div className="col">
                            <legend className="text-center mb-4">Datos generales del autor</legend>
                            <div className="mb-3">
                                    <label className="col-form-label">Primer nombre</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control text-white bg-dark" />
                                    </div>
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
                                    <input type="text" className="form-control text-white bg-dark" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label">Segundo apellido</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control text-white bg-dark" />
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