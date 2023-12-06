"use client"
import { useState, useEffect } from "react";
function CompoInicioTr(){
    const [trabajos, setTrabajos] = useState([]);

    const [currentpage, setCurrentpage] = useState(1);
    const [totalitems, setTotalitems] = useState(null);
    const [itemspagina, setItemspagina] = useState(5);
    const [totalPaginas, setTotalpaginas] = useState(null);
    const [paginasmaximas, setPaginasmaximas] = useState(5);
    const [estado, setEstado] = useState(1);

    useEffect(()=>{
        if(currentpage){
            fetch(`/api/datos/reDetallesTrabajoInicial?page=${currentpage}&itemsPagina=${itemspagina}&idEstado=${estado}`).
            then(data=>data.json()).then(datos=>{console.log(datos); setTrabajos(datos.items); setTotalitems(datos.total)});
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

    return(
        <>
            <div className="mb-5 d-flex justify-content-center align-items-center">
                <form className="input-group" style={{width: "400px"}}>
                        <input type="search" className="form-control" placeholder="Buscar documento" aria-label="Search" />
                        <button className="btn btn-outline-primary" type="button" data-mdb-ripple-color="dark" style={{padding: ".45rem 1.5rem .35rem"}}>
                        <i className="bi bi-search"></i> Buscar 
                        </button>
                </form>
            </div>

            
            <div className="text-white mb-5" style={{width:'85%', margin:'0 auto'}}>


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
                

                


            {
                
                        trabajos?(trabajos.map((data)=>(
                            data.ID_estado===1&&(
                                <div className="card mb-4 bg-dark text-white border-secondary" style={{width:'80%', margin:'0 auto', borderWidth: '3px'}} key={data.ID_Detalle}>
                                <div className="card-header">
                                     Autor: {data.autor.primerNombre} {data.autor.segundoNombre} {data.autor.tercerNombre} {data.autor.primerApellido} {data.autor.segundoApellido}
                                </div>

                                

                                <div className="card-body">
                                    
                                    <h5 className="card-title">Título: {data.trabajoGrad.titulo}</h5>

                                    <div className="card text-bg-secondary mb-3" >
                                        <div className="card-body">
                                            <h5 className="card-title">Resumen:</h5>
                                            <p className="card-text"  style={{ fontSize: '0.8em' }}>{data.trabajoGrad.descripcion}</p>
                                        </div>
                                    </div>


                                    <div className="card-body mt-0" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                        
                                        <div className="col" style={{ display: 'flex', alignItems: 'center'}}>
                                            <h6 className="card-title" style={{ margin: 0, padding: 0 }}>Carrera: </h6>
                                            <p className="card-text ps-2" style={{ margin: 0, padding: 0 }}>{data.carrera.nombreCarrera} </p>
                                        </div>
                                        <div className="col" style={{ display: 'flex', alignItems: 'center' }}>
                                            <h6 className="card-title" style={{ margin: 0, padding: 0 }}>Categoría: </h6>
                                            <p className="card-text ps-2" style={{ margin: 0, padding: 0 }}>{data.categoria.nombreCategoria} </p>
                                        </div>
                                        <div className="col" style={{ display: 'flex', alignItems: 'center' }}>
                                            <h6 className="card-title" style={{ margin: 0, padding: 0 }}>No. páginas: </h6>
                                            <p className="card-text ps-2" style={{ margin: 0, padding: 0 }}>{data.trabajoGrad.cantidadPaginas} </p>
                                        </div>
                                        <div className="col" style={{ display: 'flex', alignItems: 'center' }}>
                                            <h6 className="card-title" style={{ margin: 0, padding: 0 }}>Formato: </h6>
                                            <p className="card-text ps-2" style={{ margin: 0, padding: 0 }}>{data.archivo.formato} </p>
                                        </div>
                                        <div className="col" style={{ display: 'flex', alignItems: 'center' }}>
                                            <h6 className="card-title" style={{ margin: 0, padding: 0 }}>Fecha de carga: </h6>
                                            <p className="card-text ps-2" style={{ margin: 0, padding: 0 }}>
                                                {new Date(data.fechaCarga).getDate()}/{new Date(data.fechaCarga).getMonth()+1}/{new Date(data.fechaCarga).getFullYear()}
                                                 - {new Date(data.fechaCarga).getHours()}:{new Date(data.fechaCarga).getMinutes()<10?'0'+new Date(data.fechaCarga).getMinutes():new Date(data.fechaCarga).getMinutes()}:{new Date(data.fechaCarga).getSeconds()}
                                            </p>
                                        </div>
                                        <div className="col" style={{ display: 'flex', alignItems: 'center' }}>
                                            <h6 className="card-title" style={{ margin: 0, padding: 0 }}>URL: </h6>
                                            <h6 className="card-text ps-2" style={{ margin: 0, padding: 0 }}>
                                               <a href={data.trabajoGrad.direccionGuardado}>{data.trabajoGrad.titulo}</a>  
                                            </h6>
                                        </div>

                                    </div>

                                    <embed src={data.trabajoGrad.direccionGuardado} type="application/pdf"  width="100%" height="300px"  />
                                     

                                </div>
                            </div>

                            )    

                            )
                        
                            
                        )
                    ):(
                        <div className="text-white mb-5" style={{width:'85%', margin:'0 auto'}}>
                            <div className="card mb-4 bg-dark text-white border-secondary" style={{width:'80%', margin:'0 auto', borderWidth: '3px'}} key={data.ID_Detalle}>
                                <div className="card-body">
                                    <div className="card text-bg-secondary mb-3" >
                                        <div className="card-body">
                                            <h5 className="card-title">Estado:</h5>
                                            <p className="card-text"  style={{ fontSize: '0.8em' }}>No hay nada para mostrar en este momento...</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>

                        </div>
                    )
            }

                <div className="content-center d-flex justify-content-center align-items-center">
                    <nav aria-label="..." style={{cursor:"pointer"}}>
                        <ul className="pagination">
                        <li className={`page-item ${currentpage === 1 ? 'disabled' : ''}`}>
                            <a className="page-link" onClick={beforePage}>Anterior</a>
                        </li>
                        {[...Array(Math.min(totalPaginas, paginasmaximas))].map((_, i) => (
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
    )
}

export default CompoInicioTr;