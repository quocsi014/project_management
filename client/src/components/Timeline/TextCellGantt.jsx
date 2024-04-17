import React, { useState } from 'react';
import { updateTaskName, updateTaskDate } from '../../service/taskService';

const TextCellGantt = ({ taskID, name, isDuration, updateCell}) => {
  const [inputValue, setInputValue] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    console.log("handleChange: ",inputValue);
  };

  const handleBlur = async () => {
    let end = null;
    if (inputValue !== name) {
      if (isDuration != null) {
        const words = inputValue.split(' ');
        const number = words[0];

        // Kiểm tra xem number có phải là số và lớn hơn 0 không
        if (isNaN(number) || Number(number) <= 0) {
          throw new Error("Lỗi số ngày không phù hợp");
        }
        end = new Date(isDuration);
        end.setDate(end.getDate() + parseInt(number));
        setInputValue(number + " days")
      }
      updateCell(taskID, inputValue, isDuration, end);
    }
    setIsEditing(false);
  }

  const handleDoubleClick = () => {
    setIsEditing(true); // Kích hoạt chế độ chỉnh sửa khi người dùng nhấp đúp chuột vào ô văn bản
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleBlur(); 
    }
  };

  return (
    <div className="flex items-center">
      {isEditing ? (
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown} 
            autoFocus // Tự động focus vào ô văn bản khi hiển thị
            className="px-6 py-2 border-b-2 border-blue-500 rounded-lg focus:outline-none"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button onClick={handleBlur} className="text-blue-500 hover:text-blue-700"></button>
          </span>
        </div>
      ) : (
        <span onDoubleClick={handleDoubleClick}>{name}</span>
      )}
    </div>
  );
};

export default TextCellGantt;
