import {useState} from 'react'
import cruz from '../assets/x-lg.svg'
import buscar from '../assets/search.svg'
import filtro from '../assets/filter.svg'
import { allStatistics, deleteStatistics } from '../utils/fetch.js'
import UserStatistics from './userStatistics.jsx'
import Button from './button.jsx'
import { FormStats } from './form/FormStats.jsx'
import { NavBar } from './nav.jsx'
import { InfoStat } from './infoStat.jsx'
import { Input } from './input.jsx'


export default function Statistics({userController,msg,handdlerSession}) {
    const [statistics, setStatistics] = useState([])
    const [listOfFilter, setListOfFilter] = useState(false)
    const [stat, setStat] = useState({})
    const [type, setType] = useState('text')
    const [statSearch, setStatSearch] = useState('')
    const [showInfo, setShowInfo] = useState(false)
    const [ showForm, setShowForm] = useState(false)
    const [ showNav, setShowNav] = useState('navBar')
    const [showImg, setShowImg] = useState(true)
    const [isloading, setIsLoading] = useState(false)
   // const [showImg, setShowImg] = useState(false)
  const handlerSearch= (e)=>{
    e.preventDefault()
    if(type === 'text'){
      if(statSearch.length > 1){
        const statsFilter = statistics.filter(stat=> stat.nombreEstadistica.toLowerCase() === statSearch.toLowerCase() || stat.nombreEstadistica.toLowerCase().includes(statSearch.toLowerCase()))
        setStatistics(statsFilter)
      }else{
        handleStat()
      }
    }
    if(type ==='date'){
      if(statSearch.length > 1){
        const statsFilter = statistics.filter(stat=> new Date( stat.fecha).toISOString().replace('T03:00:00',' ').replace('.000Z',' ') === new Date(statSearch).toISOString().replace('T00:00:00',' ').replace('.000Z',' '))
        setStatistics(statsFilter)
      }else{
        handleStat()
      }
    }
  }
  const filterStad = (id) => {
    setIsLoading(true)
    const stad = statistics.filter(stat => stat.id === id)
    setTimeout(() => {
          setStatistics(stad)
          setIsLoading(false)
          msg('done','Exito al cargar estadistica')
          setShowImg(false)
          setTimeout(() => {
                msg(null,null)
              }, 1000);
            }, 1000);
  }
  const handleStat = async ()=> {
    setShowInfo(false)
    setIsLoading(true)
    setTimeout(async()=>{
      const result = await allStatistics(`http://localhost:3000/stats/${userController.username}`)
      const estadisticasOrdenadas = result.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      setIsLoading(false)
      setStatistics(estadisticasOrdenadas)
      setShowImg(true)
    },1000) 
  }
  const handleStatCLose = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(()=>{
      if(statistics){
        setStatistics(null)
      }
      setIsLoading(false)

    },1000)
  }
  const handleDelete = async (id) => {
    setIsLoading(true)
    const result = await deleteStatistics('http://localhost:3000/stats', id);
    if (result) {
    setTimeout(() => {
          setStatistics(statistics.filter(stat => stat.id !== id));
          setIsLoading(false)
          msg('done','Exito al borrar la estadistica')
          setTimeout(() => {
            msg(null,null)
          }, 2000);
        }, 2000);
      }
    
  };
  const handleshow = () => {
      setShowForm(!showForm)
  }
  const handleNavShow = () => {
    if(showNav == 'navBar'){
      setShowNav('notNavBar')
    }
    else{
      setShowNav('navBar')
    }
  }
  const handlerListOfFiler = ()=>{
    setListOfFilter(!listOfFilter)
  }
  const handlerTypeInput = (e)=>{
    handleStat()
    if(e.target.value === 'Nombre'){
      setType('text')
      setStatSearch('')
      setListOfFilter(!listOfFilter)
    }
    if(e.target.value === 'Fecha'){
      setType('date')
      setStatSearch('')
      setListOfFilter(!listOfFilter)
    }
  }
  return (
    <>
      <NavBar show={handleNavShow} clase={showNav} handleStat={handleStat} handleshow={handleshow} onsess={handdlerSession}></NavBar>
      
      {userController &&
      <div className='UserEstadisticas'>
        <div className='cabecera'>
          <h1 className='tituloEstats'>Bienvenido {userController.nombre +" "+userController.apellido} !</h1>
          <div className='contentSearch'>
            <form className='formSearch'>
              <Input clase={'inputShearch'} value={statSearch} type={type} placeHolder={'Buscar Estadistica'} funChang={(e)=>{setStatSearch(e.target.value)}}></Input><br />
              <Button style={'buttonStat'} img={buscar} onClick={handlerSearch}></Button>
            </form>
            <Button style={'buttonStat'} img={filtro} onClick={handlerListOfFiler}></Button>
            {listOfFilter && <div className='contenedorFiltros'>
              <input className='inputShearch' list="filtros" placeholder="elija un filtro" onChange={(e)=>{handlerTypeInput(e)}} />
              <datalist id="filtros">
                <option value="Fecha" />
                <option value="Nombre" />
              </datalist>
              </div>}
          </div>
          <Button style={'buttonEstadClose'} img={cruz} onClick={handleStatCLose}></Button>
        </div>
        {statistics &&
          <div className='contentStats'>  
              {statistics.map(statistics =><UserStatistics stasts={statistics} key={statistics.id} setStat={setStat} show={showInfo} setShow={setShowInfo} img={showImg} filter={filterStad} setStats={handleStat} onClick={() => handleDelete(statistics.id)} ></UserStatistics>)}
          </div>
        }
          {showForm &&      
            <div className='contentNewStat'>
              <FormStats user={userController} load={setIsLoading} msg={msg} set={handleStat} handlerShow={handleshow}></FormStats>
            </div>  
          }
           {isloading && <h1 className='Loading'>Loading....</h1>}
           {showInfo && <InfoStat stast={stat}></InfoStat>}
      </div>
      }
    </>
  );
}
/*
[{"nombreEstadistica" : "estadistica" ,
      "estadisticasDosPuntos"  : "23",
      "fecha"  : "23/23/2023",
      "cant_dosPuntosEncestados" : "23" ,
      "cant_dosPuntos"  : "23",
      "estadisticasTresPuntos"  : "23" ,
      "cant_tresPuntosEncestados" : "23" ,
      "cant_tresPuntos" : "23",
      "hora" : "10:10:10"},{"nombreEstadistica" : "estadistica" ,
        "estadisticasDosPuntos"  : "23",
        "fecha"  : "23/23/2023",
        "cant_dosPuntosEncestados" : "23" ,
        "cant_dosPuntos"  : "23",
        "estadisticasTresPuntos"  : "23" ,
        "cant_tresPuntosEncestados" : "23" ,
        "cant_tresPuntos" : "23",
        "hora" : "10:10:10"},{"nombreEstadistica" : "estadistica" ,
          "estadisticasDosPuntos"  : "23",
          "fecha"  : "23/23/2023",
          "cant_dosPuntosEncestados" : "23" ,
          "cant_dosPuntos"  : "23",
          "estadisticasTresPuntos"  : "23" ,
          "cant_tresPuntosEncestados" : "23" ,
          "cant_tresPuntos" : "23",
          "hora" : "10:10:10"}]
*/