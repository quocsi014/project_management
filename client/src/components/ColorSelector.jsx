import { useState } from "react"
import { colorsArray } from "../resource/color"
import { useDispatch } from "react-redux"
import { updateColor } from "../redux/store"

export default function(props){
  let{color, setColor, isOpen, setIsOpen, updateColor} = props
  const colorClick = (e)=>{
    let selectedColor = e.target.getAttribute('color')
    updateColor(selectedColor)
    setColor(selectedColor)
    setIsOpen(false)
  }
  return(
    <div className={`flex flex-wrap w-48 h-auto border-2 border-gray-400 box-content absolute ${isOpen? "block":"hidden"}`}>
      {
        colorsArray.map((value, index)=>{
          return <button onClick={e=>{colorClick(e)}} className={`w-16 h-8 box-border ${value} ${index == color? "border-2":""}`} color={index}></button>
        })
      }
    </div>
  )


}