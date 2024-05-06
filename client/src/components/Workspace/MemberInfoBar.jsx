import React from "react";

const MemberInfoBar = ({ number, text, class_name }) => {
  class_name = class_name ? " " + class_name : " border-r-2";
  return (
    <div className={"w-1/2 mt-6 p-3" + class_name}>
      <div className="w-full font-sans text-center text-2xl font-normal h-6">{number}</div>
      <span className="h-6 text-sm font-sans text-center text-gray-500">
        <div className="items-center">{text}</div>
      </span>
    </div>
  );
};

export default MemberInfoBar;