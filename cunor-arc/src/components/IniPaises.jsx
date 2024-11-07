"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function CompoPaisesPage({datos, totalItems}){

    const router = useRouter();

    const [datosG, setDatosG] = useState([]);
    

    const [currentpage, setCurrentpage] = useState(1);
    const [totalitems, setTotalitems] = useState(null);
    const [itemspagina, setItemspagina] = useState(10);
    const [totalPaginas, setTotalpaginas] = useState(null);
    const [paginasmaximas, setPaginasmaximas] = useState(5);
    const [busqueda, setBusqueda] = useState("");
    const [busquedainte, setBusquedainte] = useState("");

    useEffect(()=>{
        console.log(datos);
        setDatosG(datos);
        setTotalitems(totalItems);
    }, [datos, totalItems]);

    useEffect(
        ()=>{
            if(currentpage){
                fetch(`/api/datos/rePaisPaginado?page=${currentpage}&itemsPagina=${itemspagina}&searchTerm=${busqueda}`)
                .then(data=>data.json()).then(datos=>{setDatosG(datos.items); setTotalitems(datos.total);})
            }
        },[currentpage]
    )

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
        setBusquedainte(busqueda);

        const respuesta = await fetch(`/api/datos/rePaisPaginado?page=${currentpage}&itemsPagina=${itemspagina}&searchTerm=${busqueda}`);
        const datos = await respuesta.json();
        console.log(datos);

        if(respuesta.ok){
            setDatosG(datos.items); 
            setTotalitems(datos.total);
        }else{
            alert("Algo salio mal, intententelo nuevamente...")
        }
    }




    return(
        <>
            <div className="card text-bg-secondary mb-3" style={{width:'50%', margin:'0 auto', borderRadius:'15px'}}>
                    <div className="card-body">
                        <legend className="text-center mb-4"><i className="bi bi-pin-angle-fill"></i><strong>Gestión de Países -CUNOR-</strong></legend>                       
                    </div>
            </div>

            <div className="mb-3 d-flex justify-content-center align-items-center">
                        <form className="input-group" style={{width: "600px"}} onSubmit={onSubmit}>
                                <input type="search" className="form-control" placeholder="Buscar país" aria-label="Search" value={busqueda} onChange={(e)=>{setBusqueda(e.target.value)}}/>
                                <button className="btn btn-outline-primary" type="submit" data-mdb-ripple-color="dark" style={{padding: ".45rem 1.5rem .35rem"}}>
                                <i className="bi bi-search"></i> Buscar 
                                </button>
                        </form>
            </div>

            
            <div className="bg-dark text-white border border-secondary mb-3 pt-2 content-center d-flex justify-content-center align-items-center" style={{width:'20%', margin:'0 auto'}}>
                <h3>Resultados: {totalitems} </h3>
            </div>

    
            <div className="d-flex justify-content-between" style={{ padding: '10px 120px 10px 0px' }}>
                <div className="d-flex content-center" style={{paddingTop:'20px', paddingLeft:'100px', paddingBottom:'10px'}}>
                    <button type="button" className="btn btn-success" 
                        onClick={()=>{router.push('/dashboardAdmin/adminPaises/crearPais')}}
                    ><i className="bi bi-plus-lg"></i><strong>Agregar País</strong></button>
                </div>

                <div className="d-flex content-center" style={{paddingTop:'20px', paddingLeft:'100px', paddingBottom:'10px'}}>
                    <button type="button" className="btn btn-primary" 
                        onClick={()=>{router.push('/dashboardAdmin/adminCategorias')}}
                    ><i className="bi bi-backspace-fill"></i><strong>Regresar</strong></button>
                </div>


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
                                <th scope="col">País</th>
                                <th scope="col">Código</th>
                                <th scope="col">Operaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    datosG && datosG.length!==0?(datosG.map((data)=>(
                                        <tr key={data.ID_Pais}>
                                        <th scope="row">{data.ID_Pais}</th>
                                        <td>{data.nombrePais}</td>
                                        <td>{data.codigo}</td>
                                        <td>
                                        <button type="button" className="btn btn-secondary mr-4" style={{ marginRight: '10px' }} onClick={()=>{router.push(`/dashboardAdmin/adminPaises/editarPais/${data.ID_Pais}`)}}><i className="bi bi-pencil-square"></i></button>
                                        
                                        
                                        

                                        </td>
                                        </tr>        

                                    ))):null
                                }
                               
                            </tbody>
                        </table>

                        {
                            datosG && datosG.length===0?(
                                busquedainte!==""?(
                                    <div className="text-white mt-1" style={{width:'100%', margin:'0 auto'}}>
                                    <div className="card mb-4 bg-dark text-white border-secondary" style={{width:'100%', margin:'0 auto', borderWidth: '3px'}} >
                                        <div className="card-body">
                                            <div className="card text-bg-secondary mb-3" >
                                                <div className="card-body">
                                                    <h5 className="card-title"><strong>Estado:</strong></h5>
                                                    <p className="card-text"  style={{ fontSize: '1em' }}><i className="bi bi-bug-fill"></i> No hay nada para mostrar en este momento para: <strong>{busquedainte}...</strong></p>
                                                    <p className="card-text">Fecha de búsqueda: <strong>{new Date().toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</strong></p>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
    
                                </div>
    
                                ):(
                                    <div className="text-white mb-5" style={{width:'100%', margin:'0 auto'}}>
                                    <div className="card mb-4 bg-dark text-white border-secondary" style={{width:'100%', margin:'0 auto', borderWidth: '3px'}} >
                                        <div className="card-body">
                                            <div className="card text-bg-secondary mb-3" >
                                                <div className="card-body">
                                                    <h5 className="card-title"><strong>Estado:</strong></h5>
                                                    <p className="card-text"  style={{ fontSize: '1.5em' }}>No hay nada para mostrar en este momento...<i className="bi bi-hourglass-split"></i></p>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
    
                                </div>
                                )
                            ):null
                        }


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

export default CompoPaisesPage;