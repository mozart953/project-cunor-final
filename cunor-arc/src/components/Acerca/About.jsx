"use client"
function AboutComponent(){
    return(
        <>
            <div className="d-flex justify-content-center align-items-center" style={{height: "60vh"}}>
                <div className="card border-dark mb-3" style={{maxWidth: "60rem"}}>
                    
                    <div className="card-body">
                        <h2 className="card-title" style={{fontWeight:"bold"}}>Información general del repositorio:</h2>
                        <p className="card-text">Fue creado como parte del trabajo de graduación
                         titulado &quot;Prototipo de repositorio web enfocado a la gestión de trabajos de graduación 
                         para el Centro Universitario del Norte &ndash;CUNOR&ndash;&quot;, cuyo autor fue el estudiante de ingeniería en ciencias y sistemas, Wilson Pop. </p>
                    </div>
                </div>

            </div>
            
        </>
    )
}

export default AboutComponent;