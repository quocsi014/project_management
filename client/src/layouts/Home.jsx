import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function(){
  // Get thu ngay thang
  const currentDate = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('vi-VN', options);

  // Get giờ và đưa ra câu chào
  const currentHour = currentDate.getHours();
  let greeting;
  if (currentHour >= 6 && currentHour < 12) {
    greeting = 'Chào buổi sáng';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Chào buổi chiều';
  } else {
    greeting = 'Chào buổi tối';
  }

  // Phần công việc
  const [activeTab, setActiveTab] = useState('doing');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Set danh sách công việc
  const [tasks] = useState([
    { taskName: 'task 1', projectName: 'project name 1', userName: 'Thuy', startDate: new Date('2024-04-07'), deadline: new Date('2024-07-07')},
    { taskName: 'task 2', projectName: 'project name 1', userName: 'Thuy', startDate: new Date('2024-04-07'), deadline: new Date('2024-07-07')},
    { taskName: 'task 3', projectName: 'project name 1', userName: 'Thuy', startDate: new Date('2024-04-07'), deadline: new Date('2024-07-07')},
    { taskName: 'task 4', projectName: 'project name 1', userName: 'Thuy', startDate: new Date('2024-04-07'), deadline: new Date('2024-07-07')},
    { taskName: 'task 5', projectName: 'project name 1', userName: 'Thuy', startDate: new Date('2024-04-07'), deadline: new Date('2024-07-07')},
    { taskName: 'task 6', projectName: 'project name 1', userName: 'Thuy', startDate: new Date('2024-04-07'), deadline: new Date('2024-07-07')},
    { taskName: 'task 7', projectName: 'project name 1', userName: 'Thuy', startDate: new Date('2024-04-07'), deadline: new Date('2024-07-07')},
  ]);

  // Thông tin user
  const userList = [
    { name: 'User 1', email: 'user1@gmail.com' },
    { name: 'Thuy', email: 'user2@gmail.com' },
    { name: 'User 3', email: 'user3@gmail.com' },
    { name: 'User 4', email: 'user4@gmail.com' },
    { name: 'User 5', email: 'user5@gmail.com' },
    { name: 'User 6', email: 'user6@gmail.com' },
    { name: 'User 7', email: 'user7@gmail.com' },
    { name: 'User 8', email: 'user8@gmail.com' },
    { name: 'User 9', email: 'user9@gmail.com' },
    { name: 'User 10', email: 'user10@gmail.com' },
    // ...Thêm thông tin người dùng khác
  ];

  const chunkSize = 2; // Số lượng người dùng trong mỗi hàng

  // Chia mảng người dùng thành các mảng con có độ dài chunkSize
  const chunkedUserList = Array(Math.ceil(userList.length / chunkSize))
    .fill()
    .map((_, index) => userList.slice(index * chunkSize, (index + 1) * chunkSize));


  // Đổi màu giao diện
  const [popupOpen, setPopupOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('');
  // Sử dụng useEffect để gọi hàm changeBackgroundColor một lần sau khi component được render lần đầu tiên
  useEffect(() => {
    setBackgroundColor("bg-teal-100");
  }, []);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const changeBackgroundColor = (color) => {
    setBackgroundColor(color);
  };

  // Chi tiet cong viec
  const [showPopupTaskDetail, setShowPopupTaskDeTail] = useState(false);
  const [taskInfo, setSelectedTaskName] = useState(null);

  const openPopupTaskDetail = (taskInfo) => {
    setSelectedTaskName(taskInfo);
    setShowPopupTaskDeTail(true);
  };

  const closePopupTaskDetail = () => {
    setShowPopupTaskDeTail(false);
  };

  const formatDateString = (date) => {
    if (!date) return '';
    const today = new Date();
    if (date.toLocaleDateString() === today.toLocaleDateString()) {
      return 'Today';
    } else {
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    }
  };

  // Thay đổi thời gian công việc
  const [popupChangeTimer, setPopupChangeTimer] = useState(false);
  // const [selectedStartDate, setSelectedStartDate] = useState(null);
  // const [selectedDeadline, setSelectedDeadline] = useState(null);

  const openPopupChangeTimer =(taskInfo) => {
    setSelectedTaskName(taskInfo);
    setPopupChangeTimer(true);
  };

  const closePopupChangeTimer = () => {
    setPopupChangeTimer(false);
  };

  const handleStartDateChange = (date) => {
    // Tạo một bản sao của taskInfo để tránh thay đổi trực tiếp vào state
    const updatedTaskInfo = { ...taskInfo };
    // Cập nhật startDate trong taskInfo thành ngày được chọn
    updatedTaskInfo.startDate = date;
    taskInfo.deadline = date;
    // Cập nhật lại state của selectedTaskName
    setSelectedTaskName(updatedTaskInfo);
  };

  const handleDeadlineChange = (date) => {
    // Tạo một bản sao của taskInfo để tránh thay đổi trực tiếp vào state
    const updatedTaskInfo = { ...taskInfo };
    // Cập nhật deadline trong taskInfo thành ngày được chọn
    updatedTaskInfo.deadline = date;
    taskInfo.deadline = date;
    // Cập nhật lại state của selectedTaskName
    setSelectedTaskName(updatedTaskInfo);
  };

  return (
    <div className={`px-20 ${backgroundColor}`}>
      {/* Phần đầu trang home */}
      <div className='p-[50px] text-[30px]'>
        <div className="text-center">
          <p className='text-xl'>{formattedDate}</p>
          <p>{greeting}, Ten Nguoi dung</p>
        </div>

        <div className='mb-10'>
          <button
            className="bg-cyan-300 hover:bg-cyan-400 text-white font-bold py-1 float-right px-4 rounded text-[20px]"
            onClick={openPopup}
          >
            <div className="flex">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"></path>
              </svg>
              <span className="pl-2">Tùy chỉnh</span>
            </div>
          </button>

          {popupOpen && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
              <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-end">
                  <button
                    className="text-gray-500 hover:text-gray-700 transition ease-in-out duration-150"
                    onClick={closePopup}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <h2 className="text-xl font-bold mb-4">Thay đổi màu nền</h2>
                <div className="flex space-x-4">
                  <div
                    className="w-10 h-10 rounded-full bg-red-100 cursor-pointer"
                    onClick={() => changeBackgroundColor('bg-red-100')}
                  ></div>
                  <div
                    className="w-10 h-10 rounded-full bg-blue-100 cursor-pointer"
                    onClick={() => changeBackgroundColor('bg-blue-100')}
                  ></div>
                  <div
                    className="w-10 h-10 rounded-full bg-green-100 cursor-pointer"
                    onClick={() => changeBackgroundColor('bg-green-100')}
                  ></div>
                  <div
                    className="w-10 h-10 rounded-full bg-yellow-100 cursor-pointer"
                    onClick={() => changeBackgroundColor('bg-yellow-100')}
                  ></div>
                  <div
                    className="w-10 h-10 rounded-full bg-teal-100 cursor-pointer"
                    onClick={() => changeBackgroundColor('bg-teal-100')}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nội dung trang home */}
      <div className='flex flex-col m-auto w-[98%] h-[1080px]'>
        <div className='flex'>
          <div className="grow w-[49%] h-[500px] bg-white mr-6 text-[20px] shadow-md rounded-lg">
            <div className='text-3xl mt-2 font-bold text-black bg-white rounded-md'>
              <span className="py-2 pl-2">Công việc của tôi</span>
            </div>
            <div className="bg-gray-100 mt-5">
              <nav className="bg-white shadow pl-2">
                <div>
                  <div className="flex justify-between">
                    <div className="flex">
                      <button
                        className={`py-2 px-4 bg-white ${
                          activeTab === 'doing' ? 'border-b-2 border-black ':''
                        }`}
                        onClick={() => handleTabClick('doing')}
                      >
                        Sắp tới
                      </button>
                      <button
                        className={`py-2 px-4 bg-white ${
                          activeTab === 'overdue' ? 'border-b-2 border-black ':''
                        }`}
                        onClick={() => handleTabClick('overdue')}
                      >
                        Quá hạn
                      </button>
                      <button
                        className={`py-2 px-4 bg-white ${
                          activeTab === 'completed' ? 'border-b-2 border-black ':''
                        }`}
                        onClick={() => handleTabClick('completed')}
                      >
                        Hoàn thành
                      </button>
                    </div>
                  </div>
                </div>
              </nav>
              <div className="mx-auto py-2 sm:px-2 lg:px-2">
                {
                  activeTab === 'doing' && 
                  <div className="w-full h-full bg-gray-100">
                      <div className='max-h-[343px] overflow-auto'>
                        <table className="divide-y divide-gray-200 mt-5 cursor-pointer">
                          <tbody>
                            {tasks.map((task, index) => (
                              <tr key={index}>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                  <button className="flex h-12 w-6 h-6 items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M3.293 9.293a1 1 0 0 1 1.414-1.414l4 4a1 1 0 0 0 1.414 0l8-8a1 1 0 1 1 1.414 1.414l-9 9a1 1 0 0 1-1.414 0l-5-5z" clipRule="evenodd" />
                                    </svg>
                                  </button>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap max-w-[266px] min-w-[266px] truncate' onClick={() => openPopupTaskDetail(task)}>
                                  {task.taskName}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                  <div className="flex text-[10px] items-center justify-center focus:shadow-outline h-[30px] w-[100px] rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none">{task.projectName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap" onClick={() => openPopupChangeTimer(task)}>
                                  {formatDateString(task.startDate)} - {formatDateString(task.deadline) || "Select Date"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                  </div>
                }
                {activeTab === 'overdue' && <span>Quá hạn</span>}
                {activeTab === 'completed' && <span>Hoàn thành</span>}
              </div>
            </div>
          </div>
          <div className="grow w-[49%] h-[500px] bg-white shadow-md rounded-lg">
            <div className='text-3xl mt-2 font-bold text-black bg-white rounded-md'>
              <span className="py-2 pl-2">Dự án của tôi</span>
            </div>
              <div className='flex p-10'>
                <div className='h-20 grow flex text-[#6d6e6f] hover:bg-slate-300 hover:text-[#1e1f21] cursor-pointer items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="blue" className="w-20 h-20">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  <span className='pl-3 text-[20px]'>Dự án 1</span>
                </div>
                <div className='h-20 grow flex text-[#1e1f21] hover:bg-slate-300 cursor-pointer items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="blue" className="w-20 h-20">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  <span className='pl-3 text-[20px]'>Dự án 2</span>
                </div>
              </div>
          </div>
        </div>

        {/* Cap nhat cong viec */}
        {showPopupTaskDetail && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-8 rounded-md shadow-lg w-[35%]">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-black bg-white to-purple-500 rounded-md w-full">Thay đổi công việc</h2>
                <button
                  className="text-gray-500 hover:text-gray-700 transition ease-in-out duration-150"
                  onClick={closePopupTaskDetail}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-6">
                <div className="mb-4">
                  <label className="block font-bold mb-2">Tên công việc</label>
                  <input
                    type="text"
                    className="w-full py-2 px-4 border border-blue-500 rounded-md" value={taskInfo.taskName || ''}
                  />
                </div>
          
                <div className="mb-4">
                  <label className="block font-bold mb-2">Tên người phụ trách</label>
                  <select className="w-full py-2 px-4 border border-gray-300 rounded-md text-black">
                    <option value={taskInfo.userName} selected>{taskInfo.userName}</option>
                  </select>
                </div>
          
                <div className="mb-4">
                  <label className="block font-bold mb-2">Tên dự án</label>
                  <select className="w-full py-2 px-4 border border-blue-500 rounded-md text-black">
                    <option value={taskInfo.projectName} selected>{taskInfo.projectName}</option>
                  </select>
                </div>
          
                <button className="py-2 px-4 bg-blue-500 text-white rounded-md">
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Popup Change Timer */}
        {popupChangeTimer && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-lg font-bold mb-4">Thay đổi thời gian làm việc</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
                  <DatePicker onChange={handleStartDateChange} selected={taskInfo.startDate} dateFormat="dd/MM/yyyy"/>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Deadline</label>
                  <DatePicker onChange={handleDeadlineChange} selected={taskInfo.deadline} dateFormat="dd/MM/yyyy"/>
                </div>
                <div className="flex justify-end">
                  <button onClick={closePopupChangeTimer} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Đóng</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
