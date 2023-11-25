"use client"
import { useSession } from "next-auth/react";
function CompoListarArchivosPage(){
    const { data: session, status } = useSession();
    return(
        <>
            <div className="card">
            <div className="card-header">
                Featured
            </div>
            <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <button type="button" class="btn btn-warning">Editar</button>
                <button type="button" class="btn btn-danger">Eliminar</button>


            </div>
            </div>

        </>
    )
}

export default CompoListarArchivosPage;