import { useState } from "react"

export function Grafico ({porcentaje}) {
    const [param1,setParame1] = useState(`${porcentaje}%`)
    return(
        <div className="grafico">
            <div className="ejes">
            <p className="ejes1">100%</p>
            <p className="ejes2">50%</p>
            <p className="ejes3">0%</p>
            </div>
            <div className="Lineas">
                <div style={{height:param1}} className="parametro1">
                </div>
                <div className="parametro2">
                </div>
            </div>
        </div>
    )
}