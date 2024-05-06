import MemberInfoBar from '../../components/Workspace/MemberInfoBar';
import UserItem from "../../components/UserItem";
import { deleteInvitationOfWorkspace, getUserOfWorkspaceAndInvitation, deleteUserOfWorkspace} from '../../service/workspaceService.js';
import { getUserInformation } from '../../service/userService.js';

import { GrSearch } from "react-icons/gr";
import { FaPlus } from "react-icons/fa";

import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

export default function Workspace() {
  const { workspace_id } = useParams();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingInvitationsCount, setPendingInvitationsCount] = useState(0);
  const [senders, setSenders] = useState({}); // Sử dụng một object để lưu thông tin sender cho mỗi user
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State để điều khiển việc hiển thị giao diện hỏi xóa
  const [selectedUser, setSelectedUser] = useState(null); // State để lưu thông tin user được chọn để xóa

  useEffect(() => {
    loadAllUsers();
  }, []);

  const loadAllUsers = async () => {
    try {
      const response = await getUserOfWorkspaceAndInvitation(workspace_id);
      const usersData = Object.values(response.data)[0];
      setUsers(usersData);
      const count = usersData.reduce((acc, userData) => {
        if (userData.invitation && userData.invitation.status == 0) {
          return acc + 1;
        }
        return acc;
      }, 0);
      setPendingInvitationsCount(count);

      // Lặp qua danh sách người dùng và gọi fetchSenderInformation để lấy thông tin sender cho mỗi người dùng
      const sendersData = {};
      usersData.forEach(userData => {
        const senderId = userData.invitation.senderUserId;
        if (senderId && !sendersData[senderId]) {
          console.log(senderId)
          fetchSenderInformation(senderId)
            .then(senderData => {
              sendersData[senderId] = senderData; // Lưu thông tin sender vào object sendersData
              setSenders(prevState => ({ ...prevState, [senderId]: senderData })); // Cập nhật state senders
            })
            .catch(error => {
              console.error('Error fetching sender information:', error);
            });
        }
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchSenderInformation = async (userId) => {
    try {
      const response = await getUserInformation(userId);
      return response.data;
    } catch (error) {
      console.error('Error fetching sender information:', error);
      throw error; // throw error để bắt và xử lý lỗi ở nơi gọi
    }
  };

  const DeleteCollaboratorOfWorkspace = async (userId) => {
    try {
      const collaborators_id = userId;
      await Promise.all([
        deleteInvitationOfWorkspace(workspace_id, collaborators_id),
        deleteUserOfWorkspace(workspace_id, collaborators_id)
      ]);
      console.log('Collaborator deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting collaborator:', error);
      throw error;
    }
  };
  

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(userData => {
    const user = userData.user;
    if (!user) return false;
    const { firstname, lastname, email } = user;
    if (!firstname && !lastname && !email) return false;

    const searchTerm = searchQuery.trim().toLowerCase();
    const fullName = `${firstname.trim()} ${lastname.trim()}`.toLowerCase();

    // Nếu không có firstname hoặc lastname, thì chỉ tìm kiếm email
    return (
      fullName.includes(searchTerm) ||
      email.toLowerCase().includes(searchTerm)
    );
  });

  const handleUserItemClick = (user) => {
    setSelectedUser(user); // Lưu thông tin user được chọn
    setShowDeleteConfirmation(true); // Hiển thị giao diện hỏi xóa
  };

  // Hàm xác nhận xóa user
  const confirmDeleteUser = async () => {
    console.log('Đã xóa user:', selectedUser.user_id);
    try {
      if (await DeleteCollaboratorOfWorkspace(selectedUser.user_id)) {
        alert("Xóa thành công");
        loadAllUsers();
      }
    } catch (error) {
      console.error("Error deleting collaborator:", error);
    }
  
    setShowDeleteConfirmation(false);
    setSelectedUser(null);
  };

  // Hàm hủy bỏ việc xóa user
  const cancelDeleteUser = () => {
    setShowDeleteConfirmation(false); // Ẩn giao diện hỏi xóa
    setSelectedUser(null); // Reset thông tin user được chọn
  };


  return (
    <div className="w-full h-full">
      <div className="w-full">
        <div className={`flex items-center  justify-end`}>
          <button className="rounded-full bg-blue-800 p-1px">
            {" "}
            <div className="flex h-fit text-sm items-center bg-blue-800 border-2 border-white py-1 px-4 rounded-full text-white font-bold">
              <FaPlus className="mr-1" /> Mời thành viên
            </div>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap w-full">
        <MemberInfoBar number={users.length - pendingInvitationsCount} text={"Thành viên"} />
        <MemberInfoBar number={pendingInvitationsCount} text={"Lời mời đang xử lý"} class_name={"border-r-none"} />
      </div>
      <div className="w-80 mt-10 ml-3">
        <div className="flex max-w-72 items-center border-2 pt-1 pb-1 pl-4 pr-4 rounded-lg">
          <GrSearch size={20} />
          <input
            type="text"
            id="member_searchbar_input"
            placeholder="Tìm kiếm theo tên hoặc email"
            className="flex-1 h-8 pl-3 pr-2 text-base border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={handleSearchInputChange}
            value={searchQuery} />
        </div>
      </div>
      <div className="w-full m-7">
        <div className="grid grid-cols-3">
          <span className="col-span-1 text-gray-500">Tên</span>
          <span className="col-span-1 text-gray-500">Quyền</span>
          <span className="col-span-1 text-gray-500">Được mời bởi</span>
        </div>

        {filteredUsers.map((userData, index) => {
          const user = userData.user;
          const sender = senders[userData.invitation.senderUserId]; // Lấy thông tin sender từ state senders
          return (
            <div key={index} className="w-full" onClick={() => handleUserItemClick(user)}>
              <div className="w-full grid grid-cols-3 border-t-2 mt-3 pt-3">
                <div className="col-span-1">
                  <UserItem
                    firstname={user.firstname}
                    lastname={user.lastname}
                    avatarUrl={user.avatarUrl}
                    email={user.email}
                    color={user.color}
                  />
                </div>
                <div className="col-span-1">
                  {user.role}
                </div>
                <div className="col-span-1">
                  {sender ? (
                    <UserItem
                      firstname={sender.firstname}
                      lastname={sender.lastname}
                      avatarUrl={sender.avatarUrl}
                      email={sender.email}
                      color={sender.color}
                    />
                  ) : (
                    <div>Không được mời</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Giao diện hỏi xóa */}
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md z-50">
            <h2 className="text-xl font-bold mb-4">Xác nhận xóa</h2>
            <p className="mb-4">Bạn có chắc chắn muốn xóa?</p>
            <div className="flex justify-center">
              <button onClick={confirmDeleteUser} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-4">Xóa</button>
              <button onClick={cancelDeleteUser} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded">Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
