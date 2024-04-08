import logo from "../assets/logo2.png";
import testimage from "../assets/testimage.jpg";
import { FaChevronDown, FaPlus } from "react-icons/fa";
import Avatar from "../components/Avatar";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function () {
  const user = useSelector(state=>state.user)
  
  useEffect(()=>{
  },[user])
  return (
    <div className="w-screen h-16 bg-white border-b-2 px-4 flex justify-between items-center">
      <div className={`flex items-center`}>
        <img src={logo} alt="" className="h-12 mr-4" />
        <button className="rounded-full bg-blue-800 p-1px">
          {" "}
          <div className="flex h-fit text-sm items-center bg-blue-800 border-2 border-white py-1 px-4 rounded-full text-white font-bold">
            <FaPlus className="mr-1" /> Create
          </div>
        </button>
      </div>
      <input
        type="text"
        className="border-2 box-border outline-none h-12 w-120 px-4 rounded-full focus:border-gray-500"
        placeholder="Tìm kiếm (Ctrl + K)"
      />
      {
        user?
      <button className="flex items-center mr-8">
        <Avatar firstName={user.firstname} lastName = {user.lastname} imgUrl = {user.avatar_url} color = {user.color} size="size-10" />
        <FaChevronDown />{" "}
      </button>
      :
      <></>
      }
    </div>
  );
}
