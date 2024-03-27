import logo from "../assets/logo2.png"
import testimage from "../assets/testimage.jpg"
import { FaChevronDown, FaPlus } from "react-icons/fa"


export default function(){
  return(
    <div className="w-screen h-16 bg-white border-b-2 px-4 flex justify-between items-center" >
      <div className="flex items-center" >
        <img src={logo} alt="" className="h-12 mr-4" />
        <button className="rounded-full bg-blue-800 p-1px"> <div className="flex h-fit text-sm items-center bg-blue-800 border-2 border-white py-1 px-4 rounded-full text-white font-bold" ><FaPlus className="mr-1"/> Create</div></button>
      </div>
      <input type="text" className="border-2 outline-none h-12 w-120 px-4 rounded-full focus:border-gray-500" placeholder="Tìm kiếm (Ctrl + K)" />
      <button className="flex items-center mr-8"><img src={testimage} alt="" className="h-12 w-12 object-cover rounded-full mr-2 border-2 border-solid border-gray-900" /> <FaChevronDown/> </button>
    </div>
  )
}