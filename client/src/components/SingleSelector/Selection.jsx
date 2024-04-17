import React, { useEffect, useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
export default function (props) {
  const { children, className, title, handleChange, value } = props;
  const [isOpened, setIsOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState(value);
  const [selectedContent, setSelectedContent] = useState(title);
  useEffect(()=>{
    setSelectedItem(value)
  },[value])
  return (
    <div className={"w-fit " +  className }>
      <button
        className={"px-2 py-1 w-full mb-1px flex items-center min-w-16 border-2 border-gray-200 rounded-md"}
        onClick={() => {
          setIsOpened(!isOpened);
        }}
      >
        {selectedContent ? selectedContent : title ? title : "Select Item"}{" "}
        {!isOpened ? <MdArrowDropDown /> : <MdArrowDropUp />}{" "}
      </button>
      <div className="w-fit relative">
        <div
          className={`w-fit h-auto absolute top-0 left-0 border-2 bg-white border-gray-500 rounded-md ${
            isOpened ? "flex flex-col items-start px-4 py-2" : "hidden"
          }`}
        >
          {children.map((child) => {
            return React.cloneElement(child, {
              selectedItem,
              setSelectedItem,
              setSelectedContent,
              setIsOpened,
              handleChange
            });
          })}
        </div>
      </div>
    </div>
  );
}
