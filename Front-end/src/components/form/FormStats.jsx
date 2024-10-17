import { useState } from "react"
import { newStatistics } from "../../utils/fetch"
import { Input } from "../input"
import Button from "../button"
import cruz from '../../assets/x-lg.svg'

export function FormStats ({user,load, set, handlerShow, msg}) {
    const [nombreStat, setNombreStat] = useState('')
    const [tiroDosPuntos, setTiroDosPuntos ] = useState(10)
    const [tiroDosPuntosEncestados, setTiroDosPuntosEncestados] = useState(0)
    const [tiroTresPuntos, setTiroTresPuntos ] = useState(10)
    const [tiroTresPuntosEncestados, setTiroTresPuntosEncestados] = useState(0)
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const día = String(fecha.getDate()).padStart(2, '0');
    
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');
    
    const fechaFormateada = `${año}-${mes}-${día}`;
    const horaFormateada = `${horas}:${minutos}:${segundos}`;
    const handlerSubmit = async (e) => {
        e.preventDefault()
        load(true) 
        const porcentaje2Puntos = ( tiroDosPuntosEncestados/ tiroDosPuntos ) * 100
        const porcentaje3Puntos = (tiroTresPuntosEncestados /tiroTresPuntos ) * 100
        setTimeout(async() => {
          try {
            const result = await newStatistics(`/stats/${user.username}`,
              {input: {nombreStat,tiroDosPuntos,tiroTresPuntos,tiroTresPuntosEncestados,tiroDosPuntosEncestados,porcentaje2Puntos, porcentaje3Puntos, fechaFormateada, horaFormateada}})
            setTiroDosPuntos(0)
            setTiroDosPuntosEncestados(0)
            setTiroTresPuntos(0)
            setTiroTresPuntosEncestados(0)
            if(result){
              set(e)
              handlerShow()
              load(false)
              msg('done','Estadistica Creada Correctamente')
              setTimeout(() => {
                msg(null,null)
              }, 2000);
              return result
            }
          } catch (error) {
            throw new Error(error);
            
          }
          
        }, 2000);
      }
      const handlerInputTiro2 = (e) => {setTiroDosPuntos(e.target.value)}
      const handlerInputTiro3 = (e) => {setTiroTresPuntos(e.target.value)}
      const handlerInputTiro2Encestado = (e) => {setTiroDosPuntosEncestados(e.target.value)}
      const handlerInputTiro3Encestado = (e) => {setTiroTresPuntosEncestados(e.target.value)}
      const handlerInputName = (e)=>{setNombreStat(e.target.value)}
    return (
        <>
        <form className="newStatForm" onSubmit={handlerSubmit}>
            <div className="titleStat">
              <h1 >Nueva Stadistica</h1>
              <Button style={'buttonFormNewStat'} img={cruz} onClick={handlerShow}></Button>
            </div>
            <div className="newNameStat">
              <label className={'normalLabel' } htmlFor="nombeStat">Nombre De La Estadistica :</label>
              <Input id='nombeStat' clase='inputLongin' type='text' value={nombreStat}  funChang={handlerInputName} placeHolder={'Nombre De La Estadistica'}  ></Input>
            </div>
            <div className="contentNew estat2">
              <label className={'normalLabel'} htmlFor="Tiro2Puntos">Cantidad de Tiros de 2 puntos lanzados : </label>
              <Input id="Tiro2Puntos" clase='inputLongin' type='number' value={tiroDosPuntos}  funChang={handlerInputTiro2} placeHolder={'Cantidad de Tiros de 2 puntos lanzados'}></Input>
              <label className={'normalLabel'} htmlFor="Tiro2PuntosEncestados">Cantidad de Tiros de 2 puntos Encestados : </label>
              <Input id="Tiro2PuntosEncestados" clase='inputLongin' type='number' value={tiroDosPuntosEncestados}  funChang={handlerInputTiro2Encestado} placeHolder={'Cantidad de Tiros de 2 puntos Encestados'}></Input>
              <p className="porcTiro">/ {tiroDosPuntos}</p>
            </div>
            <div className="contentNew estat3">
                <label className={'normalLabel' } htmlFor="Tiro3Puntos">Cantidad de Tiros de 3 puntos lanzados : </label>
                <Input id="Tiro3Puntos" clase='inputLongin' type='number' value={tiroTresPuntos}  funChang={handlerInputTiro3} placeHolder={'Cantidad de Tiros de 3 puntos lanzados'}></Input>
                <br />
                <label className={'normalLabel' } htmlFor="Tiro3PuntosEncestados">Cantidad de Tiros de 3 puntos Encestados : </label>
                <Input id="Tiro3PuntosEncestados" clase='inputLongin' type='number' value={tiroTresPuntosEncestados}  funChang={handlerInputTiro3Encestado} placeHolder={'Cantidad de Tiros de 2 puntos Encestados'}></Input>
                <p className="porcTiro">/ {tiroTresPuntos}</p>
            </div>
            <button type="submit" className="buttonForm buttomNewStat buttonPrincipal">Cargar Nueva Stadistica</button>
        </form>
        </>
    )
}