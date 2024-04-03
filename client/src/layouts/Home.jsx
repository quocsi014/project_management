import { useState } from 'react';

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
  return(
    <div className="m-[30px]">
      {/* Phần đầu trang home */}
      <div>
        <span>Homes</span>
        <div className="text-center">
          <p>{formattedDate}</p>
          <p>{greeting}, Ten Nguoi dung</p>
        </div>
      </div>

      {/* Nội dung trang home */}
      <div>
        <div className="w-[500px] h-[390px] float-left m-[20px] bg-teal-100">
          <div>
            <span className="">Công việc của tôi</span>
          </div>
          <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between">
                  <div className="flex">
                    <button
                      className={`py-2 px-4 ${
                        activeTab === 'doing' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                      }`}
                      onClick={() => handleTabClick('doing')}
                    >
                      Đang thực hiện
                    </button>
                    <button
                      className={`py-2 px-4 ${
                        activeTab === 'overdue' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                      }`}
                      onClick={() => handleTabClick('overdue')}
                    >
                      Quá hạn
                    </button>
                    <button
                      className={`py-2 px-4 ${
                        activeTab === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                      }`}
                      onClick={() => handleTabClick('completed')}
                    >
                      Hoàn thành
                    </button>
                  </div>
                </div>
              </div>
            </nav>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-4 sm:px-0">
                {activeTab === 'doing' && <span>Đang thực hiện</span>}
                {activeTab === 'overdue' && <span>Quá hạn</span>}
                {activeTab === 'completed' && <span>Hoàn thành</span>}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[500px] h-[390px] float-left m-[20px] bg-teal-100">
          div 2
        </div>
        <div className="w-[500px] h-[390px] float-left m-[20px] bg-teal-100">
          div 3
        </div>
      </div>
    </div>
  )
}