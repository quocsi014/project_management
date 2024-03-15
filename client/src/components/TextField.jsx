import { useState } from "react"

export default function TextField(props){
  let {title, errorMessage, id, type, value, setValue} = props
  let [msgErr, setMsgerr] = useState(errorMessage);

  let textBoxFocus = e =>{
    setMsgerr("")
  }

  return(
    <div className="w-full mb-4">
      <label htmlFor={id} className="text-l">{title}</label><br/>
      <input id={id} type={type} onFocus={e=>textBoxFocus(e)} value={value} onChange={e=>setValue(e.target.value)} className={`bg-blue-50 border-2 w-full h-10  border-solid outline-none rounded-lg pl-2 ${msgErr == "" ? "border-gray-200" : "border-red-500"}`}/><br/>
      <span className="text-red-500 ">{msgErr}</span>
    </div>
  )
}