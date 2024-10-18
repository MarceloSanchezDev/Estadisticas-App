import { useState } from "react"
import { registerUser } from "../../utils/fetch"
import user from '../../assets/usuario.png'
import grafico from '../../assets/grafico-de-barras.png'
import { Input } from "../input"
import Button from "../button"


export function RegisterForm({info,msgClas, handlerUser,onClick}){
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [apellido, setApellido] = useState('')
    const [username, setUsername ] = useState('')
    const [password, setPassword ] = useState('')
    const [repeatPassword, setRepeatPasswordPassword ] = useState('')
    const [classInput, setClassInput] = useState('inputLongin')
    const handlerRegister = async (e) => {
        e.preventDefault()
        if(password !== repeatPassword){
            setTimeout(() => {
                setClassInput('inputFailed')
                msgClas('error')
                info('Error al registrar usuario')
                setTimeout(() => {
                    msgClas(null)
                    info(null)
                }, 1000);
            }, 2000);
            return
        }else{
            if(!(username === null && password === null)){
                const user = await registerUser('/auth/register',{username, password, nombre, apellido,email})
                window.localStorage.setItem('dataUser',JSON.stringify(user))
                    setNombre('')
                    setApellido('')
                    setUsername('')
                    setPassword('')
                    setRepeatPasswordPassword('')
                    handlerUser(user)
                }else{
                    setTimeout(() => {
                        setClassInput('inputFailed')
                        msgClas('error')
                        info('Error al registrar usuario')
                        setTimeout(() => {
                            msgClas(null)
                            info(null)
                        }, 1000);
                    }, 2000);
                }
                return
            } 
        }
    const handleNombre= (e)=>{setNombre(e.target.value)}
    const handleApellido = (e)=>{setApellido(e.target.value)}
    const handleUsername = (e) => {setUsername(e.target.value)}
    const handlePassword = (e) => {setPassword(e.target.value)}
    const handleRepeatPassword = (e) => {setRepeatPasswordPassword(e.target.value)} 
    const handlerEmail = (e) => {setEmail(e.target.value)} 
    return(
        <>
        <form onSubmit={handlerRegister} className="register">
        <h2><img className="imgLogin" src={grafico} alt="" /> Estadisticas </h2>
        <h1>Register</h1>
        <div className="nameContenedor">
            <div className="inputContenedor">
                <label className='normalLabel'>Nombre:</label>
                <Input clase={classInput} funChang={handleNombre} type={'text'} value={nombre} placeHolder={'Nombre'}></Input>
            </div>
            <div className="inputContenedor">
                <label className='normalLabel'>Apellido:</label>
                <Input clase={classInput} funChang={handleApellido} type={'text'} value={apellido} placeHolder={'Apellido'}></Input>
            </div>
        </div>
        <label className='normalLabel'>E-mail:</label>
        <Input clase={classInput} funChang={handlerEmail} type={'email'} value={email} placeHolder={'E-mail'}></Input>
        <label className='normalLabel'>Usuario:</label>
        <Input clase={classInput} funChang={handleUsername} type={'text'} value={username} placeHolder={'Usuario'}></Input>
        <label className='normalLabel'>Contraseña:</label>
        <Input clase={classInput} funChang={handlePassword} type={'password'} value={password} placeHolder={'Contraseña'}></Input>
        <label className='normalLabel'>Repetir Contraseña:</label>
        <Input clase={classInput} funChang={handleRepeatPassword} type={'password'} value={repeatPassword} placeHolder={'Repetir Contraseña'}></Input>
        <button type="submit" className="buttonForm buttonPrincipal" > <p className="nameBtn">Registro</p></button>
        <p>Si ya tienes una cuenta Inicia Sesion</p>
        <Button name={'Iniciar Sesión'} img={user} style={'buttonForm'} onClick={onClick}></Button>
        </form>
        </>
    )
}