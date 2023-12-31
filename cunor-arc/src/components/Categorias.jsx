"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function CompoCategorias(){
    const [datos, setDatos] = useState([]);

    const [currentpage, setCurrentpage] = useState(1);
    const [totalitems, setTotalitems] = useState(null);
    const [itemspagina, setItemspagina] = useState(5);
    const [totalPaginas, setTotalpaginas] = useState(null);
    const [paginasmaximas, setPaginasmaximas] = useState(5);
    const [busqueda, setBusqueda] = useState("");

    const router = useRouter();

    useEffect(
        ()=>{
            if(currentpage){
                fetch(`/api/datos/reCategoriasPaginado?page=${currentpage}&itemsPagina=${itemspagina}&searchTerm=${busqueda}`)
                .then(data=>data.json())
                .then(datos=>{console.log(datos);setDatos(datos.items); setTotalitems(datos.total)});
            }
        },[currentpage]);

    
    useEffect(()=>{
            if(totalitems!==null){
                const totalPaginas = Math.ceil(totalitems/itemspagina);
                setTotalpaginas(totalPaginas);
            }
    },[totalitems])
    
    function nextPage(){
            const totalPaginas = Math.ceil(totalitems/itemspagina);
            if(currentpage<totalPaginas){
                setCurrentpage(currentpage+1);
            }
            
    }
    
    function beforePage(){
            if(currentpage>1){
                setCurrentpage(currentpage-1);
            }
    }


    const onSubmit = async (e)=>{
        e.preventDefault();
        console.log(busqueda);

        const respuesta = await fetch(`/api/datos/reCategoriasPaginado?page=${currentpage}&itemsPagina=${itemspagina}&searchTerm=${busqueda}`);
        const datos = await respuesta.json();
        console.log(datos);

        if(respuesta.ok){
            setDatos(datos.items); 
            setTotalitems(datos.total);
        }else{
            alert("Algo salio mal, intententelo nuevamente...")
        }
    }


    return(
        <>
            <div className="card text-bg-secondary mb-3 rounded-xl" style={{width:'50%', margin:'0 auto', borderRadius:'15px'}}>
                    <div className="card-body">
                        <legend className="text-center mb-4"><i className="bi bi-bookmark-fill"></i>Gestión de categorias</legend>                       
                    </div>
            </div>

            <div className="mb-3 d-flex justify-content-center align-items-center">
                        <form className="input-group" style={{width: "600px"}} onSubmit={onSubmit}>
                                <input type="search" className="form-control" placeholder="Buscar categoria" aria-label="Search" value={busqueda} onChange={(e)=>{setBusqueda(e.target.value)}}/>
                                <button className="btn btn-outline-primary" type="submit" data-mdb-ripple-color="dark" style={{padding: ".45rem 1.5rem .35rem"}}>
                                <i className="bi bi-search"></i> Buscar 
                                </button>
                        </form>
            </div>

            
            <div className="bg-dark text-white border border-secondary mb-3 pt-2 content-center d-flex justify-content-center align-items-center" style={{width:'20%', margin:'0 auto'}}>
                <h3>Resultados: {totalitems} </h3>
            </div>


            <div className="d-flex content-center" style={{paddingTop:'20px', paddingLeft:'100px', paddingBottom:'10px'}}>
                <button type="button" className="btn btn-success" onClick={()=>{router.push('/dashboardAdmin/adminCategorias/crearCategoria')}}><i className="bi bi-plus-lg"></i>Crear categoria</button>
            </div>

            <div className="mt-4" style={{width:'85%', margin:'0 auto'}}>
                    
                    <div className="content-center d-flex justify-content-center align-items-center">
                            <nav aria-label="..." style={{cursor:"pointer"}}>
                                <ul className="pagination">
                                <li className={`page-item ${currentpage === 1 ? 'disabled' : ''}`}>
                                    <a className="page-link" onClick={beforePage}>Anterior</a>
                                </li>
                                {[...Array(Math.min(totalPaginas,paginasmaximas))].map((_, i) => (
                                    <li className={`page-item ${i + 1 === currentpage ? 'active' : ''}`} key={i}>
                                    <a className="page-link" onClick={() => setCurrentpage(i + 1+ (Math.floor((currentpage-1)/ paginasmaximas)*paginasmaximas))}>{i + 1 + (Math.floor((currentpage-1)/ paginasmaximas)*paginasmaximas)}</a>
                                    </li>
                                ))}
                                <li className={`page-item ${currentpage === totalPaginas ? 'disabled' : ''}`}>
                                    <a className="page-link" onClick={nextPage}>Siguiente</a>
                                </li>
                                </ul>
                            </nav>
                    </div>


                <table className="table table-dark table-striped text-center" style={{borderRadius: '15px', overflow: 'hidden', border:'1px solid gray'}}>
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Operaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datos.map((data)=>(
                                <tr key={data.ID_Categoria}>
                                    <th scope="row">{data.ID_Categoria}</th>
                                    <td>{data.nombreCategoria}</td>
                                    <td>
                                        <button type="button" className="btn btn-secondary" 
                                        onClick={()=>{router.push(`/dashboardAdmin/adminCategorias/editarCategoria/${data.ID_Categoria}`)}}><i className="bi bi-pencil-square"></i></button>
                                    </td>
                                </tr>
                            )

                            )
                        }
                    </tbody>

                </table>

                <div className="content-center d-flex justify-content-center align-items-center">
                            <nav aria-label="..." style={{cursor:"pointer"}}>
                                <ul className="pagination">
                                <li className={`page-item ${currentpage === 1 ? 'disabled' : ''}`}>
                                    <a className="page-link" onClick={beforePage}>Anterior</a>
                                </li>
                                {[...Array(Math.min(totalPaginas,paginasmaximas))].map((_, i) => (
                                    <li className={`page-item ${i + 1 === currentpage ? 'active' : ''}`} key={i}>
                                    <a className="page-link" onClick={() => setCurrentpage(i + 1+ (Math.floor((currentpage-1)/ paginasmaximas)*paginasmaximas))}>{i + 1 + (Math.floor((currentpage-1)/ paginasmaximas)*paginasmaximas)}</a>
                                    </li>
                                ))}
                                <li className={`page-item ${currentpage === totalPaginas ? 'disabled' : ''}`}>
                                    <a className="page-link" onClick={nextPage}>Siguiente</a>
                                </li>
                                </ul>
                            </nav>
                </div>

            </div>
        </>
    );
}

export default CompoCategorias;