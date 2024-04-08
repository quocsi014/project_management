import { useState } from "react"

export default function(){
  let [isOpen, setIsOpen] = useState(false);
  return(
    <div className={`${isOpen?"block":"hidden"} h-creen w-screen bg-gray`}></div>
  )
}