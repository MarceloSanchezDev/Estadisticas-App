

export function Input({id,clase,type, value, funChang,funClick,placeHolder}){
    return(
        <input id={id} className={clase} type={type} value={value} onChange={funChang} onClick={funClick} placeholder={placeHolder} />
    )
}