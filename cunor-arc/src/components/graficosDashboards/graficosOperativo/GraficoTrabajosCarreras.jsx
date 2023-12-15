import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { useState, useEffect } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function GraficoTrabajosCarrerasComponent(){
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState([]);
    const [carreras,setCarreras] = useState([]);

        useEffect(
            ()=>{
                const datos = async()=>{
                    const respuesta = await fetch(`/api/datos/reDatosGraficos/datosGraficosOperativo/datosTrabajosCarreras`);
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

    const maxLabelLength =  25;

    var midata = {
        labels: carreras.map(carrera => carrera.length > maxLabelLength ? carrera.slice(0, maxLabelLength) + '...' : carrera),
        datasets: [ // Cada una de las líneas del gráfico
            {
                label: 'Trabajos',
                data: total,
                tension: 0.5,
                fill : true,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                pointRadius: 5,
                pointBorderColor: 'rgba(255, 99, 132)',
                pointBackgroundColor: 'rgba(255, 99, 132)',
            },
            
        ],
    };

    var misoptions = {
        scales : {
            y : {
                min : 0,
                title:{
                    display:true,
                    text:'Cantidad de trabajos',
                },
            },
            x: {
                ticks: { color: 'rgb(255, 99, 132)',
                         autoSkip: false,
                         maxRotation: 90,
                         minRotation: 90
                        },
                title:{
                    display:true,
                    text:'Carreras',
                },
            }
        }
    };


    return(<> 
            <Line data={midata} options={misoptions}/>
          </>
    );
}

export default GraficoTrabajosCarrerasComponent;