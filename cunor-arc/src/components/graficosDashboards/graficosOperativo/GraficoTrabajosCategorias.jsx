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

function GraficoTrabajosCategoriasComponent(){
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState([]);
    const [items2,setItems2] = useState([]);

        useEffect(
            ()=>{
                const datos = async()=>{
                    const respuesta = await fetch(`/api/datos/reDatosGraficos/datosGraficosOperativo/datosTrabajosCategorias`);
                    const datos = await respuesta.json();
                    console.log(datos);

                    if(respuesta.ok){
                        setItems(datos);
                        console.log(datos);
                        //console.log(datos.carrera);
                        const nombres = datos.map(item => item.categoria);
                        setItems2(nombres);
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
        labels: items2.map(nombre => nombre.length > maxLabelLength ? nombre.slice(0, maxLabelLength) + '...' : nombre),
        datasets: [ // Cada una de las líneas del gráfico
            {
                label: 'Categorias',
                data: total,
                tension: 0.5,
                fill : true,
                borderColor: 'rgb(43, 71, 252)',
                backgroundColor: 'rgba(43, 71, 252, 0.5)',
                pointRadius: 5,
                pointBorderColor: 'rgba(43, 71, 252)',
                pointBackgroundColor: 'rgba(43, 71, 252)',
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
                ticks: { color: 'rgb(43, 71, 252)',
                         autoSkip: false,
                         maxRotation: 90,
                         minRotation: 90
                        },
                title:{
                    display:true,
                    text:'Categorias',
                },
            }
        }
    };


    return(<> 
            <Line data={midata} options={misoptions}/>
          </>
    );
}

export default GraficoTrabajosCategoriasComponent;