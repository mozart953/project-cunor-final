import DetallesUsuario from '@/components/DetallesUsuario';

function DetallesUsuariosPage({params}){

    const id = params.id;


    return(
        <>
            <div>
                <DetallesUsuario id ={params.id}/>

            </div>
        </>
    );
}

export default DetallesUsuariosPage;