
import { useSession } from "next-auth/react";

function CompRolPage(){

    const { data: session, status } = useSession()
    const loading = status === 'loading';

    if (loading) {
        return <div>Cargando...</div>;
    }

    const role = session?.user?.name;
    console.log("viendo rol " + role);



  return (
   
      <>
        <h1>Rol</h1>
      </>
   
  );
}


export default CompRolPage;
