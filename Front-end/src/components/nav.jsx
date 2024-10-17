import Button from "./button";
import cerrarSesion from '../assets/box-arrow-in-left.svg'
import cerrarNav from '../assets/arrow-left.svg'
import abrirNav from '../assets/arrow-right.svg'
import grafico from '../assets/grafico-de-barras.png'
import mas from '../assets/plus-square.svg'

export function NavBar({show, clase , handleStat, handleshow, onsess}) {
    

    return (
        <>
        {clase === 'navBar' ?
        (<nav className={clase}>
            <Button style={'nabButton'} img={cerrarNav} onClick={show} ></Button>
            <Button style={'nabButton'} img={grafico} onClick={handleStat}></Button>
            <Button style={'nabButton'} img={mas} onClick={handleshow}></Button>
            <Button style={'nabButton'} img={cerrarSesion} onClick={onsess}></Button>
        </nav>)
            :
        (<nav className='navHidden'>
            <Button style={'nabButton'} img={abrirNav} onClick={show} ></Button>
        </nav>)
        }
        </>
    )
}