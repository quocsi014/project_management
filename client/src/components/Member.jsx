
import { useParams } from "react-router-dom";
import UserItem from "./UserItem";
import { removeMember } from "../service/projectService";

export default function (props) {
  const { firstname, lastname, avatarUrl, email, role, color, user_id, members, setMembers } = props;
  const {workspace_id, project_id} = useParams() 

  const handleRemoveMember = ()=>{
    removeMember(workspace_id, project_id, user_id)
    .then(result=>{
      alert('thanh cong')
      let newMembers = members.filter(member=>{
        return member.user_id != user_id 
      })
      setMembers(newMembers)
    })
    .catch(error =>{
      alert('that bai')
      console.log(error)
    })
  }



  return (
    <div className="flex items-center justify-between mt-2 border-t-2 pt-2">
      <UserItem firstname={firstname} lastname={lastname} avatarUrl={avatarUrl} email={email} color={color} />
      <div>
      <select name="role" id="role" className="bg-white border-2 border-gray-200 py-1 px-2 rounded-md focus:border-blue-700 outline-none">
        <option value="leader">Leader</option>
        <option value="member">Thành viên</option>
      </select>
      
        <button className="px-2 py-1 ml-1 text-sm bg-gray-300 hover:bg-slate-600 rounded-md border-2 " onClick={e=>handleRemoveMember()}>remove</button>
      </div>
    </div>
  );
}
