
export default function TextField(props){
  let {title, errorMessage, setErrorMessage, id, type, value, setValue} = props

  let textBoxFocus = e =>{
    setErrorMessage("")
  }

  return(
    <div className="w-full mb-4">
      <label htmlFor={id} className="text-l">{title}</label><br/>
      <input id={id} type={type} onFocus={e=>textBoxFocus(e)} value={value} onChange={e=>setValue(e.target.value)} className={`bg-blue-50 border-2 w-full h-10  border-solid outline-none rounded-lg pl-2 focus:border-gray-400 ${errorMessage == "" ? "border-gray-200" : "border-red-500"}`}/><br/>
      <span className="text-red-500 ">{errorMessage}</span>
    </div>
  )
}