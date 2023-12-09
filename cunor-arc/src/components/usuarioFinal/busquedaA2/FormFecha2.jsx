"use client"
import React from "react";
function FormFecha2Component({onSubmit, SetFechaInicio, SetFechaFin, fechaini, fechafin}){
                
    return(
        <>
                <div className="mb-3 d-flex justify-content-center align-items-center">
                        <form className="input-group d-flex align-items-center" style={{width: "600px"}} onSubmit={onSubmit}>
                                <div className="d-flex align-items-center" style={{marginRight: "50px"}}>
                                    <div className="d-flex flex-column text-center">
                                        <label className="font-weight-bold" style={{fontWeight: "bold"}}>Fecha inicio</label>
                                        <input type="date" className="form-control bg-dark text-white" value={fechaini || ''} onChange={(e)=>{SetFechaInicio(e.target.value)}}/>
    
                                    </div>       
                                </div>

                                <div className="d-flex align-items-center" style={{marginRight: "50px"}}>   
                                    <div className="d-flex flex-column text-center">
                                        <label className="font-weight-bold" style={{fontWeight: "bold"}}>Fecha fin</label>
                                        <input type="date" className="form-control bg-dark text-white" value={fechafin || ''} onChange={(e)=>{SetFechaFin(e.target.value)}}/> 
        
                                    </div>
                                </div>
                                
                                <div className="d-flex align-items-center mt-4">
                                    <div>
                                            <button className="btn btn-outline-primary" type="submit" data-mdb-ripple-color="dark" style={{padding: ".45rem 1.5rem .35rem"}}>
                                                <i className="bi bi-search"></i> Buscar 
                                            </button>
                                    </div>
                                </div>


                        </form>
                </div>
        </>
    )


}

export default FormFecha2Component;