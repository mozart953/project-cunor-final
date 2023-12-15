import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function GraficoBarrasUsuarioCarreraComponent(){
        const [items, setItems] = useState([]);
        const [total, setTotal] = useState([]);
        const [carreras,setCarreras] = useState([]);

        useEffect(
            ()=>{
                const datos = async()=>{
                    const respuesta = await fetch(`/api/datos/reDatosGraficos/datosGraficosAdmin/datosUsuarioCarrera`);
                    const datos = await respuesta.json();
                    console.log(datos);

                    if(respuesta.ok){
                        setItems(datos);
                        console.log(datos);
                        //console.log(datos.carrera);
                        const nombresCarreras = datos.map(item => item.carrera);
                        setCarreras(nombresCarreras);
                        //console.log(datos._count);
                        const totales = datos.map(item => item.conteo);
                        setTotal(totales);
                    }else{
                        alert("Ha ocurrido un error inesperado...");
                    }
                    
                };
                datos();
            },[]);




        //var estado = ["Total de usuarios","Activos", "Inactivos"];

        var misoptions = {
            responsive : true,
            animation : false,
            plugins : {
                legend : {
                    display : false
                }
            },
            scales : {
                y : {
                    min : 0,
                    max : 15,
                    title:{
                        display:true,
                        text:'Cantidad de usuarios',
                    },
                },
                x: {
                    ticks: { color: 'rgba(0, 220, 195)',
                                autoSkip: false,
                                maxRotation: 90,
                                minRotation: 90},
                    title:{
                        display:true,
                        text:'Carreras',
                    },
                }
            }
        };

        const maxLabelLength =  25;

        var midata = {
            labels: carreras.map(carrera => carrera.length > maxLabelLength ? carrera.slice(0, maxLabelLength) + '...' : carrera),
            datasets: [
                {
                    label: 'Usuarios',
                    data: total,
                    backgroundColor: 'rgba(0, 0, 255, 0.5)',
                }
            ]
        };



    return(
        <>
            <div>
            <Bar data={midata} options={misoptions} />    
            </div>
        </>
    )

}

export default GraficoBarrasUsuarioCarreraComponent;