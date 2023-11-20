
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
        <h1>Rol</h1>
      </>
   
  );
}


export default CompRolPage;
