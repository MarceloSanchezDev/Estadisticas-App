
export default function Button({ name,style, img , onClick }) {
  return <button onClick={onClick} className={style}><p className='nameBtn'>{name}</p> <img className='btnImg'src={img} alt={name} /></button>;
}