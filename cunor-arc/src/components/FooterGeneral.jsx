"use client"
function FooterGeneralComponent(){
    return (
        <footer className="bg-secondary text-white text-center p-3 mt-5">
            <p style={{fontWeight: 'bold'}}>&copy; {new Date().getFullYear()} Copyright: Centro Universitario Del Norte -CUNOR-</p>
        </footer>
    );


}

export default FooterGeneralComponent;