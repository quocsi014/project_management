import {BiPlus, BiFilter, BiSortAlt2} from 'react-icons/bi'

export default function(){
  const buttonStyle = 'flex items-center border-2 py-1 px-2 border-gray-400 text-sm rounded-md mr-3'
  return(
    <div className="w-full h-12 bg-white flex items-center px-4 ">
      <button className={buttonStyle}><BiPlus/>Thêm công việc</button>
      <button className={buttonStyle + " border-none text-gray-500 hover:text-gray-700 hover:bg-gray-300"}><BiFilter className='mr-1'/>filter</button>
      <button className={buttonStyle + " border-none text-gray-500 hover:text-gray-700 hover:bg-gray-300"}><BiSortAlt2 className='mr-1'/>sort</button>
    </div>
  )
}