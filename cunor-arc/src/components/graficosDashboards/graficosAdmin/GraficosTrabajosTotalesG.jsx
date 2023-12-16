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

function GraficoTrabajosTotalesGComponent(){
        const [activos, setActivos] = useState(null);
        const [inactivos, setInactivos] = useState(null);
        const [total, setTotal] = useState(null);
        const [items,setItems] = useState([]);


        useEffect(
            ()=>{
                
                    const datos = async()=>{
                        const respuesta = await fetch(`/api/datos/reDatosGraficos/datosGraficosAdmin/datosTrabajosTotalesG`);
                        const datos = await respuesta.json();
                        console.log(datos);

                        if(respuesta.ok){
                            setTotal(datos.total);
                            console.log(datos.activos);
                            setActivos(datos.activos);
                            console.log(datos.inactivos);
                            setInactivos(datos.inactivos);
                        }else{
                            alert("Ha ocurrido un error inesperado...");
                        }
                        
                    };
                
                    datos();

                
            },[]);


        useEffect(
            ()=>{
                if(total!==null && activos!==null && inactivos!==null){
                    
                    setItems([total,activos, inactivos]);
                }
            },[activos, inactivos]);

        var estado = ["Registros totales","Activos", "Inactivos"];

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
                    min : -25,
                    max : 100,
                    title:{
                        display:true,
                        text:'Cantidad de trabajos',
                    },
                },
                x: {
                    ticks: { color: 'rgba(0, 220, 195)'},
                    title:{
                        display:true,
                        text:'Estado',
                    },
                }
            }
        };

        var midata = {
            labels: estado,
            datasets: [
                {
                    label: 'Trabajos',
                    data: items,
                    backgroundColor: ['rgba(0, 0, 255, 0.5)','rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
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

export default GraficoTrabajosTotalesGComponent;