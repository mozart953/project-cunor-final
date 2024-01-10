"use client"
function FooterGeneralComponent(){
    return (
    <footer className="text-white text-center p-3 mt-5" style={{background:"#00156d"}}>
        <div className="row justify-content-center mb-4 rounded" style={{background:"#00156d"}}>
            <div className="col-lg-4 col-md-6 col-sm-10 bg-dark text-light p-3 m-3" style={{borderRadius:'20px'}}>
                <h5><strong>CONTACTO</strong></h5>
                <p><strong>PBX:</strong> +502 7956 6600</p>
                <p><strong>Correo:</strong> informacion@cunor.edu.gt</p>
                <p><strong>Dirección:</strong> 7a. calle 1-11 zona 6. Cobán, Alta Verapaz. Código Postal: 16001</p>
                <a href="https://goo.gl/maps/Nf7rBK4FCTDB81R76" target="_blank"  className="text-light text-decoration-none"><i className="bi bi-geo-alt-fill fs-4"></i> Ubicación</a>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-10 bg-dark text-light p-3 m-3" style={{borderRadius:'20px'}}>
                <h5><strong>Redes sociales</strong></h5>
                <div className="d-flex flex-column">
                    <a href="https://www.facebook.com/paginacunor" target="_blank"><i className="bi bi-facebook fs-4 mb-2"></i></a>
                    <a href="https://www.instagram.com/paginacunor" target="_blank"><i className="bi bi-instagram fs-4 mb-2"></i></a>
                    <a href="https://www.twitter.com/paginacunor" target="_blank"><i className="bi bi-twitter-x fs-4 mb-2"></i></a>
                    <a href="https://www.youtube.com/channel/UC1uXh1WceImJKJfg-OfD2AQ" target="_blank"><i className="bi bi-youtube fs-4 mb-2"></i></a>
                </div>
            </div>
        </div>
        <p className="fw-bold">&copy; {new Date().getFullYear()} Copyright: Centro Universitario Del Norte -CUNOR-</p>
        <p>Desarrollado por Wilson Pop de la carrera de ingeniería en ciencias y sistemas</p>
    </footer>


    );


}

export default FooterGeneralComponent;