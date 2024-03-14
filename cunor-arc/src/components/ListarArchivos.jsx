"use client"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useLog2 from "@/hooks/log2";
import FormFecha2Component from "@/components/usuarioFinal/busquedaA2/FormFecha2";
import FormGenerico2Component from "@/components/usuarioFinal/busquedaA2/FormGenerico2";
import MyButtonF from "@/components/ModalesFiltro/ModalFA/BotonModalF";
import MyVerticallyCenteredModalF from "@/components/ModalesFiltro/ModalFA/VerticalModalF";
import MyButtonT from "@/components/ModalesFiltro/ModalFT/BotonModalFT";
import MyVerticallyCenteredModalT from "@/components/ModalesFiltro/ModalFT/VerticalModalFT";
import { analytics } from "@/app/firebase/firebase-config";
import {ref,deleteObject} from "firebase/storage";
import {useRouter} from "next/navigation";

//export const dynamic = 'force-dynamic';

function CompoListarArchivosPage(){
    const [datosg, setUsuario1] = useLog2(null);
    const [nombreusuario, setNombreusuario] = useState("");
    const [carrera, setCarrera] = useState("");
    const [idcarrera, setIdcarrera] = useState(0);
    const [idusuario, setIdusuario] = useState(null);
    const [trabajos, setTrabajos] = useState([]);
    const [currentpage, setCurrentpage] = useState(1);
    //const [itemsperpage, setItemsperpage] = useState(10);

    const [totalitems, setTotalitems] = useState(null);
    const [itemspagina, setItemspagina] = useState(5);
    const [totalPaginas, setTotalpaginas] = useState(null);
    const [paginasmaximas, setPaginasmaximas] = useState(5);

    const [controlestado, setControlestado] = useState({});
    const [render, setRender] = useState(null);

    const [interruptor, setInterruptor] = useState(false);
    const [interruptorT, setInterruptorT] = useState(false);
    const [interruptorC, setInterruptorC] = useState(false);
    const [interruptorA, setInterruptorA] = useState(false);
    const [interruptorAn, setInterruptorAn] = useState(false);
    const [interruptorCa, setInterruptorCa] = useState(false);
    const [interruptorPC, setInterruptorPc] = useState(false);
    const [interruptorcarnet, setInterruptorcarnet] = useState(false);
    const [interrputorModal, setInterruptorModal] = useState(false);

    const [busqueda, setBusqueda] = useState("");
    const [isBusquedaUpdated, setIsBusquedaUpdated] = useState(false);
    const [fechainicio, SetFechainicio] = useState(new Date().toISOString().split('T')[0]);
    const [fechafin, SetFechafin] = useState(new Date().toISOString().split('T')[0]);

    
    const [valorseleccionado, setValorseleccionado] = useState('');
    const [valorseleccionado2, setValorseleccionado2] = useState('');
    const [categoria, setCategoria]=useState([]);
    const [busquedaCa, setBusquedaCa]=useState("");
    const [busquedainte, setBusquedainte]=useState("");
    const [showPDF, setShowPDF] = useState(null);
    const [showPDF2, setShowPDF2] = useState(null);

    const ordenQuery =[ {id:1,ord:'Descendente', ordBase:'desc'}, {id:2, ord:'Ascendente', ordBase:'asc'}];
    const ordenQuery2 = [{id:1, ord:'Fecha', ordBase:'fechaCarga'}, 
                         {id:2, ord:'Titulo', ordBase:'trabajoGrad.titulo'},
                         {id:3, ord:'Autor', ordBase:'autor.primerNombre'},
                         {id:4, ord:'Carrera', ordBase:'carrera.nombreCarrera'},
                         {id:5, ord:'Categoria', ordBase:'categoria.nombreCategoria'},
                         {id:6, ord:'Carnet', ordBase:'autor.carnet'},];



    const [idcarrera1, setIdcarrera1]= useState(null);
    const [iduser1, setIduser1] = useState(null);
    const { data: session, status } = useSession();
    
    const router = useRouter();

    
    useEffect(()=>{
        
        console.log(ordenQuery[0].ordBase);
        setValorseleccionado(ordenQuery[0].ordBase);
        console.log(ordenQuery2[0].ordBase);
        setValorseleccionado2(ordenQuery2[0].ordBase);
        
    
    },[]);

    useEffect(()=>{
        const datosCategorias = async()=>{
            const Dcategorias = await fetch(`/api/datos/reDetalleTrabajoInterno/filtroDaCategoria`, {next: { revalidate: 10 } })
            .then(data=> data.json());
            setCategoria([...Dcategorias, ...categoria]);
        }
        datosCategorias();

    },[]);

    useEffect(()=>{
        
        if(categoria.length>0 && interruptorCa){
            setBusqueda(categoria[0].nombreCategoria);
            setBusquedaCa(categoria[0].nombreCategoria);
            setBusquedainte("");
        }
        else if(interruptorT){
            setBusqueda("");
            setBusquedainte("");
        }
        else if(interruptorA){
            setBusqueda("");
            setBusquedainte("");
        }
        else if(interruptorPC){
            setBusqueda("");
            setBusquedainte("");
        }
        else if(interruptorcarnet){
            setBusqueda("");
            setBusquedainte("");
        }
        else if(interruptorAn){
            setBusqueda("");
            setBusquedainte("");
        }
        else if(!interruptor){
            setBusquedainte("");
        }

    },[carrera,categoria,interruptorCa, interruptorT, interruptorA, interruptorPC, interruptorcarnet, interruptor, interruptorAn]);

    useEffect(()=>{

         
        if(session){
            const usuario = session?.user.name;
            console.log("viendo usuario " + JSON.stringify(session, null, 2));
            console.log("nombre del usuario desde lista de trabajos: " + usuario);
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
        if(idcarrera !==0 && idusuario!==null){
            if(!idcarrera1 && !iduser1){
                setIdcarrera1(idcarrera);
                setIduser1(idusuario);
            }
        }
    },[idcarrera, idusuario])

    useEffect(()=>{
        if(idcarrera1 && iduser1 && !interruptor && currentpage && valorseleccionado){
            fetch(`/api/datos/reDetalleTrabajo?idUsuario=${iduser1}&idCarrera=${idcarrera1}&page=${currentpage}&itemsPagina=${itemspagina}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`)
            .then(data=>data.json()).then(datos=>{console.log(datos); setTrabajos(datos.items); setTotalitems(datos.total)});
        }

    },[idcarrera1, iduser1,currentpage, interruptor, valorseleccionado, valorseleccionado2]); 

    useEffect(()=>{
        if(idcarrera1 && iduser1 && currentpage && valorseleccionado){
            if(interruptorA){
                fetch(`/api/datos/reDetalleTrabajoInterno/filtroAutor?idUsuario=${iduser1}&idCarrera=${idcarrera1}&page=${currentpage}&itemsPagina=${itemspagina}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`)
                .then(data=>data.json()).then(datos=>{console.log(datos); setTrabajos(datos.items); setTotalitems(datos.total)});
            }
            else if(interruptorCa){
                fetch(`/api/datos/reDetalleTrabajoInterno/filtroCategoria?idUsuario=${iduser1}&idCarrera=${idcarrera1}&page=${currentpage}&itemsPagina=${itemspagina}&searchTerm=${busquedaCa}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`)
                .then(data=>data.json()).then(datos=>{console.log(datos); setTrabajos(datos.items); setTotalitems(datos.total)});

            }
            else if(interruptorT){
                fetch(`/api/datos/reDetalleTrabajoInterno/filtroTitulo?idUsuario=${iduser1}&idCarrera=${idcarrera1}&page=${currentpage}&itemsPagina=${itemspagina}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`)
                .then(data=>data.json()).then(datos=>{console.log(datos); setTrabajos(datos.items); setTotalitems(datos.total)});
            }
            else if(interruptorPC){
                fetch(`/api/datos/reDetalleTrabajoInterno/filtroPalClave?idUsuario=${iduser1}&idCarrera=${idcarrera1}&page=${currentpage}&itemsPagina=${itemspagina}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`)
                .then(data=>data.json()).then(datos=>{console.log(datos); setTrabajos(datos.items); setTotalitems(datos.total)});
            }
            else if(interruptorcarnet){
                fetch(`/api/datos/reDetalleTrabajoInterno/filtroCarnet?idUsuario=${iduser1}&idCarrera=${idcarrera1}&page=${currentpage}&itemsPagina=${itemspagina}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`)
                .then(data=>data.json()).then(datos=>{console.log(datos); setTrabajos(datos.items); setTotalitems(datos.total)});
            }
    
        }
    },[idcarrera1, iduser1, currentpage, interruptorT, interruptorCa, interruptorA, interruptorPC, interruptorcarnet, valorseleccionado, valorseleccionado2]);

    useEffect(()=>{
        if(idcarrera1 && iduser1 && currentpage){
            const actFecha = async ()=>{
                if(currentpage && interruptorAn && fechainicio!==null && fechafin!==null && valorseleccionado){
                    const respuesta = await fetch(`/api/datos/reDetalleTrabajoInterno/filtroFecha?idUsuario=${iduser1}&idCarrera=${idcarrera1}&page=${currentpage}&itemsPagina=${itemspagina}&fechaInicio=${fechainicio}&fechaFin=${fechafin}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`);
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

        }

    },[idcarrera1, iduser1, currentpage, interruptorAn, fechainicio, fechafin, valorseleccionado, valorseleccionado2])

    // function paginate(data){
    //     return data.slice((currentpage-1) * itemsperpage, currentpage * itemsperpage);
    // }

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


    const eliminarRegistro = (iddetalle, idautor, idtrabajo, url1)=>{
        console.log("Eliminando archivo" + iddetalle + idautor + idtrabajo + url1 );
        const valor = false;
        const valor2 = confirm("¿Está seguro de eliminar el archivo del registro para ahorrar espacio?");
        console.log(valor2);
        if(valor2==true){
            
            let urldecodificada = decodeURIComponent(url1);
            let inicioNombre = urldecodificada.lastIndexOf('/')+1;
            let finNombre = urldecodificada.indexOf('?');
            let nombre = urldecodificada.slice(inicioNombre, finNombre);
            console.log(nombre);

            const desertRef = ref(analytics, `newfiles/${nombre}`);

            // Delete the file
            deleteObject(desertRef).then(() => {
                console.log("Archivo eliminado");
                alert("¡Archivo eliminado satisfactoriamente!");
                router.refresh();
            }).catch((error) => {
                console.log("ocurrio un error: " +error);
                alert("¡Ha ocurrido un error, el archivo posiblemente no existe!");
            });

            // try{
                    
            //     const respuestaTrabajos = await fetch(`/api/datos/reDetalleTrabajo?idUsuario=${iduser1}&idCarrera=${idcarrera1}&page=${currentpage}&itemsPagina=${itemspagina}`);
            //     const datosTrabajos = await respuestaTrabajos.json();
            //     setTrabajos(datosTrabajos.items);
            //     setTotalitems(datosTrabajos.total);

            // }catch(error){
            //     console.log("Error: " + error);
            // }

            

        }

    }

    useEffect(()=>{

        if(trabajos){
            console.log("viendo trabajos: " + trabajos);
            const estadoInicial = {};

            Object.values(trabajos).forEach((data)=>{
                if(data.ID_estado==1){
                    estadoInicial[data.ID_Detalle]=true;
                }else{
                    estadoInicial[data.ID_Detalle]=false;
                }
            });
    
            setControlestado(estadoInicial);
        
        }
            


    },[trabajos]);

    const cambiarEstado = async (idDetalle, idEstado)=>{
        console.log(idEstado);
        if(idEstado==1){
            idEstado=2;
        }else{
            idEstado=1;
        }

        try{
                
            const respuesta = await fetch(`/api/datos/reDetalleTrabajo/estadoTrabajo/${idDetalle}`,{
                method: 'PUT',
                body: JSON.stringify({
                    ID_estado:Number(idEstado),
                }),
                headers:{
                    'Content-Type':"application/json"
                }
            })

            const datos = await respuesta.json();
            console.log(datos);


            const respuestaTrabajos = await fetch(`/api/datos/reDetalleTrabajo?idUsuario=${iduser1}&idCarrera=${idcarrera1}&page=${currentpage}&itemsPagina=${itemspagina}`);
            const datosTrabajos = await respuestaTrabajos.json();
            setTrabajos(datosTrabajos.items);
            setTotalitems(datosTrabajos.total); 

        }catch(error){
            console.log("Ocurrio un error: " + error);
        }



    }

    const onSubmit = async (e)=>{
        e.preventDefault();
        console.log(busqueda);
        setBusquedainte(busqueda);
        
        const respuesta = await fetch(`/api/datos/reDetalleTrabajo?idUsuario=${iduser1}&idCarrera=${idcarrera1}&page=${currentpage}&itemsPagina=${itemspagina}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`);
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

    useEffect(
        ()=>{
            if(isBusquedaUpdated){
                onSubmitG();
                setIsBusquedaUpdated(false);
            }
            
        },[isBusquedaUpdated]
    );

    const onSubmitG = async(e)=>{
        if(e) e.preventDefault();
        console.log(busqueda);
        setBusquedainte(busqueda);

       
        if(interruptorA){
            const respuesta = await fetch(`/api/datos/reDetalleTrabajoInterno/filtroAutor?idUsuario=${iduser1}&idCarrera=${idcarrera1}&page=${currentpage}&itemsPagina=${itemspagina}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`);
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
            const respuesta = await fetch(`/api/datos/reDetalleTrabajoInterno/filtroCategoria?idUsuario=${iduser1}&idCarrera=${idcarrera1}&page=${currentpage}&itemsPagina=${itemspagina}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`);
            const datos = await respuesta.json();
            console.log(datos);

            if(respuesta.ok){
                setTrabajos(datos.items); 
                //setTrabajosfiltro(datos.items); 
                setTotalitems(datos.total);
                setBusquedaCa(busqueda);
            }else{
                alert("Algo salio mal, intentelo nuevamente...");
            }

        }

        else if(interruptorAn){
            const respuesta = await fetch(`/api/datos/reDetalleTrabajoInterno/filtroFecha?idUsuario=${iduser1}&idCarrera=${idcarrera1}&page=${currentpage}&itemsPagina=${itemspagina}&fechaInicio=${fechainicio}&fechaFin=${fechafin}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`);
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

        else if(interruptorT){
            const respuesta = await fetch(`/api/datos/reDetalleTrabajoInterno/filtroTitulo?idUsuario=${iduser1}&idCarrera=${idcarrera1}&page=${currentpage}&itemsPagina=${itemspagina}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`);
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
            const respuesta = await fetch(`/api/datos/reDetalleTrabajoInterno/filtroPalClave?idUsuario=${iduser1}&idCarrera=${idcarrera1}&page=${currentpage}&itemsPagina=${itemspagina}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`);
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
        else if(interruptorcarnet){
            const respuesta = await fetch(`/api/datos/reDetalleTrabajoInterno/filtroCarnet?idUsuario=${iduser1}&idCarrera=${idcarrera1}&page=${currentpage}&itemsPagina=${itemspagina}&searchTerm=${busqueda}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}`);
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

   


    return(
        <>

                <div className="card text-bg-secondary mb-3" style={{width:'75%', margin:'0 auto'}}>
                    <div className="card-header"><strong>Usuario operativo:</strong> {nombreusuario}</div>
                    <div className="card-body">
                        <legend className="text-center mb-4"><strong>Trabajos de graduación:</strong> {carrera}</legend>                       
                    </div>
                </div>



            
            {
                !interruptor &&(
                    <div className="mb-3 d-flex justify-content-center align-items-center">
                        <form className="input-group" style={{width: "600px"}} onSubmit={onSubmit}>
                                <input type="search" className="form-control" placeholder="Buscar trabajos publicados en este espacio" aria-label="Search" value={busqueda} onChange={(e)=>{setBusqueda(e.target.value)}}/>
                                <button className="btn btn-outline-primary" type="submit" data-mdb-ripple-color="dark" style={{padding: ".45rem 1.5rem .35rem"}}>
                                <i className="bi bi-search"></i> Buscar 
                                </button>
                        </form>
                    </div>
                )
            }


            
            <div className="mb-3 d-flex flex-column justify-content-center align-items-center col-sm-12 mx-auto">
                <button type="button" className={!interruptor?"btn btn-outline-primary mb-3":"btn btn-outline-secondary mb-3"} onClick={()=>{
                    if(interruptor){
                        setInterruptor(!interruptor);
                        setInterruptorT(false); setInterruptorCa(false); setInterruptorA(false); setInterruptorAn(false);setInterruptorPc(false); setInterruptorcarnet(false);
                    }else{
                        setInterruptor(!interruptor);
                        setInterruptorT(false); setInterruptorCa(false); setInterruptorA(false); setInterruptorAn(false);setInterruptorPc(false); setInterruptorcarnet(false);
                    } }}>
                    <i className="bi bi-sliders"></i>{!interruptor?" Realizar búsqueda específica":" Realizar búsqueda simple"}
                </button>
                {
                    interruptor&&(

                        <div className="mb-3 d-flex flex-column justify-content-center align-items-center bg-dark text-white border border-secondary p-3 col-sm-9 mx-auto">
                            <div className="mb-3 justify-content-center align-items-center">
                                <h1>Buscar por:</h1>
                            </div>
                            <div className="mb-3 d-flex flex-column flex-md-row justify-content-center align-items-center">
                                <button type="button" className={interruptorT?"btn btn-primary btn-lg mb-2 me-3":"btn btn-secondary btn-lg mb-2 me-3"} onClick={
                                    ()=>{setInterruptorT(!interruptorT); setInterruptorA(false); setInterruptorAn(false);setInterruptorCa(false);setInterruptorPc(false); setInterruptorcarnet(false);}}>Titulo</button>  
                                <button type="button" className={interruptorA?"btn btn-primary btn-lg mb-2 me-3":"btn btn-secondary btn-lg mb-2 me-3"} onClick={
                                    ()=>{setInterruptorT(false); setInterruptorA(!interruptorA); setInterruptorAn(false);setInterruptorCa(false);setInterruptorPc(false); setInterruptorcarnet(false);}}>Autor</button>
                                <button type="button" className={interruptorAn?"btn btn-primary btn-lg mb-2 me-3":"btn btn-secondary btn-lg mb-2 me-3"} onClick={
                                    ()=>{setInterruptorT(false); setInterruptorA(false); setInterruptorAn(!interruptorAn);setInterruptorCa(false);setInterruptorPc(false); setInterruptorcarnet(false);}}>Fecha</button>
                                <button type="button" className={interruptorCa?"btn btn-primary btn-lg mb-2 me-3":"btn btn-secondary btn-lg mb-2 me-3"} onClick={
                                    ()=>{setInterruptorT(false); setInterruptorA(false); setInterruptorAn(false);setInterruptorCa(!interruptorCa);setInterruptorPc(false); setInterruptorcarnet(false);}}>Categoría</button>
                                <button type="button" className={interruptorPC?"btn btn-primary btn-lg mb-2 me-3":"btn btn-secondary btn-lg mb-2 me-3"} onClick={
                                    ()=>{setInterruptorT(false); setInterruptorA(false); setInterruptorAn(false);setInterruptorCa(false);setInterruptorPc(!interruptorPC); setInterruptorcarnet(false);}}>Palabra clave</button>
                                <button type="button" className={interruptorcarnet?"btn btn-primary btn-lg mb-2 me-3":"btn btn-secondary btn-lg mb-2 me-3"} onClick={
                                    ()=>{setInterruptorT(false); setInterruptorA(false); setInterruptorAn(false);setInterruptorCa(false);setInterruptorPc(false); setInterruptorcarnet(!interruptorcarnet);}}>No. Carnet</button>                                
                            </div>

                            {
                                interruptorT&&(
                                    <>
                                                                       
                                        <FormGenerico2Component onSubmit={onSubmitG} busqueda={busqueda} setBusqueda={setBusqueda} placeholder={"Buscar por titulo"}/>

                                        <MyButtonT onOpenModal={()=>setInterruptorModal(!interrputorModal)}/>

                                        {
                                            interrputorModal&&(
                                                <MyVerticallyCenteredModalT show={true} onHide={()=>setInterruptorModal(!interrputorModal)}
                                                    title={"Listado de titulos"}
                                                    idusuario={iduser1}
                                                    idcarrera={idcarrera1}
                                                    setBusqueda={(value) => {
                                                        setBusqueda(value);
                                                        setIsBusquedaUpdated(true);
                                                    }}
                                                />
                                            )
                                        }
                                    </>
                                )
                                
                            }
                            
                            {
                                interruptorCa&&(
                                    <div className="col-md-4" style={{marginRight:'20px'}}>
                                        <div>
                                            <label className='text-white' style={{fontWeight:'bold', marginRight:'10px'}}>Buscar por categoria:</label>
                                        </div>
                                        <div className="w-100 mb-3">
                                            <select className="bg-dark text-white w-100" style={{borderRadius:'20px', fontWeight:'bold'}}  onClick={(e)=>{setBusqueda(e.target.value), setBusquedaCa(e.target.value)}}>
                                                {categoria.map((data)=>(<option value={data.nombreCategoria} key={data.ID_Categoria}>{data.nombreCategoria}</option>))}
                                            </select>
                                        </div>

                                        <FormGenerico2Component onSubmit={onSubmitG} busqueda={busqueda} setBusqueda={setBusqueda} placeholder={"Buscar por categoria"}/>    
                                    </div>


                                    
                                )

                            }

                            {
                                interruptorA&&(
                                    <>
                                        <FormGenerico2Component onSubmit={onSubmitG} busqueda={busqueda} setBusqueda={setBusqueda} placeholder={"Buscar por autor"}/>

                                        <MyButtonF onOpenModal={()=>setInterruptorModal(!interrputorModal)}/>

                                        {
                                            interrputorModal&&(
                                                <MyVerticallyCenteredModalF show={true} onHide={()=>setInterruptorModal(!interrputorModal)}
                                                    title={"Listado de autores"}
                                                    idusuario={iduser1}
                                                    idcarrera={idcarrera1}
                                                    setBusqueda={(value) => {
                                                        setBusqueda(value);
                                                        setIsBusquedaUpdated(true);
                                                    }}
                                                />
                                            )
                                        }
                                    </>
                                )

                            }

                            {
                                interruptorAn&&(
                                   <FormFecha2Component onSubmit={onSubmitG} SetFechaInicio={SetFechainicio} SetFechaFin={SetFechafin} fechaini={fechainicio} fechafin={fechafin}/>
                                )

                            }

                            {
                                interruptorPC&&(
                                   <FormGenerico2Component onSubmit={onSubmitG} busqueda={busqueda} setBusqueda={setBusqueda} placeholder={"Buscar por palabra clave"}/>
                                )

                            }

                            {
                                interruptorcarnet&&(
                                   <FormGenerico2Component onSubmit={onSubmitG} busqueda={busqueda} setBusqueda={setBusqueda} placeholder={"Buscar por No. de carnet"}/>
                                )

                            }


                        </div>
                    )
                }


            </div>

            
            <div className="bg-dark text-white border border-secondary mb-3 pt-2 content-center d-flex justify-content-center align-items-center col-sm" style={{maxWidth:'75%', margin:'0 auto'}}>
                <h3>Resultados: {totalitems} </h3>
            </div>

            
            <div className="mb-3 d-flex justify-content-center align-items-center bg-dark p-3" style={{maxWidth:'75%', margin:'0 auto', border:'1px solid gray'}}>
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



            <div className="text-white mb-5" style={{width:'100%', margin:'0 auto'}}>

                

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
                
                        trabajos && trabajos.length!==0?( trabajos.map((data)=>(

                                
                                    
                                    <div className="card mb-4 bg-dark text-white border-secondary" style={{width:'85%', margin:'0 auto', borderWidth: '3px'}} key={data.ID_Detalle}>
                                        {/* <div className="card-header">
                                             <strong>Autor:</strong> {data.autores.autor.primerNombre} {data.autores.autor.segundoNombre} {data.autores.autor.tercerNombre} {data.autores.autor.primerApellido} {data.autores.autor.segundoApellido}
                                            - <strong>No. de carnet:</strong>{data.autores.autor.carnet}
                                        </div> */}

                                        {
                                            data.autores.length!==1?(
                                                <div className="card-header">
                                                    <strong>Autores:</strong>{" "}
                                                </div>
                                            ):(
                                                <div className="card-header">
                                                    <strong>Autor:</strong>{" "}
                                                </div>
                                            )
                                        }

                                        {data.autores.map((autorData) => (
                                                <div className="card-header" key={autorData.ID_Autor}>
                                                {/* <strong>Autor:</strong>{" "} */}
                                                {autorData.autor.primerNombre} {autorData.autor.segundoNombre} {autorData.autor.tercerNombre} {autorData.autor.primerApellido} {autorData.autor.segundoApellido}
                                                - <strong>No. de carnet:</strong>
                                                {autorData.autor.carnet}
                                                </div>
                                            ))}

                                        

                                        <div className="card-body">
                                            
                                            <h5 className="card-title" style={{fontStyle: 'italic'}}><strong>Título:</strong> {data.trabajoGrad.titulo}</h5>

                                            <div className="card text-bg-secondary mb-3" >
                                                <div className="card-body">
                                                    <h5 className="card-title"><strong>Resumen:</strong></h5>
                                                    <p className="card-text"  style={{ fontSize: '0.8em' }}>{data.trabajoGrad.descripcion}</p>
                                                </div>
                                            </div>


                                            <div className="card-body mt-0" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                                
                                                <div className="col" style={{ display: 'flex', alignItems: 'center'}}>
                                                    <h6 className="card-title" style={{ margin: 0, padding: 0 }}><strong>Carrera:</strong> </h6>
                                                    <p className="card-text ps-2" style={{ margin: 0, padding: 0 }}>{data.carrera.nombreCarrera} </p>
                                                </div>
                                                <div className="col" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <h6 className="card-title" style={{ margin: 0, padding: 0 }}><strong>Categoría:</strong></h6>
                                                    <p className="card-text ps-2" style={{ margin: 0, padding: 0 }}>{data.categoria.nombreCategoria} </p>
                                                </div>
                                                <div className="col" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <h6 className="card-title" style={{ margin: 0, padding: 0 }}><strong>Palabras clave:</strong></h6>
                                                    <p className="card-text ps-2" style={{ margin: 0, padding: 0 }}>{data.trabajoGrad.paClave} </p>
                                                </div>
                                                <div className="col" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <h6 className="card-title" style={{ margin: 0, padding: 0 }}><strong>No. páginas:</strong></h6>
                                                    <p className="card-text ps-2" style={{ margin: 0, padding: 0 }}>{data.trabajoGrad.cantidadPaginas} </p>
                                                </div>
                                                <div className="col" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <h6 className="card-title" style={{ margin: 0, padding: 0 }}><strong>Formato:</strong></h6>
                                                    <p className="card-text ps-2" style={{ margin: 0, padding: 0 }}>{data.formato.nombreFormato} </p>
                                                </div>
                                                <div className="col" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <h6 className="card-title" style={{ margin: 0, padding: 0 }}><strong>Fecha de carga:</strong></h6>
                                                    <p className="card-text ps-2" style={{ margin: 0, padding: 0 }}>
                                                        {new Date(data.fechaCarga).getDate()}/{new Date(data.fechaCarga).getMonth()+1}/{new Date(data.fechaCarga).getFullYear()}
                                                         - {new Date(data.fechaCarga).getHours()}:{new Date(data.fechaCarga).getMinutes()<10?'0'+new Date(data.fechaCarga).getMinutes():new Date(data.fechaCarga).getMinutes()}:{new Date(data.fechaCarga).getSeconds()}
                                                    </p>
                                                </div>
                                                <div className="col" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <h6 className="card-title" style={{ margin: 0, padding: 0 }}><strong>Última fecha de actualización:</strong></h6>
                                                    <p className="card-text ps-2" style={{ margin: 0, padding: 0 }}>
                                                        {new Date(data.fechaActualizacion).getDate()}/{new Date(data.fechaActualizacion).getMonth()+1}/{new Date(data.fechaActualizacion).getFullYear()}
                                                         - {new Date(data.fechaActualizacion).getHours()}:{new Date(data.fechaActualizacion).getMinutes()<10?'0'+new Date(data.fechaActualizacion).getMinutes():new Date(data.fechaActualizacion).getMinutes()}:{new Date(data.fechaActualizacion).getSeconds()}
                                                    </p>
                                                </div>
                                                <div className="col" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <h6 className="card-title" style={{ margin: 0, padding: 0 }}><strong>URL:</strong></h6>
                                                    <h6 className="card-text ps-2" style={{ margin: 0, padding: 0 }}>
                                                       <a href={data.trabajoGrad.direccionGuardado}>{data.trabajoGrad.titulo}</a>  
                                                    </h6>
                                                </div>

                                            </div>

                                            <div className="card-body mt-0 mb-3" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                                <button type="button" className={showPDF===data.ID_Detalle?"btn btn-danger mb-3 btn-lg":"btn btn-success btn-lg me-3 mb-3"} onClick={()=>setShowPDF(showPDF === data.ID_Detalle ? null : data.ID_Detalle)}>
                                                    <strong>{showPDF===data.ID_Detalle ? <span><i className="bi bi-box-arrow-down"></i> Ocultar documento</span> :<span><i className="bi bi-arrows-fullscreen"></i> Mostrar documento</span> }</strong>
                                                </button>
                                                {showPDF===data.ID_Detalle && <embed src={data.trabajoGrad.direccionGuardado} type="application/pdf"  width="100%" height="300px" />}
                                            </div>

                                            {
                                                data.archivoAnexo.length!==0&&(
                                                    <>
                                                    <div className="card-body mt-0 mb-3" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                                            <button type="button" className={showPDF2===data.ID_Detalle?"btn btn-danger mb-3 btn-lg":"btn btn-warning btn-lg me-3 mb-3"} onClick={()=>setShowPDF2(showPDF2 === data.ID_Detalle ? null : data.ID_Detalle)}>
                                                                <strong>{showPDF2===data.ID_Detalle ? <span><i className="bi bi-box-arrow-down"></i> Ocultar anexo</span> :<span><i className="bi bi-arrows-fullscreen"></i> Mostrar anexo</span> }</strong>
                                                            </button>
                                                            {showPDF2===data.ID_Detalle && <embed src={data.archivoAnexo[0].direccionGuardado} type="application/pdf"  width="100%" height="300px" />}
                                                    </div>
                                                    </>
                                                )
                                            }

                                            {/* <embed src={data.trabajoGrad.direccionGuardado} type="application/pdf"  width="100%" height="300px"  /> */}
                                             
                                            <div className="col" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                                <button type="button" className="btn btn-danger" onClick={()=>{eliminarRegistro(data.ID_Detalle, data.autores[0].autor.ID_Autor, data.trabajoGrad.ID_Trabajo, data.trabajoGrad.direccionGuardado)}}><i className="bi bi-trash"></i><strong>Eliminar archivo principal</strong></button>
                                                
                                                {
                                                    controlestado[data.ID_Detalle]?(
                                                        <button type="button" className="btn btn-outline-danger" onClick={()=>{setControlestado({...controlestado,[data.ID_Detalle]:false});cambiarEstado(data.ID_Detalle, data.ID_estado)}}><i className="bi bi-arrow-down-circle-fill"></i><strong> Deshabilitar registro</strong></button>
                                                    ):(
                                                        <button type="button" className="btn btn-outline-success" onClick={()=>{setControlestado({...controlestado,[data.ID_Detalle]:true});cambiarEstado(data.ID_Detalle, data.ID_estado)}}><i className="bi bi-arrow-up-circle-fill"></i><strong> Habilitar registro</strong></button>
                                                    )
                                                }
                                               

                                                <button type="button" className="btn btn-primary" onClick={()=>{router.push(`/dashboardOperador/editarTrabajos/${data.ID_Detalle}`)}}><i className="bi bi-pencil-square"></i><strong>Editar registro</strong></button>
                                            </div> 

                                        </div>
                                    </div>
                               


                            )
                        
                            
                        )

                    ):(
                        
                        trabajos && trabajos.length === 0 ?(
                            busquedainte!==""?(
                                <div className="text-white mb-5" style={{width:'85%', margin:'0 auto'}}>
                                <div className="card mb-4 bg-dark text-white border-secondary" style={{width:'80%', margin:'0 auto', borderWidth: '3px'}} >
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
                                <div className="text-white mb-5" style={{width:'85%', margin:'0 auto'}}>
                                <div className="card mb-4 bg-dark text-white border-secondary" style={{width:'80%', margin:'0 auto', borderWidth: '3px'}} >
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

export default CompoListarArchivosPage;