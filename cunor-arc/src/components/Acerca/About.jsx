"use client"
function AboutComponent(){
    return(
        <>
            <div className="d-flex justify-content-center align-items-center" style={{height: "60vh"}}>
                <div className="card border-dark mb-3" style={{maxWidth: "60rem"}}>
                    
                    <div className="card-body">
                        <h2 className="card-title" style={{fontWeight:"bold"}}>Información general del repositorio:</h2>
                        <div className="alert alert-secondary" role="alert">
                            <p className="card-text"><i className="bi bi-exclamation-square"></i> Fue creado como parte del trabajo de graduación
                            titulado "Prototipo de repositorio web enfocado a la gestión de trabajos de graduación 
                            para el Centro Universitario del Norte -CUNOR-", cuyo autor fue el estudiante de ingeniería en ciencias y sistemas, Wilson Pop.</p>
                        </div>

                        
                    </div>
                </div>

            </div>
            
        </>
    )
}

export default AboutComponent;