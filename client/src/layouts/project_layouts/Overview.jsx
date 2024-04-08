import { useState, useEffect } from "react";
import {
  getAProject,
  getUserOfProject,
  updateProject,
} from "../../service/projectService";
import { useParams } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import Member from "../../components/Member";
import { useDispatch } from "react-redux";
import { updateInfo } from "../../redux/store";

export default function (props) {
  const { setAddMemberOpen, members, project } = props;

  const { project_id, workspace_id } = useParams();

  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);

  const dispatch = useDispatch();

  const inputCss = "border-2 p-4 rounded-xl mb-4";
  const labelCss = "font-semibold text-xl mb-2";



  const handleSaveProject = () => {
    updateProject(name, description, project.color, workspace_id, project_id)
      .then((result) => {
        alert("cap nhat thanh cong");
        dispatch(
          updateInfo({
            project_id: project_id,
            name: name,
            description: description,
          })
        );
      })
      .catch((error) => {
        alert("khong thanh cong");
        console.log(error);
      });
  };

  return (
    <div className="px-60 pt-20 flex flex-col box-border h-auto">
      <label className={labelCss} htmlFor="name">
        Tên dự án
      </label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputCss}
      />
      <label className={labelCss} htmlFor="description">
        Mô tả
      </label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        className={inputCss}
      ></textarea>
      <button
        onClick={(e) => {
          handleSaveProject();
        }}
        className="self-end text-xl font-semibold py-2 px-4 text-white bg-blue-700 rounded-md"
      >
        Lưu
      </button>
      <div className="h-1px w-full bg-gray-200 my-4"></div>
      <label className={labelCss}>Thành viên</label>
      <div className="flex flex-col border-2 border-gray-200 rounded-xl min-h-72 mb-20 p-8">
        <button onClick={e=>setAddMemberOpen(true)} className="border-2 border-dashed size-fit p-2 rounded-full border-gray-400 text-gray-400 hover:border-black hover:text-black">
          <BiPlus size={25} />
        </button>
        {members.length > 0 ? (
          members.map((value) => {
            return (
              <Member
                firstname={value.firstname}
                lastname={value.lastname}
                avatarUrl={value.avatar_url}
                email={value.email}
                color={value.color}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
