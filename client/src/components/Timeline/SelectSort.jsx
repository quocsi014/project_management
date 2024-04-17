import React, { useState, useEffect, useRef } from 'react';

export default function SelectSort({updateStatusOption}) {
  const selectRef = useRef(null); // Tạo một ref cho select element
  const [selectWidth, setSelectWidth] = useState('auto'); // Độ rộng của select

  // Sử dụng useEffect để tính toán độ rộng khi component được render hoặc selectRef thay đổi
  useEffect(() => {
    calculateSelectWidth();
  }, [selectRef]);

  return (
    <select
      ref={selectRef} // Gán ref cho select element
      id="select-task"
      className="custom_select appearance-none bg-transparent border-2 border-gray-300 focus:border-gray-700 text-sm h-8 px-3 mr-5 mx-5 rounded-lg"
      onChange={handleSelectChange}
      style={{
        width: selectWidth, // Đặt độ rộng trực tiếp từ selectWidth
      }}
    >
      <option value="all">Tất cả</option>
      <option value="incomplete">Chưa hoàn thành</option>
      <option value="complete">Đã hoàn thành</option>
    </select>
  );

    // Hàm xử lý sự kiện khi select thay đổi
    function handleSelectChange(event) {
      const selectedValue = event.target.value;
      let statusTask = null;
      if (selectedValue == "all"){
        statusTask = null;
      }
      else if (selectedValue == "incomplete") {
        statusTask = 0;
      } else {
        statusTask = 1;
      }
      updateStatusOption(statusTask); // Gọi hàm callback để cập nhật statusTask lên component cha
      calculateSelectWidth();
    }

  function calculateSelectWidth() {
    const select = selectRef.current; // Lấy tham chiếu đến select element từ ref
    if (!select) return;

    const selectedOption = select.options[select.selectedIndex];
    const temp = document.createElement("span");
    temp.style.visibility = "hidden";
    temp.style.fontSize = "13px";
    temp.style.whiteSpace = "nowrap";
    temp.textContent = selectedOption.textContent;

    document.body.appendChild(temp);

    const paddingLeft = parseFloat(getComputedStyle(select).paddingLeft);
    const paddingRight = parseFloat(getComputedStyle(select).paddingRight);
    const padding = paddingLeft + paddingRight;
    const width = temp.offsetWidth + padding + 12;
    document.body.removeChild(temp);

    setSelectWidth(width + "px");
  }
}
