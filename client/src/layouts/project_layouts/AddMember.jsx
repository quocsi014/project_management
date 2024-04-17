import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { getUserOfWorkspace } from "../../service/workspaceService";
import { useParams } from "react-router-dom";
import UserItem from "../../components/UserItem";
import { addMemberToProject } from "../../service/projectService";
import { useDispatch } from "react-redux";
import { addNotification } from "../../redux/store";
import {v4 as uuidv4} from 'uuid'

export default function (props) {
  const { isOpen, setIsOpen, members, setMembers } = props;
  const { workspace_id, project_id } = useParams();
  const dispatch = useDispatch();
  const [membersOfWorkspace, setMemberOfWorkspace] = useState([]);
  const [matchMembers, setMatchMembers] = useState([])
  const [keyword, setKeyword] = useState("")

  useEffect(() => {
    if (isOpen) {
      getUserOfWorkspace(workspace_id)
        .then((result) => {
          console.log(result);
          const filteredMembers = result.data.users.filter(
            (value) =>
              !members
                .map((member) => member.user_id)
                .includes(value.user.user_id)
          );
          setMemberOfWorkspace(filteredMembers);
          setMatchMembers(filteredMembers);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isOpen, members]);

  

  const handleAddCollaborator = (user) => {
    addMemberToProject(workspace_id, project_id, user.user_id, "Thành viên")
      .then((result) => {
        setMembers([...members, user]);
        dispatch(addNotification({content:"Thêm thành công", id: uuidv4(), type: "success"}))
      })
      .catch((error) => {
        dispatch(addNotification({content:"Thêm không thành công", id: uuidv4(), type: "fail"}))

        console.log(error);
      });
  };

  const handleFindUser = (e)=>{
    let newKeyword = e.target.value
    setKeyword(newKeyword)
    if(newKeyword == ""){
      setMatchMembers(membersOfWorkspace)
      return
    }
    let newMatchMembers = membersOfWorkspace.filter(value=>{
      let name = value.user.firstname +" "+ value.user.lastname
      return name.includes(newKeyword) || value.user.email.includes(newKeyword) 
    })

    setMatchMembers(newMatchMembers)
  }

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
          value={keyword}
          onChange={e=>handleFindUser(e)}
        />
        <div className="w-full py-4 overflow-hidden flex flex-col">
          {matchMembers.length > 0 ? (
            matchMembers.map((value, index) => (
              <div className="w-full mb-4 flex justify-between items-center">
                <UserItem
                  firstname={value.user.firstname}
                  lastname={value.user.lastname}
                  avatarUrl={value.user.avatar_url}
                  color={value.user.color}
                  email={value.user.email}
                />
                <button
                  className="bg-blue-700 h-fit py-1 px-2 text-white font-semibold rounded-md"
                  onClick={() => {
                    handleAddCollaborator(value.user);
                  }}
                >
                  Thêm
                </button>
              </div>
            ))
          ) : (
            <div className="size-50 text-gray-400">
              Tất cả thành viên trong workspace đã được thêm vào dự án
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
