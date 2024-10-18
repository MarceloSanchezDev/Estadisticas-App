
import { useEffect, useState } from 'react'
import './css/estilos.css'
import Statistics from './components/statistics.jsx'
import {setToken } from './utils/fetch.js'
import { Notification } from './components/notification.jsx'
import { Footer } from './components/Footer.jsx'
import { LoginForm } from './components/form/LoginForm.jsx'
import { RegisterForm } from './components/form/RegisterForm.jsx'



function App() {
  const [user, setUser] = useState() 
  const [show, setShow] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageClass,setMessageClass] = useState(null)

  /*
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('dataUser')
    if (loggedUserJSON !== null) {
      const user = JSON.parse(loggedUserJSON)
      setToken(user.token)
      setUser(user)
    }
  }, [])
  */
  
  const handlerShow = ()=>{setShow(!show)}
  const handdlerSession = () => {
    window.localStorage.removeItem('dataUser')
    setMessageClass('done')
    setErrorMessage('Exito al Cerrar Session')
    setUser(null)
    setTimeout(()=>{
      setMessageClass(null)
      setErrorMessage(null)
    },2000)
  }
  const handleMss = (clase, mensaje) =>{
    setMessageClass(clase)
    setErrorMessage(mensaje)
  }
  return (
    <>
          <Notification clase={messageClass} message={errorMessage} />
          {!user || user.error ?
          <>
          {show ? 
          (
            <div className='contenedorForm'>
            <LoginForm info={setErrorMessage} msgClas={setMessageClass } onClick={handlerShow} handlerUser= {setUser}></LoginForm>
          </div>
          )
          :
          (
            <div className='contenedorForm'>
            <RegisterForm info={setErrorMessage} msgClas={setMessageClass} onClick={handlerShow} handlerUser= {setUser}></RegisterForm>
          </div>
          )}
          </>
          
          :
        <>
      <div className='contenedorEstadisticas'>
          <Statistics userController={user} msg={handleMss} handdlerSession={handdlerSession}></Statistics>
      </div>
        </>  
        }
  <Footer></Footer>
    </>
  )
}

export default App
