import Link from 'next/link'

function NotFound() {
  return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{height: "60vh"}}>
                <div className="card text-bg-primary mb-3" style={{maxWidth: "60rem"}}>
                    
                    <div className="card-body">
                        <h1 className="card-title" style={{fontWeight:"bold"}}>
                            
                            Página no encontrada - 404 <i className="bi bi-wrench-adjustable"></i>
                        </h1>
                        
                    </div>
                </div>

            </div>
        </>
  )
}

export default NotFound;