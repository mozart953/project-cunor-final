"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function CompoUsuariosPage({datos, totalItems}){
    const router = useRouter();
    const [estado, setEstado] = useState({});
    const [datoss, setDatoss] = useState([]);

    const [currentpage, setCurrentpage] = useState(1);
    const [totalitems, setTotalitems] = useState(null);
    const [itemspagina, setItemspagina] = useState(10);
    const [totalPaginas, setTotalpaginas] = useState(null);
    const [paginasmaximas, setPaginasmaximas] = useState(5);
    const [busqueda, setBusqueda] = useState("");
    

    const datos2 = datos.map(data=>data.rol);
    console.log("Viendo datos en Usuarios " + datos2 )
    console.log("Usuario " + datos.ID_Usuario );


    useEffect(()=>{
        setDatoss(datos);
        setTotalitems(totalItems);
    },[datos, totalItems]);

    useEffect(
        ()=>{
            if(currentpage){
                fetch(`/api/datos/reUsuariosPaginado?page=${currentpage}&itemsPagina=${itemspagina}&searchTerm=${busqueda}`)
                .then(data=>data.json()).then(datos=>{setDatoss(datos.items); setTotalitems(datos.total);})
            }
        },[currentpage]
    )
    

    console.log("Datoss: " + datoss.map(data=>data.ID_Usuario));


    useEffect(()=>{

        if(datoss){

            console.log(estado)

            const estadoInicial = {};
            datoss.forEach((data)=>{

                if(data.ID_estado==1){
                    estadoInicial[data.ID_Usuario]=true; 

                }else{
                    estadoInicial[data.ID_Usuario]=false;
                }

              
            });
                   
            setEstado(estadoInicial);
        }
        
    },[datoss])


    const actualizarEstado = async (id,estado)=>{
        console.log("valor"+estado);
        if(estado==1){
            estado=2;
        }else{
            estado=1;
        }
        
        try{

            const estaDo= await fetch(`/api/datos/reEstadoU/${id}`,{
                method:'PUT',
                body:JSON.stringify({
                    ID_estado:Number(estado),
    
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(data=>data.json())
            .then(datos=>console.log(datos));
            console.log(estaDo);

            const respuesta = await fetch(`/api/datos/reUsuariosPaginado?page=${currentpage}&itemsPagina=${itemspagina}`);
            const dtos = await respuesta.json();
            setDatoss(dtos.items);
            setTotalitems(dtos.total);

        }catch(error){
            console.log("Ha ocurrido un error: " + error);
        }

    }


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

        const respuesta = await fetch(`/api/datos/reUsuariosPaginado?page=${currentpage}&itemsPagina=${itemspagina}&searchTerm=${busqueda}`);
        const datos = await respuesta.json();
        console.log(datos);

        if(respuesta.ok){
            setDatoss(datos.items); 
            setTotalitems(datos.total);
        }else{
            alert("Algo salio mal, intententelo nuevamente...")
        }
    }

    return(
        <>
            
            <div className="card text-bg-secondary mb-3 rounded-xl" style={{width:'50%', margin:'0 auto', borderRadius:'15px'}}>
                    <div className="card-body">
                        <legend className="text-center mb-4"><i className="bi bi-person-fill"></i>Gestión de usuarios -CUNOR-</legend>                       
                    </div>
            </div>

            <div className="mb-3 d-flex justify-content-center align-items-center">
                        <form className="input-group" style={{width: "600px"}} onSubmit={onSubmit}>
                                <input type="search" className="form-control" placeholder="Buscar usuario" aria-label="Search" value={busqueda} onChange={(e)=>{setBusqueda(e.target.value)}}/>
                                <button className="btn btn-outline-primary" type="submit" data-mdb-ripple-color="dark" style={{padding: ".45rem 1.5rem .35rem"}}>
                                <i className="bi bi-search"></i> Buscar 
                                </button>
                        </form>
            </div>

            
            <div className="bg-dark text-white border border-secondary mb-3 pt-2 content-center d-flex justify-content-center align-items-center" style={{width:'20%', margin:'0 auto'}}>
                <h3>Resultados: {totalitems} </h3>
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
                                <th scope="col">DPI</th>
                                <th scope="col">Primer nombre</th>
                                <th scope="col">Primer apellido</th>
                                <th scope="col">Nombre de usuario</th>
                                <th scope="col">Rol</th>
                                <th scope="col">Carrera que opera</th>
                                <th scope="col">Operaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    datoss.map((data, index)=>(
                                        <tr key={index}>
                                        <th scope="row">{data.ID_Usuario}</th>
                                        <td>{data.DPI}</td>
                                        <td>{data.primerNombre}</td>
                                        <td>{data.primerApellido}</td>
                                        <td>{data.nombreUsuario}</td>
                                        <td>{data.rol.nombreRol}</td>
                                        <td>{data.carrera.nombreCarrera}</td>
                                        <td>
                                        <button type="button" className="btn btn-secondary mr-4" style={{ marginRight: '10px' }} onClick={()=>{router.push(`/dashboardAdmin/EditarUsuario/${data.ID_Usuario}`)}}><i className="bi bi-pencil-square"></i></button>
                                        
                                        {
                                          
                                           data.ID_rol!==1 &&(estado[data.ID_Usuario]?(
                                            <button type="button" className="btn  btn-outline-success mr-8" style={{ marginRight: '10px' }} onClick={()=>{setEstado({...estado, [data.ID_Usuario]:false}); actualizarEstado(data.ID_Usuario, data.ID_estado);}}><i className="bi bi-toggle-on"></i></button>
                                        

                                           ):(
                                            <button type="button" className="btn  btn-outline-danger"  style={{ marginRight: '10px' }} onClick={()=>{setEstado({...estado,[data.ID_Usuario]:true}); actualizarEstado(data.ID_Usuario, data.ID_estado);}}><i className="bi bi-toggle2-off"></i></button>


                                           ) )
                                        }
                                        
                                        <button type="button" className="btn btn-light" onClick={()=>{router.push(`/dashboardAdmin/adminUsuarios/detallesUsuario/${data.ID_Usuario}`)}}><i className="bi bi-file-earmark-person"></i></button>

                                        </td>
                                        </tr>        

                                    ))
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

export default CompoUsuariosPage;