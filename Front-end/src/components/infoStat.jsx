import pelota from '../assets/pelotaBasquet.png'
import { Grafico } from "./grafico";

export function InfoStat ({stast}) {
    let fechaDesdeDb
    if(stast){
        fechaDesdeDb  = stast.fecha.replace('T03:00:00',' ').replace('.000Z',' ')
    }
    return (
        <>
        {stast && 
        <div className="showStat">
        <div className="divTituloStat">
            <h1 className='tittleStatInfo'>{stast.nombreEstadistica}</h1>
        </div>
        <div className="fechaHora">
            <p className="parrStat">- Fecha : {fechaDesdeDb}</p>
            <p className="parrStat">- Hora : {stast.hora}</p>
        </div>
        <div className="contentDivStat">
            <div className="divStat">
                <h1>Tiro 2 puntos</h1>
                <div className="divImgagen">
                <img src={pelota} alt="Basquet" className="statImg" />
                </div>
                <div className="divParrafo">
                    <p className="parrStat">- Cantidad de tiros de 2 puntos Encestados : {stast.cant_dosPuntosEncestados}/{stast.cant_dosPuntos}</p>
                    <p className="parrStat">- Porcentaje tiros de 2 puntos : {stast.estadisticasDosPuntos}%</p>
                </div>
                <Grafico porcentaje={stast.estadisticasDosPuntos}></Grafico>
            </div>
            <div className="divStat">
                <h1>Tiro 3 puntos</h1>
                <div className="divImgagen">
                <img src={pelota} alt="Basquet" className="statImg" />
                </div>
                <div className="divParrafo">
                    <p className="parrStat">- Cantidad de tiros de 3 puntos Encestados : {stast.cant_tresPuntosEncestados}/{stast.cant_tresPuntos}</p>
                    <p className="parrStat">- Porcentaje tiros de 3 puntos : {stast.estadisticasTresPuntos}%</p>
                </div>
                <Grafico porcentaje={stast.estadisticasTresPuntos}></Grafico>
            </div>
        </div>
        <div className="divObserva">
            <h1>observaciones</h1>
            <div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
        }
            
        </>
    )
}