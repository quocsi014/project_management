import { useState, useEffect, useRef } from 'react';
import TimeLine from "react-gantt-timeline";
import "../../css/timeline.css";
const config = {
  header: {
    top: {
      style: {
        backgroundColor: "#95aacd",
        color: "white",
        fontSize: 12
      }
    },
    middle: {
      style: {
        backgroundColor: "lightgrey",
        fontSize: 9
      }
    },
    bottom: {
      style: {
        background: "white",
        fontSize: 9,
        color: "grey"
      },
      selectedStyle: {
        background: "linear-gradient( #d011dd ,#d011dd)",
        fontWeight: "bold",
        color: "white"
      }
    }
  },
  taskList: {
    title: {
      label: "Stages",
      style: {
        backgroundColor: "#5b7bb2",
        color: "White"
      }
    },
    task: {
      style: {
        backgroundColor: "",
        color: "black"
      }
    },
    verticalSeparator: {
      style: {
        backgroundColor: "#fbf9f9"
      },
      grip: {
        style: {
          backgroundColor: "#5b7bb2"
        }
      }
    }
  },
  dataViewPort: {
    rows: {
      style: {
        backgroundColor: "white",
        borderBottom: "solid 0.1px lightgrey"
      }
    },
    task: {
      showLabel: true,
      style: {}
    }
  }
};

const MyGanttChart = () => {
  let d1 = new Date();
  let d2 = new Date();
  d2.setDate(d2.getDate() + 5);
  let d3 = new Date();
  d3.setDate(d3.getDate() + 8);
  let d4 = new Date();
  d4.setDate(d4.getDate() + 20);
  const data = [
    {
      id: 1,
      start: d1,
      end: d2,
      name: 'Setup',
      color: '#81c784',
    },
    {
      id: 2,
      start: d3,
      end: d4,
      name: 'Demo Task 2',
      color: '#ffab00',
    },
    {
      id: 3,
      start: d3,
      end: d4,
      name: 'Demo Task 2',
      color: '#ffab00',
    },
    {
      id: 4,
      start: d3,
      end: d4,
      name: 'Demo Task 2',
      color: '#ffab00',
    },
  ];
  const config = {
    header: {
      top: {
        style: {
          backgroundColor: "#95aacd",
          color: "white",
          fontSize: 12
        }
      },
      middle: {
        style: {
          backgroundColor: "lightgrey",
          fontSize: 9
        }
      },
      bottom: {
        style: {
          background: "white",
          fontSize: 9,
          color: "grey"
        },
        selectedStyle: {
          background: "linear-gradient( #d011dd ,#d011dd)",
          fontWeight: "bold",
          color: "white"
        }
      }
    },
    taskList: {
      title: {
        label: "Stages",
        style: {
          backgroundColor: "#5b7bb2",
          color: "White"
        }
      },
      task: {
        style: {
          backgroundColor: "",
          color: "black"
        }
      },
      verticalSeparator: {
        style: {
          backgroundColor: "#fbf9f9"
        },
        grip: {
          style: {
            backgroundColor: "#5b7bb2"
          }
        }
      }
    },
    dataViewPort: {
      rows: {
        style: {
          backgroundColor: "white",
          borderBottom: "solid 0.1px lightgrey"
        }
      },
      task: {
        showLabel: true,
        style: {}
      }
    }
  };
  const links = [];
  return { data };
};

