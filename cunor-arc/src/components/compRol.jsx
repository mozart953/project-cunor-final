
import { useSession } from "next-auth/react";

function CompRolPage(){

    const { data: session, status } = useSession()
    const loading = status === 'loading';

    if (loading) {
        return <div>Cargando...</div>;
    }

    const role = session?.user?.role;
    console.log("viendo rol " + JSON.stringify(session, null, 2));



  return (
   
      <>
           <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
                <div className="text-white">Bienvenido administrativo...</div>
            </div>
      </>
   
  );
}


export default CompRolPage;
