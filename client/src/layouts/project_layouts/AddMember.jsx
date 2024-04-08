import { useEffect, useState } from "react";
import {MdClose} from "react-icons/md"
import { getUserOfWorkspace } from "../../service/workspaceService";
import { useParams } from "react-router-dom";
import UserItem from "../../components/UserItem";

export default function (props) {
  const { isOpen, setIsOpen, members, setMembers } = props;
  const { workspace_id } = useParams();

  const [membersOfWorkspace, setMemberOfWorkspace] = useState([]);

  useEffect(() => {
    if (isOpen) {
      getUserOfWorkspace(workspace_id)
        .then((result) => {
          const filteredMembers = result.data.users.filter(
            (value) => !members.map(member=>member.user_id).includes(value.user.user_id)
            );
            console.table(filteredMembers);
          setMemberOfWorkspace(filteredMembers);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isOpen]);

  return (
    <div
      className={`w-full h-full absolute bg-gray-300 bg-opacity-50 top-0 left-0 z-10 flex justify-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="w-120 h-100 bg-white rounded-3xl opacity-100 mt-40 flex flex-col items-center p-8">
        <button
          className="self-end mb-4 text-gray-400"
          onClick={(e) => setIsOpen(false)}
        >
          <MdClose size={30} />
        </button>
        <input
          type="text"
          className="border-2 border-gray-400 rounded-md h-10 w-full px-2"
          placeholder="Tên hoặc email"
        />
        <div className="w-full py-4 overflow-hidden flex flex-col">
          {membersOfWorkspace.length > 0 ? 
            membersOfWorkspace.map((value, index) => (
              <div className="w-full mb-4 flex justify-between items-center">
                <UserItem firstname={value.user.firstname} lastname={value.user.lastname} avatarUrl={value.user.avatar_url} color={value.user.color} email={value.user.user_account.email} />
                <button className="bg-blue-700 h-fit py-1 px-2 text-white font-semibold rounded-md">Thêm</button>
              </div>
            ))
           : 
            <div className="size-50 text-gray-400">Tất cả thành viên trong workspace đã được thêm vào dự án</div>
          }
        </div>
      </div>
    </div>
  );
}
