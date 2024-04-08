import { useState, useEffect, useRef } from 'react';
import "../../css/timeline.css";
//, Toolbar, Selection 
import { GanttComponent, ColumnsDirective, ColumnDirective, Edit, Inject } from '@syncfusion/ej2-react-gantt';
import PropTypes from 'prop-types';

export default function () {
  const [selectWidths, setSelectWidths] = useState('auto'); // Độ rộng của select

  //xử lý sự kiện khi click select
  const handleSelectChange = (event) => {
    calculateSelectWidth(event.target);
  }

  function calculateSelectWidth(select = null) {
    if (!select) {
      const selects = document.querySelectorAll('.custom_select'); // Lấy tất cả các select
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
    const width = temp.offsetWidth + padding + 12; // Thêm giá trị padding
    document.body.removeChild(temp);

    setSelectWidths(prevWidths => ({
      ...prevWidths,
      [select.id]: width + "px" // Lưu độ rộng vào object selectWidths với key là id của select
    }));
  }

  const CheckboxTemplate = ({ progress }) => (
    <div className="flex items-center">
      {progress === 100 ? (
        <input type="checkbox" checked disabled className="form-checkbox h-4 w-4 text-indigo-600" />
      ) : (
        <input type="checkbox" disabled className="form-checkbox h-4 w-4 text-indigo-600" />
      )}
      <span className="ml-2">Hoàn thành</span>
    </div>
  );

  //Gantt charts
  const editOptions = {
    allowEditing: true,
    // allowAdding: true,
    // allowDeleting: true,

    allowTaskbarEditing: true
  }

  editOptions.propTypes = {
    allowEditing: PropTypes.bool.isRequired
  };

  const SelfRefData = [
    { TaskID: 1, TaskName: 'Project Initiation', StartDate: new Date('04/02/2024'), EndDate: new Date('04/21/2024') },
    { TaskID: 2, TaskName: 'idnetify Site', StartDate: new Date('04/02/2024'), Duration: 4, Progress: 50, ParentId: 1 },
    { TaskID: 3, TaskName: 'Perform Soil', StartDate: new Date('04/02/2024'), Duration: 4, Progress: 50, ParentId: 1 },
    { TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/02/2024'), Duration: 4, Progress: 50, ParentId: 1 },
    { TaskID: 5, TaskName: 'Hihi', StartDate: new Date('04/10/2024'), EndDate: new Date('04/31/2024') },
    { TaskID: 6, TaskName: 'Ai rảnh', StartDate: new Date('03/02/2024'), EndDate: new Date('04/01/2024') },
    { TaskID: 7, TaskName: 'Đâu mà ghi hoài', StartDate: new Date('04/02/2024'), Duration: 3, Progress: 100, ParentId: 5 },
    { TaskID: 8, TaskName: 'hihi', StartDate: new Date('04/02/2024'), Duration: 4, Progress: 50, ParentId: 1 },
    { TaskID: 9, TaskName: 'đồ ngốc', StartDate: new Date('04/02/2024'), Duration: 4, Progress: 100, ParentId: 1 },
  ];

  const taskValues = {
    id: "TaskID",
    name: "TaskName",
    startDate: "StartDate",
    duration: "Duration",
    endDate: "EndDate",
    progress: "Progress",
    parentId: "ParentId",
    dependency: "Predecessor"
  };

  //kéo thả taskbar
  const handleTaskbarEdit = (args) => {
    // Thực hiện các hành động tương ứng khi task-bar được kéo và thả
    console.log('Task bar edited:', args);
    alert('Task bar has been edited!');
  };


  const handleTaskbarClick = (args) => {
    // Thực hiện các hành động tương ứng khi task-bar được nhấp
    console.log('Task bar clicked:', args);
    alert('Task bar has been clicked!');
  };

  return (
    <div className="flex flex-col justify-start w-full h-full">
      <div className="items-center mt-4 mb-4 flex relative" >
        <div className="items-center flex mr-auto pr-2">
          <button className="border-gray-300 border-2 border-solid ml-4 w-44 h-8 rounded-lg flex items-center px-3  focus:border-gray-700">
            <img src="../../src/assets/add.png" alt="" className="w-6 h-6 mr-2" />
            <span>Thêm công việc</span>
          </button>

          <select
            id="select-task"
            className="custom_select appearance-none bg-transparent border-2 border-gray-300 focus:border-gray-700 text-sm h-8 px-3 mr-5 mx-5 rounded-lg"
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

        </div>
      </div >
      <div className='w-full'>
        <GanttComponent
          dataSource={SelfRefData}
          taskFields={taskValues}
          editSettings={editOptions}
          taskbarEdited={handleTaskbarEdit} //thay đổi taskbar
          onTaskbarClick={handleTaskbarClick} //cliked taskbar
        >
          {/* //, Toolbar, Selection */}
          <Inject services={[Edit]}></Inject>
          <ColumnsDirective>
            <ColumnDirective field="TaskID" headerText="ID" visible={false} />

            <ColumnDirective field="TaskName" headerText="Name" />
            {/* <ColumnDirective field="StartDate" headerText="start" /> */}

            <ColumnDirective
              headerText="Status"
              field='Progress'
              template={(props) => <CheckboxTemplate progress={props.Progress} />}
            />
            <ColumnDirective field="Duration" />
          </ColumnsDirective>
        </GanttComponent>
      </div>
    </div>
  );
}