export default function () {
  const { data, config, links } = MyGanttChart(); // Gọi hàm MyGanttChart để lấy data
  const buttonRef = useRef(null); // Ref cho main button
  const [showDropdown, setShowDropdown] = useState(false); // Trạng thái của dropdown
  const [selectWidths, setSelectWidths] = useState('auto'); // Độ rộng của select


  // Xử lý sự kiện khi click chuột ở bất kỳ đâu trên trang
  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setShowDropdown(false); // Ẩn nút phụ khi click chuột bên ngoài
    }
  };

  // Sử dụng useEffect để thêm sự kiện click ngoài cùng cho window
  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleButtonMainClick = () => {
    setShowDropdown(!showDropdown); // Đảo ngược trạng thái của dropdown khi click vào button
  };

  //xử lý sự kiện khi click select
  const handleSelectChange = (event) => {
    calculateSelectWidth(event.target);
  }
  
  useEffect(() => {
    // Gọi hàm calculateSelectWidth() khi component được mount
    calculateSelectWidth();
    // Xóa sự kiện khi component unmount
    return () => {
      window.removeEventListener('resize', calculateSelectWidth);
    };
  }, []);

  function calculateSelectWidth(select = null) {
    if (!select) {
      const selects = document.querySelectorAll('.custom-select'); // Lấy tất cả các select
      selects.forEach(select => calculateSelectWidth(select)); // Tính độ rộng cho mỗi select
      return;
    }

    const selectedOption = select.options[select.selectedIndex];

    // Tạo một span tạm thời để tính toán độ rộng
    const temp = document.createElement("span");
    temp.style.visibility = "hidden";
    temp.style.fontSize = "13px";
    temp.style.whiteSpace = "nowrap"; // Ngăn không gian trắng tự động được thêm vào
    temp.textContent = selectedOption.textContent; // Sử dụng textContent thay vì innerHTML để tránh xử lý HTML

    document.body.appendChild(temp);

    // Tính toán chiều rộng của select box với padding và font size
    const paddingLeft = parseFloat(getComputedStyle(select).paddingLeft);
    const paddingRight = parseFloat(getComputedStyle(select).paddingRight);
    const padding = paddingLeft + paddingRight;
    const width = temp.offsetWidth + padding + 1; // Thêm giá trị padding
    document.body.removeChild(temp);

    setSelectWidths(prevWidths => ({
      ...prevWidths,
      [select.id]: width + "px" // Lưu độ rộng vào object selectWidths với key là id của select
    }));
  }
  return (
    <div className="flex flex-col justify-start w-full h-full">
      <div class='toolbar'>
        <div className='toolbar-left'>
          <button className='addTask'>Thêm công việc</button>
          <button ref={buttonRef} className='mainButton' onClick={handleButtonMainClick}>▼</button>

          <div className="subButtonsContainer">
            {showDropdown && (
              <div>
                <button className="subButton">Add section</button>
                <button className="subButton">Add milestone</button>
              </div>
            )}
          </div>

          <select
            id="select-task"
            className="custom-select"
            onChange={handleSelectChange}
            style={{
              width: selectWidths["select-task"],
              backgroundImage: 'url("./checked.png")'
            }}
          >
            <option>Tất cả</option>
            <option>Chưa hoàn thành</option>
            <option>Đã hoàn thành</option>
          </select>

          <select id="select-sort" className="custom-select"
            onChange={handleSelectChange} style={{ width: selectWidths["select-sort"] }}
          >
            <option>Sắp xếp</option>
            <option>Ngày bắt đầu</option>
            <option>Ngày kết thúc</option>
            <option>Người được phân công</option>
          </select>

          {/* 
        </div>

        <div className='toolbar-right'>
          <button id='btn-today'>Hôm nay</button>

          <select id="select-time" className="custom-select" onChange={handleSelectChange} style={{ width: selectWidths["select-time"] }}>
            <option hidden disabled>Color:</option>
            <option>Giờ</option>
            <option>Ngày</option>
            <option>Tuần</option>
            <option>Tháng</option>
            <option>Năm</option>
          </select>

          <select id="select-color" className="custom-select" onChange={handleSelectChange} style={{ width: selectWidths["select-color"] }}>
            <option>Mặc định</option>
            <option>Không màu</option>
            <option>Xanh</option>
            <option>vàng</option>
          </select>*/}
        </div>
      </div>
      <div className="flex flex-col justify-start items-center w-full">
        <TimeLine data={data} links={links} config={config} />
      </div>
    </div>
  )
}