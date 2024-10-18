import Button from "./button";
import borrar from '../assets/trash.svg'
import izq from '../assets/arrow-left-circle-fill.svg'
import der from '../assets/arrow-right-circle-fill.svg'

export default function UserStatistics ({stasts,setStat,show,setShow,img, onClick,filter,setStats}) { 


    const handleStat = () => {
        setStat(stasts)
        setTimeout(()=>{
            setShow(!show)
            if(img){
                filter(stasts.id)
            }
            if(!img){
                setStats() 
            }
        },2000)

    }
    return(
        /* nombreEstadistica  estadisticasDosPuntos estadisticasTresPuntos fecha cant_dosPuntosEncestados cant_dosPuntos estadisticasTresPuntos cant_tresPuntosEncestados cant_tresPuntos hora*/
        <>
        <div className="stat">
            <h1 className="tituloStat">{stasts.nombreEstadistica}</h1>
            <div className="statpuntos">
                <div className="porcentajes">
                    <p >Porcentaje tiros de 2 puntos : {stasts.estadisticasDosPuntos}%, cant: <em>{stasts.cant_dosPuntos}</em></p>
                    <p >Porcentaje tiros de 3 puntos : {stasts.estadisticasTresPuntos}%, cant: <em>{stasts.cant_tresPuntos}</em></p>
                </div>
                <div className="graficosStat">
                    <div style={{width:stasts.estadisticasDosPuntos + '%'}} className="grafDosPuntos"><em>{stasts.estadisticasDosPuntos}%</em></div>
                    <div style={{width:stasts.estadisticasTresPuntos + '%'}} className="grafTresPuntos"><em>{stasts.estadisticasTresPuntos}%</em></div>
                </div>
            </div>
            <div className="statBotones">
                <Button  style={'buttonStatInfo'} img={borrar} onClick={onClick}></Button>
                <Button  style={'buttonStatInfo'} img={img ? der : izq} onClick={handleStat}></Button>
            </div>
        </div> 
        </>
    )
}