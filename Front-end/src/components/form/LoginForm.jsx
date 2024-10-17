import { useState } from "react"
import { loginUser, setToken } from "../../utils/fetch"
import registro from '../../assets/form.png'
import grafico from '../../assets/grafico-de-barras.png'
import { Input } from "../input"
import Button from "../button"
export function LoginForm({info,msgClas, handlerUser, onClick}){

    const [username, setUsername ] = useState('')
    const [password, setPassword ] = useState('')
    const [classInput, setClassInput] = useState('inputLongin')
    
    const handlerLogin = async (e) => {
        e.preventDefault()
        console.log('username:',username,'password:',password)
        const user = await loginUser('/auth/login',{username, password})
        console.log(user)
        if(!user.error){
          window.localStorage.setItem('dataUser',JSON.stringify(user))
          msgClas('done')
          info('Acceso Autorizado')
          setTimeout(()=>{
            info(null)
            setUsername('')
            setPassword('')
          },5000)
          console.log(user.username)
          console.log(user.token)
          setToken(user.token)
          handlerUser(user)
          }
          else{
              console.log(user.error)
              msgClas('error')
              setClassInput('inputFailed')
              info(user.error)
              setTimeout(()=>{
                info(null)
                msgClas(null)
                setClassInput('inputLongin')
                setUsername('')
                setPassword('')
              },5000)
            }
        } 
    const handleUsername = (e) => {setUsername(e.target.value)}
    const handlePassword = (e) => { setPassword(e.target.value)}
    return(
        <>
        <form onSubmit={handlerLogin} className="login">
        <h2><img className="imgLogin" src={grafico} alt="" /> Estadisticas </h2>
        <h1>Iniciar Sesión</h1>
        <p>Por Favor, inicia sesión para contrinuar </p>
        <label className= 'normalLabel' >Usuario:</label>
        <Input clase={classInput}type='text' value={username} funChang={handleUsername}  placeHolder={'Usuario'}></Input>
        <label className= 'normalLabel'  >Contraseña:</label>
        <Input clase={classInput}type='password' value={password} funChang={handlePassword}  placeHolder={'Contraseña'}></Input>
        <button type="submit" className="buttonForm buttonPrincipal" > <p className="nameBtn">Iniciar Sesión</p></button>
        <p>Si no tienes una cuenta Registrate</p>
        <Button name={'Registro'} img={registro} style={'buttonForm'} onClick={onClick}></Button>
        </form>
        </>
    )
}