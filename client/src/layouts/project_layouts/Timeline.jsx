import { useState, useEffect, useRef } from 'react';
import { GanttComponent, ColumnsDirective, ColumnDirective, Edit, Inject } from '@syncfusion/ej2-react-gantt';
import PropTypes from 'prop-types';
import "../../style/timeline.css";
import { getTaskOfProject, updateTask, updateTaskDate, updateTaskName } from '../../service/taskService.js';
import CheckboxStatus from '../../components/Timeline/CheckboxStatus.jsx';
import SelectSort from '../../components/Timeline/SelectSort.jsx';
import TextCellGantt from '../../components/Timeline/TextCellGantt.jsx';
import { useParams } from 'react-router-dom';
import { BiPlus } from 'react-icons/bi'

export default function () {
  const [transformedTasks, setTransformedTasks] = useState([]);
  const { workspace_id, project_id } = useParams();

  const taskValues = {
    id: "TaskID",
    name: "Name",
    startDate: "StartDate",
    due: "Due",
    endDate: "EndDate",
    status: "Status"
  };

  const taskFields = {
    TaskID: "task_id",
    Name: "task_name",
    StartDate: "start_date",
    EndDate: "end_date",
    Status: "status"
  };

  // Gọi hàm fetchData() khi component được tải lần đầu
  useEffect(() => {
    fetchData(null);
  }, []);

  const fetchData = async (statusTask) => {
    try {
      let response;

      if (statusTask == null) {
        response = await getTaskOfProject(
          workspace_id,
          project_id
        );
      } else {
        response = await getTaskOfProject(
          workspace_id,
          project_id,
          statusTask
        );
      }

      console.log(response.data)
      // Kiểm tra xem phản hồi có thành công không
      if (response.status === 200) {
        const tasks = response;
        setTransformedTasks(transformData(tasks.data, taskFields));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data: ');
    }
  };

  const updateTaskAsync = async (args) => {
    try {
      const { TaskID, Name, StartDate, EndDate, Status } = args;
      const statrDateString = formatDate(StartDate);
      const endDateString = formatDate(EndDate);
      const response = await updateTask(workspace_id, project_id, TaskID, Name, statrDateString, endDateString, Status);
      // alert("Cập nhật thành công");
      fetchData(null);
    } catch (error) {
      alert("Xảy ra lỗi khi cập nhật")
      console.error("Lỗi khi cập nhật công việc", error);
    }
  };

  // Hàm callback để cập nhật statusTask từ component con lên component cha
  const updateStatusOption = (statusOption) => {
    fetchData(statusOption);
  };

  const updateCell = async (taskID, nameTask, isDuration, endDate) => {
    try {
      let response;

      if (isDuration != null) {
        if (isWeekend(new Date(isDuration)) || isWeekend(new Date(endDate))) {
          alert("Ngày bắt đầu hoặc ngày kết thúc công việc không rơi vào cuối tuần.")
          return;
        } else {
          const startString = formatDate(isDuration);
          const endString = formatDate(endDate);
          response = await updateTaskDate(workspace_id, project_id, taskID, startString, endString);
        }
      } else {
        response = await updateTaskName(workspace_id, project_id, taskID, nameTask);
      }
      if (response.status === 200) {
        fetchData(null);
      }
    } catch (error) {
      alert("Xảy ra lỗi khi cập nhật")
      console.error("Lỗi khi cập nhật công việc", error);
    }
  }

  const isWeekend = (date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // 0 là Chủ nhật, 6 là Thứ 7
  };

  function formatDate(date) {
    // Kiểm tra xem ngày đầu vào có tồn tại hay không
    if (!date) return null;

    const new_date = new Date(date);

    const year = new_date.getFullYear();
    const month = new_date.getMonth() + 1;
    const day = new_date.getDate();

    // Định dạng lại ngày theo mong muốn
    const formattedEndDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

    return formattedEndDate;
  };


  const transformData = (data, taskFields) => {
    return data.map(item => {
      const transformedItem = {};
      Object.entries(taskFields).forEach(([key, value]) => {
        if (value in item) {
          if (key === 'StartDate' || key === 'EndDate') {
            const dateString = item[value];
            const [year, month, day] = dateString.split('-');
            const date = new Date(year, month - 1, day);

            // Định dạng lại ngày theo mong muốn
            const formattedDate = date.toString(); // Đổi thành chuỗi ngày tháng đầy đủ

            transformedItem[key] = formattedDate;
          } else {
            transformedItem[key] = item[value];
          }
        }
      });

      // Tính toán trường "Duration" ở đây, sau khi đã chuyển đổi "StartDate" và "EndDate"
      const startDate = new Date(transformedItem['StartDate']);
      const endDate = new Date(transformedItem['EndDate']);
      let workDays = 0;
      let currentDate = startDate;
      while (currentDate < endDate) {
        workDays++;
        currentDate.setDate(currentDate.getDate() + 1); // Tăng ngày lên 1
      }
      transformedItem['Due'] = workDays;

      return transformedItem;
    });
  };

  //Gantt charts
  const editOptions = {
    allowEditing: false,
    allowTaskbarEditing: true
  }

  editOptions.propTypes = {
    allowEditing: PropTypes.bool.isRequired
  };

  //kéo thả taskbar
  const handleTaskbarEdit = (args) => {
    updateTaskAsync(args.data);
    console.log('Task bar edited:', args.data);
  };


  const handleTaskbarClick = (args) => {
    // Thực hiện các hành động tương ứng khi task-bar được nhấp
    console.log('Task bar clicked:', args);
    console.log(transformedTasks);
    alert('Task bar has been clicked!');
  };

  const handleEndEdit = (args) => {
    console.log('Cell editing ended:', args);
    updateTaskAsync(args.data);
  };

  const onActionBegin = (args) => {
    if (args.requestType === 'dragging') {
      const task = args.data;
      // Kiểm tra nếu bắt đầu vào thứ 7 hoặc kết thúc vào chủ nhật, thì không cho phép kéo và thả
      const startDate = new Date(task.StartDate);
      const endDate = new Date(task.EndDate);
      if (startDate.getDay() === 6 || endDate.getDay() === 0) {
        args.cancel = false; // Hủy sự kiện kéo và thả
      }
    }
  }

  return (
    <div className="flex flex-col justify-start w-full h-full">
      <div className="items-center mt-4 mb-4 flex relative" >
        <div className="items-center flex mr-auto pr-2">
          <button className="flex items-center border-2 py-1 px-2 ml-4 border-gray-400 text-sm rounded-md mr-3">
            <BiPlus />Thêm công việc
          </button>
          <SelectSort updateStatusOption={updateStatusOption}/>
        </div>
      </div >

      {/* Gantt timeline */}
      <div className='w-full h-full flex flex-col' >
        <GanttComponent
          actionBegin={onActionBegin}
          dataSource={transformedTasks}
          taskFields={taskValues}
          editSettings={editOptions}
          taskbarEdited={handleTaskbarEdit} //thay đổi taskbar sau khi chỉnh sửa taskbar
          onTaskbarClick={handleTaskbarClick} //cliked taskbar
          endEdit={handleEndEdit} // Bắt sự kiện khi người dùng hoàn thành chỉnh sửa nội dung của các ô trong cột
          style={{ flex: 1 }} // Tự mở rộng chiều dọc
          allowKeyboard={false}
          timelineSettings={{
            timelineViewMode: 'Week', // Chế độ hiển thị theo tuần
            topTier: {
              unit: 'Month', // Đơn vị của Top tier là tháng
              format: 'MM-yyyy',
            },
            bottomTier: {
              unit: 'Day', // Đơn vị của Bottom tier cũng là ngày
              format: 'dd', // Định dạng ngày chỉ hiển thị ngày trong tháng
            }
          }}
        >
          <Inject services={[Edit]} ></Inject>
          <ColumnsDirective>
            <ColumnDirective field="TaskID" headerText="ID" visible={false} />
            <ColumnDirective field="Name" headerText="Tên"
              template={(props) => <TextCellGantt
                taskID={props.TaskID}
                name={props.Name}
                isDuration={null}
                updateCell={updateCell}
              />}
            />
            <ColumnDirective
              headerText="Trạng thái"
              field='Status'
              template={(props) => <CheckboxStatus
                workspaceID={workspace_id}
                projectID={project_id}
                taskID={props.TaskID}
                status={props.Status} />}
            />
            <ColumnDirective field="Due" headerText="Khoảng thời gian"
              template={(props) => <TextCellGantt
                taskID={props.TaskID}
                name={props.Due + " days"}
                isDuration={props.StartDate}
                updateCell={updateCell}
              />}
            />
          </ColumnsDirective>
        </GanttComponent>
      </div>
    </div>
  );
}