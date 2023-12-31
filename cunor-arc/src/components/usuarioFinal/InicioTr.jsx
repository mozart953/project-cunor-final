"use client"
import { useState, useEffect } from "react";
import PorTituloComponent from "@/components/usuarioFinal/busquedaA/PorTitulo";
import FormGenericoComponent from "@/components/usuarioFinal/busquedaA/FormGenerico";
import FormFechaComponent from "@/components/usuarioFinal/busquedaA/FormFecha";
import MyButton from "@/components/Modal/BotonModal";
import MyVerticallyCenteredModal from "@/components/Modal/VerticalModal";

function CompoInicioTr(){
    const [trabajos, setTrabajos] = useState([]);
    const [trabajosfiltro, setTrabajosfiltro] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    const [currentpage, setCurrentpage] = useState(1);
    const [totalitems, setTotalitems] = useState(null);
    const [itemspagina, setItemspagina] = useState(5);
    const [totalPaginas, setTotalpaginas] = useState(null);
    const [paginasmaximas, setPaginasmaximas] = useState(5);
    const [estado, setEstado] = useState(1);

    const [fechainicio, SetFechainicio] = useState(null);
    const [fechafin, SetFechafin] = useState(null);

    const [interruptor, setInterruptor] = useState(false);
    const [interruptorT, setInterruptorT] = useState(false);
    const [interruptorC, setInterruptorC] = useState(false);
    const [interruptorA, setInterruptorA] = useState(false);
    const [interruptorAn, setInterruptorAn] = useState(false);
    const [interruptorCa, setInterruptorCa] = useState(false);
    const [interruptorPC, setInterruptorPc] = useState(false);

    const [valorseleccionado, setValorseleccionado] = useState('');
    const [valorseleccionado2, setValorseleccionado2] = useState('');

    const ordenQuery =[ {id:1,ord:'Descendente', ordBase:'desc'}, {id:2, ord:'Ascendente', ordBase:'asc'}];
    const ordenQuery2 = [{id:1, ord:'Fecha', ordBase:'fechaCarga'}, 
                         {id:2, ord:'Titulo', ordBase:'trabajoGrad.titulo'},
                         {id:3, ord:'Autor', ordBase:'autor.primerNombre'},
                         {id:4, ord:'Carrera', ordBase:'carrera.nombreCarrera'},
                         {id:5, ord:'Categoria', ordBase:'categoria.nombreCategoria'}];
    
    const [modalShow, setModalShow] = useState(null);


    useEffect(()=>{
        
            console.log(ordenQuery[0].ordBase);
            setValorseleccionado(ordenQuery[0].ordBase);
            console.log(ordenQuery2[0].ordBase);
            setValorseleccionado2(ordenQuery2[0].ordBase);
            
        
    },[]);

    useEffect(()=>{
        if(currentpage && !interruptor && valorseleccionado){
            fetch(`/api/datos/reDetallesTrabajoInicial?page=${currentpage}&itemsPagina=${itemspagina}&idEstado=${estado}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`).
            then(data=>data.json()).then(datos=>{setTrabajos(datos.items); setTrabajosfiltro(datos.items); setTotalitems(datos.total)});
        }

    },[currentpage, interruptor, valorseleccionado, valorseleccionado2]);

    useEffect(()=>{

        if(currentpage && interruptorT && valorseleccionado){
            fetch(`/api/datos/reDetallesTrabajoInicial/filtroTitulo?page=${currentpage}&itemsPagina=${itemspagina}&idEstado=${estado}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`).
            then(data=>data.json()).then(datos=>{setTrabajos(datos.items); setTotalitems(datos.total);});      

        }
        else if(currentpage && interruptorC && valorseleccionado){
            fetch(`/api/datos/reDetallesTrabajoInicial/filtroCarrera?page=${currentpage}&itemsPagina=${itemspagina}&idEstado=${estado}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`).
            then(data=>data.json()).then(datos=>{setTrabajos(datos.items); setTotalitems(datos.total);});
        }
        else if(currentpage && interruptorA && valorseleccionado){
            fetch(`/api/datos/reDetallesTrabajoInicial/filtroAutor?page=${currentpage}&itemsPagina=${itemspagina}&idEstado=${estado}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`).
            then(data=>data.json()).then(datos=>{setTrabajos(datos.items); setTotalitems(datos.total);});
        }
        else if(currentpage && interruptorCa && valorseleccionado){
            fetch(`/api/datos/reDetallesTrabajoInicial/filtroCategoria?page=${currentpage}&itemsPagina=${itemspagina}&idEstado=${estado}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`).
            then(data=>data.json()).then(datos=>{setTrabajos(datos.items); setTotalitems(datos.total);});

        }
        else if(currentpage && interruptorPC && valorseleccionado){
            fetch(`/api/datos/reDetallesTrabajoInicial/filtroPalClave?page=${currentpage}&itemsPagina=${itemspagina}&idEstado=${estado}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`).
            then(data=>data.json()).then(datos=>{setTrabajos(datos.items); setTotalitems(datos.total);});
        }

    }, [currentpage, interruptorT, interruptorC, interruptorA, interruptorCa, interruptorPC, valorseleccionado, valorseleccionado2 ]);

    useEffect(()=>{
        const actFecha = async ()=>{
            if(currentpage && interruptorAn && fechainicio!==null && fechafin!==null && valorseleccionado){
                const respuesta = await fetch(`/api/datos/reDetallesTrabajoInicial/filtroFecha?page=${currentpage}&itemsPagina=${itemspagina}&idEstado=${estado}&fechaInicio=${fechainicio}&fechaFin=${fechafin}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`);
                const datos = await respuesta.json();
                console.log(datos);

                if(respuesta.ok){
                    
                    setTrabajos(datos.items); 
                    //setTrabajosfiltro(datos.items); 
                    setTotalitems(datos.total);

                }else{
                    alert("Algo salio mal, intentelo nuevamente...");
                }

            }
        }

        actFecha();
    },[currentpage, interruptorAn, fechainicio, fechafin, valorseleccionado, valorseleccionado2]);



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
        
            //filtro(busqueda);
            const respuesta = await fetch(`/api/datos/reDetallesTrabajoInicial?page=${currentpage}&itemsPagina=${itemspagina}&idEstado=${estado}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`);
            const datos = await respuesta.json();
            console.log(datos);

            if(respuesta.ok){
                setTrabajos(datos.items); 
                //setTrabajosfiltro(datos.items); 
                setTotalitems(datos.total);

            }else{
                alert("Algo salio mal, intentelo nuevamente...");
            }
        
    }

    const onSubmitT = async(e)=>{
        e.preventDefault();
        console.log(busqueda);
        const respuesta = await fetch(`/api/datos/reDetallesTrabajoInicial/filtroTitulo?page=${currentpage}&itemsPagina=${itemspagina}&idEstado=${estado}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`);
        const datos = await respuesta.json();
        console.log(datos);

        if(respuesta.ok){
            setTrabajos(datos.items); 
            //setTrabajosfiltro(datos.items); 
            setTotalitems(datos.total);
        }else{
            alert("Algo salio mal, intentelo nuevamente...");
        }

    }

    const onSubmitG = async(e)=>{
        e.preventDefault();
        console.log(busqueda);

        if(interruptorC){
            const respuesta = await fetch(`/api/datos/reDetallesTrabajoInicial/filtroCarrera?page=${currentpage}&itemsPagina=${itemspagina}&idEstado=${estado}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`);
            const datos = await respuesta.json();
            console.log(datos);

            if(respuesta.ok){
                setTrabajos(datos.items); 
                //setTrabajosfiltro(datos.items); 
                setTotalitems(datos.total);
            }else{
                alert("Algo salio mal, intentelo nuevamente...");
            }
    

        }
        else if(interruptorA){
            const respuesta = await fetch(`/api/datos/reDetallesTrabajoInicial/filtroAutor?page=${currentpage}&itemsPagina=${itemspagina}&idEstado=${estado}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`);
            const datos = await respuesta.json();
            console.log(datos);

            if(respuesta.ok){
                setTrabajos(datos.items); 
                //setTrabajosfiltro(datos.items); 
                setTotalitems(datos.total);
            }else{
                alert("Algo salio mal, intentelo nuevamente...");
            }
    

        }

        else if(interruptorCa){
            const respuesta = await fetch(`/api/datos/reDetallesTrabajoInicial/filtroCategoria?page=${currentpage}&itemsPagina=${itemspagina}&idEstado=${estado}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`);
            const datos = await respuesta.json();
            console.log(datos);

            if(respuesta.ok){
                
                setTrabajos(datos.items); 
                //setTrabajosfiltro(datos.items); 
                setTotalitems(datos.total);
            }else{
                alert("Algo salio mal, intentelo nuevamente...");
            }
    
        }

        else if(interruptorAn){
            console.log(fechainicio);
            console.log(fechafin);

            const respuesta = await fetch(`/api/datos/reDetallesTrabajoInicial/filtroFecha?page=${currentpage}&itemsPagina=${itemspagina}&idEstado=${estado}&fechaInicio=${fechainicio}&fechaFin=${fechafin}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`);
            const datos = await respuesta.json();
            console.log(datos);

            if(respuesta.ok){
                
                setTrabajos(datos.items); 
                //setTrabajosfiltro(datos.items); 
                setTotalitems(datos.total);

            }else{
                alert("Algo salio mal, intentelo nuevamente...");
            }
    

        }

        else if(interruptorPC){
            const respuesta = await fetch(`/api/datos/reDetallesTrabajoInicial/filtroPalClave?page=${currentpage}&itemsPagina=${itemspagina}&idEstado=${estado}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`);
            const datos = await respuesta.json();
            console.log(datos);

            if(respuesta.ok){
                
                setTrabajos(datos.items); 
                //setTrabajosfiltro(datos.items); 
                setTotalitems(datos.total);
            }else{
                alert("Algo salio mal, intentelo nuevamente...");
            }
        }
    }

    function formatoApa(primernombre, segundonombre, tercernombre, primerapellido, segundoapellido, anio, titulo){
        let nombres = primernombre.charAt(0) + ".";
            if(segundonombre !== ""){
                nombres += segundonombre.charAt(0) + ".";
            }
            if(tercernombre !== ""){
                nombres += tercernombre.charAt(0) + ".";
            }

            let apellidos = primerapellido;
            if(segundoapellido !== ""){
                apellidos += " " + segundoapellido;
            }

            return apellidos + ", " + nombres + " (" + new Date(anio).getFullYear() + "). " + titulo;       
                

    }

    // const filtro = (patron)=>{
    //     console.log("patron: " + patron);
    //     const resultadoBusqueda = trabajosfiltro.filter((data)=>{
    //         if(data.trabajoGrad.titulo.toString().toLowerCase().includes(patron.toLowerCase())
    //             || data.carrera.nombreCarrera.toString().toLowerCase().includes(patron.toLowerCase()) ||
    //             data.autor.primerNombre.toString().toLowerCase().includes(patron.toLowerCase()) ||
    //             data.autor.segundoNombre.toString().toLowerCase().includes(patron.toLowerCase())||
    //             data.autor.tercerNombre.toString().toLowerCase().includes(patron.toLowerCase())||
    //             data.autor.primerApellido.toString().toLowerCase().includes(patron.toLowerCase())||
    //             data.autor.segundoApellido.toString().toLowerCase().includes(patron.toLowerCase())|| 
    //             data.categoria.nombreCategoria.toString().toLowerCase().includes(patron.toLowerCase())
    //         ){
    //             return data;
    //         }

    //     })
    //     console.log(resultadoBusqueda);
        
    //     if(resultadoBusqueda.length >0 ){
    //         setTrabajos(resultadoBusqueda);
    //     }
    // }


    return(
        <>
            
            <div className="mb-3 d-flex justify-content-center align-items-center bg-dark p-3" style={{width:'47%', margin:'0 auto', border:'1px solid gray'}}>
                <div className="col-md-4" style={{marginRight:'20px'}}>
                    <div>
                        <label className='text-white' style={{fontWeight:'bold', marginRight:'10px'}}>Campo de orden:</label>
                    </div>
                    <div className="w-100">
                        <select className="bg-dark text-white w-100" style={{borderRadius:'20px', fontWeight:'bold'}} value={valorseleccionado2} onChange={(e)=>{setValorseleccionado2(e.target.value)}}>
                            {ordenQuery2.map((data)=>(<option value={data.ordBase} key={data.id}>{data.ord}</option>))}
                        </select>
                    </div>
                </div>

                <div className="col-md-4">
                    <div>
                        <label className='text-white' style={{fontWeight:'bold', marginRight:'10px'}}>Orden de búsqueda: </label>
                    </div>
                    <div className="w-100">
                        <select className="bg-dark text-white w-100" style={{borderRadius:'20px', fontWeight:'bold'}} value={valorseleccionado} onChange={(e)=>{setValorseleccionado(e.target.value)}}>
                            {ordenQuery.map((data)=>(<option value={data.ordBase} key={data.id}>{data.ord}</option>))}
                        </select>
                    </div>
                </div>

            </div>

            {
                !interruptor &&(
                    <div className="mb-3 d-flex justify-content-center align-items-center">
                        <form className="input-group" style={{width: "600px"}} onSubmit={onSubmit}>
                                <input type="search" className="form-control" placeholder="Buscar en el repositorio" aria-label="Search" value={busqueda} onChange={(e)=>{setBusqueda(e.target.value)}}/>
                                <button className="btn btn-outline-primary" type="submit" data-mdb-ripple-color="dark" style={{padding: ".45rem 1.5rem .35rem"}}>
                                <i className="bi bi-search"></i> Buscar 
                                </button>
                        </form>
                    </div>
                )
            }

            <div className="mb-3 d-flex flex-column justify-content-center align-items-center">
                <button type="button" className={!interruptor?"btn btn-outline-primary mb-3":"btn btn-outline-secondary mb-3"} onClick={()=>{
                    if(interruptor){
                        setInterruptor(!interruptor);
                        setInterruptorT(false); setInterruptorC(false); setInterruptorA(false); setInterruptorAn(false);setInterruptorCa(false); setInterruptorPc(false);
                    }else{
                        setInterruptor(!interruptor);
                        setInterruptorT(false); setInterruptorC(false); setInterruptorA(false); setInterruptorAn(false);setInterruptorCa(false); setInterruptorPc(false);
                    } }}>
                    {!interruptor?"Realizar búsqueda específica":"Realizar búsqueda simple"}<i className="bi bi-node-plus-fill"></i>
                </button>
                {
                    interruptor&&(

                        <div className="mb-3 d-flex flex-column justify-content-center align-items-center bg-dark text-white border border-secondary p-3">
                            <div className="mb-3 justify-content-center align-items-center">
                                <h1>Buscar por:</h1>
                            </div>
                            <div className="mb-3 justify-content-center align-items-center">
                                <button type="button" className={interruptorT?"btn btn-primary btn-lg me-3":"btn btn-secondary btn-lg me-3"} onClick={
                                    ()=>{setInterruptorT(!interruptorT); setInterruptorC(false); setInterruptorA(false); setInterruptorAn(false);setInterruptorCa(false);setInterruptorPc(false);}}>Titulo</button>
                                <button type="button" className={interruptorC?"btn btn-primary btn-lg me-3":"btn btn-secondary btn-lg me-3"} onClick={
                                    ()=>{setInterruptorT(false); setInterruptorC(!interruptorC); setInterruptorA(false); setInterruptorAn(false);setInterruptorCa(false);setInterruptorPc(false);}}>Carrera</button>
                                <button type="button" className={interruptorA?"btn btn-primary btn-lg me-3":"btn btn-secondary btn-lg me-3"} onClick={
                                    ()=>{setInterruptorT(false); setInterruptorC(false); setInterruptorA(!interruptorA); setInterruptorAn(false);setInterruptorCa(false);setInterruptorPc(false);}}>Autor</button>
                                <button type="button" className={interruptorAn?"btn btn-primary btn-lg me-3":"btn btn-secondary btn-lg me-3"} onClick={
                                    ()=>{setInterruptorT(false); setInterruptorC(false); setInterruptorA(false); setInterruptorAn(!interruptorAn);setInterruptorCa(false);setInterruptorPc(false);}}>Fecha</button>
                                <button type="button" className={interruptorCa?"btn btn-primary btn-lg me-3":"btn btn-secondary btn-lg me-3"} onClick={
                                    ()=>{setInterruptorT(false); setInterruptorC(false); setInterruptorA(false); setInterruptorAn(false);setInterruptorCa(!interruptorCa);setInterruptorPc(false);}}>Categoría</button>
                                <button type="button" className={interruptorPC?"btn btn-primary btn-lg me-3":"btn btn-secondary btn-lg me-3"} onClick={
                                    ()=>{setInterruptorT(false); setInterruptorC(false); setInterruptorA(false); setInterruptorAn(false);setInterruptorCa(false);setInterruptorPc(!interruptorPC);}}>Palabra clave</button>                                
                            </div>

                            {
                                interruptorT&&(
                                    <PorTituloComponent onSubmitT={onSubmitT} busqueda={busqueda} setBusqueda={setBusqueda}/>
                                )
                                
                            }
                            
                            {
                                interruptorC&&(
                                    <FormGenericoComponent onSubmit={onSubmitG} busqueda={busqueda} setBusqueda={setBusqueda} placeholder={"Buscar por iniciales de la carrera"}/>
                                )

                            }

                            {
                                interruptorA&&(
                                    <FormGenericoComponent onSubmit={onSubmitG} busqueda={busqueda} setBusqueda={setBusqueda} placeholder={"Buscar por iniciales del autor"}/>
                                )

                            }

                            {
                                interruptorAn&&(
                                   <FormFechaComponent onSubmit={onSubmitG} SetFechaInicio={SetFechainicio} SetFechaFin={SetFechafin} fechaini={fechainicio} fechafin={fechafin}/>
                                )

                            }
                            {
                                interruptorCa&&(
                                    <FormGenericoComponent onSubmit={onSubmitG} busqueda={busqueda} setBusqueda={setBusqueda} placeholder={"Buscar por iniciales de la categoría"}/>
                                )

                            }
                            {
                                interruptorPC&&(
                                    <FormGenericoComponent onSubmit={onSubmitG} busqueda={busqueda} setBusqueda={setBusqueda} placeholder={"Buscar por palabra clave"}/>
                                )

                            }

                        </div>
                    )
                }


            </div>

            <div className="bg-dark text-white border border-secondary mb-3 pt-2 content-center d-flex justify-content-center align-items-center" style={{width:'20%', margin:'0 auto'}}>
                <h3>Resultados: {totalitems} </h3>
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
                
                         trabajos && trabajos.length!==0?(trabajos.map((data)=>(
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
                                                    <h6 className="card-title" style={{ margin: 0, padding: 0 }}>Palabras clave: </h6>
                                                    <p className="card-text ps-2" style={{ margin: 0, padding: 0 }}>{data.trabajoGrad.paClave} </p>
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

                                    <MyButton onOpenModal={()=>setModalShow(data.ID_Detalle)} />
                                    {
                                        modalShow===data.ID_Detalle &&(<MyVerticallyCenteredModal show={true} onHide={()=>setModalShow(null)} 
                                        title={"Referencia"} formato={"APA"} 
                                        general={formatoApa(data.autor.primerNombre, data.autor.segundoNombre, data.autor.tercerNombre, data.autor.primerApellido, data.autor.segundoApellido, data.fechaCarga, data.trabajoGrad.titulo)}
                                        mensaje={"Esta es una referencia autogenerada con la información disponible en el registro, puede estar incompleta o contener datos erroneos. La identación o formato se puede perder al copiar y pegar."}/>)


                                    } 
                                    
                                </div>
                            </div>

                            )    

                            )
                        
                            
                        )
                    ):(

                        
                        trabajos && trabajos.length === 0 ?(<div className="text-white mb-5" style={{width:'85%', margin:'0 auto'}}>
                                <div className="card mb-4 bg-dark text-white border-secondary" style={{width:'80%', margin:'0 auto', borderWidth: '3px'}} >
                                    <div className="card-body">
                                        <div className="card text-bg-secondary mb-3" >
                                            <div className="card-body">
                                                <h5 className="card-title">Estado:</h5>
                                                <p className="card-text"  style={{ fontSize: '0.8em' }}>No hay nada para mostrar en este momento...</p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>

                            </div>):null

                        
                        
                                
                            
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