import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useState,useEffect } from 'react';

function MyVerticallyCenteredModalT({setBusqueda,...props}) {

    const [trabajos, setTrabajos] = useState([]);
    const [busquedaA, setBusquedaA] = useState("");    
   
    const [letraSeleccionada, setLetraSeleccionada] = useState(null);

    const [totalitems, setTotalitems] = useState(null);
    const [itemspagina, setItemspagina] = useState(10);
    const [totalPaginas, setTotalpaginas] = useState(null);
    const [paginasmaximas, setPaginasmaximas] = useState(5);
    const [valorseleccionado, setValorseleccionado] = useState('');
    const [valorseleccionado2, setValorseleccionado2] = useState('');
    const [currentpage, setCurrentpage] = useState(1);
    const [busquedainte, setBusquedainte]=useState("");

    const ordenQuery =[ {id:1,ord:'Descendente', ordBase:'desc'}, {id:2, ord:'Ascendente', ordBase:'asc'}];
    const ordenQuery2 = [{id:1, ord:'Titulo', ordBase:'trabajoGrad.titulo'},
                         {id:2, ord:'Categoria', ordBase:'categoria.nombreCategoria'},];
    
    const letras = Array.from({length: 26}, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));


    
    useEffect(()=>{
      console.log("idUse: " + props.idusuario + "idCarrera " + props.idcarrera);
      const letraS= letraSeleccionada!==''&&letraSeleccionada!==null?`&letra=${letraSeleccionada}`:'';
        if(props.idusuario && props.idcarrera){
            fetch(`/api/datos/reDetalleTrabajoInterno/filtroTitulos?idUsuario=${props.idusuario}&idCarrera=${props.idcarrera}&page=${currentpage}&itemsPagina=${itemspagina}&searchTerm=${busquedaA}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}${letraS}`)
            .then(data=>data.json()).then(datos=>{console.log(datos); setTrabajos(datos.items); setTotalitems(datos.total)});
        }
        

    },[props.idusuario, props.idcarrera,currentpage, valorseleccionado, valorseleccionado2, letraSeleccionada]);
    
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
      console.log(busquedaA);
      setBusquedainte(busquedaA);
      
      const letraS= letraSeleccionada!==''&&letraSeleccionada!==null?`&letra=${letraSeleccionada}`:'';

          const respuesta = await fetch(`/api/datos/reDetalleTrabajoInterno/filtroTitulos?idUsuario=${props.idusuario}&idCarrera=${props.idcarrera}&page=${currentpage}&itemsPagina=${itemspagina}&searchTerm=${busquedaA}&orderDirection=${valorseleccionado}&orderCampo=${valorseleccionado2}${letraS}`);
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

//   const handleButtonClick = (nombreAutor) => {
//         setBusqueda(nombreAutor);
//         props.onHide();
//     };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body       style={{ backgroundColor: 'black', color: 'white' }}>
                    <div className="mb-3 d-flex justify-content-center align-items-center">
                        <form className="input-group" style={{width: "600px"}} onSubmit={onSubmit}>
                                <input type="search" className="form-control" placeholder="Buscar titulos en este espacio" aria-label="Search" value={busquedaA} onChange={(e)=>{setBusquedaA(e.target.value)}}/>
                                <button className="btn btn-outline-primary" type="submit" data-mdb-ripple-color="dark" style={{padding: ".45rem 1.5rem .35rem"}}>
                                <i className="bi bi-search"></i> Buscar 
                                </button>
                        </form>
                    </div>

                    <div className="mb-3 d-flex justify-content-center align-items-center">
                        <nav aria-label="Page navigation example" className="mt-3" style={{cursor:'pointer'}}>
                            <ul className="pagination pagination-sm">
                                {letras.map(letra => (
                                <li className={`page-item ${letra === letraSeleccionada ? 'active' : ''}`} key={letra}>
                                    <a className="page-link" onClick={() => {if(letraSeleccionada==''){setLetraSeleccionada(letra)}
                                                        else if(letraSeleccionada!==letra){setLetraSeleccionada(letra)}
                                                        else{setLetraSeleccionada('')}}}>
                                    {letra}
                                    </a>
                                </li>
                                ))}
                            </ul>
                        </nav>
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
                                              
                                                      <div className="card-header">
                                                          <strong>Título:</strong>{" "}
                                                      </div>
                                               

                                              
                                                      <div className="card-header d-flex align-items-center" >
                                                      {/* <strong>Autor:</strong>{" "} */}
                                                        <div>
                                                            {data.trabajoGrad.titulo} 
                                                            - <strong>Categoria:</strong>
                                                            {data.categoria.nombreCategoria}
                                                        </div>
                                                                                                                 
                                                      </div>
 
                                                        <div className='mt-3 mb-2'>
                                                            <button type="button" className="btn btn-success" style={{ marginLeft: '20px' }}
                                                                onClick={()=>{
                                                                    const nombreitem = `${data.trabajoGrad.titulo}`;
                                                                    setBusqueda(nombreitem);
                                                                    props.onHide();
                                                                }}
                                                            ><strong>Ver trabajo asociado</strong></button>
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

                    </div>
        
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModalT;