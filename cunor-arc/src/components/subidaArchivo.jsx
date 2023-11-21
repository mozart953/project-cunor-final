"use client"
import { useState } from "react";
import { analytics } from "@/app/firebase/firebase-config";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"


function SubaArchivoPage(){
    const [file, setFile] = useState(null);

    const onSubmit= async (e)=>{
        e.preventDefault();

        console.log(file);

        if(file!==null){
            const fileref = ref(analytics, 'newfiles/notes');
            uploadBytes(fileref, file).then((data)=>{
                getDownloadURL(data.ref).then((url)=>{console.log(url)});
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
            <div className="text-white">
                <form onSubmit={onSubmit}>
                    <input type="file" onChange={(e)=>{setFile(e.target.files[0])}}/>

                    <button className="btn btn-success">Cargar datos</button>
                </form>

                {
                    file &&(
                        // console.log(URL.createObjectURL(file));

                        <embed src={URL.createObjectURL(file)} type="application/pdf"  width="20%" height="300px"  />
                    )
                }
            
            </div>

           
            
        </>
    );
}

export default SubaArchivoPage;