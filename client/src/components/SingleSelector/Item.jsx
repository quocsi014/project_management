import { useEffect } from "react";

export function Item(props){
  const {children, className, selectedItem, setSelectedItem, setSelectedContent, selectedClass, setIsOpened, handleChange, data} = props
  useEffect(()=>{
    if(data == selectedItem){
      setSelectedContent(children)
    }
  },[])
  let selectClass_ = selectedClass?selectedClass:"bg-gray-400 text-white"
  return(
    <button className={`${selectedItem == data ? selectClass_:""} w-full text-nowrap px-3 rounded-md ${className?className:""}`} onClick={()=>{setSelectedItem(data); setSelectedContent(children); setIsOpened(false); handleChange(data)}}>
      {children}
    </button>
  )
}