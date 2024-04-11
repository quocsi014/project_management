import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getAProject, getUserOfProject, updateProject } from "../../service/projectService";
import {
  MdMargin,
  MdCalendarMonth,
  MdListAlt,
  MdOutlineViewTimeline,
  MdTableChart,
  MdAttachFile
} from "react-icons/md";
import { LuLineChart } from "react-icons/lu";
import Avatar from "../../components/Avatar";
import ColorSelector from "../../components/ColorSelector";
import { colorsArray } from "../../resource/color";
import { useDispatch } from "react-redux";
import { updateColor } from "../../redux/store";
export default function (props) {
  const {setAddMemberOpen, members, project} = props

  const { project_id, workspace_id } = useParams();
  
  const [isOpen, setIsOpen] = useState(false)
  const [color, setColor] = useState(0)

  const dispatch = useDispatch()

  


  const updateColorAPI = selectedColor=>{
    updateProject(project.name, project.description,selectedColor, workspace_id, project_id)
    .then(result=>{
      alert("cap nhat thanh cong")
      dispatch(updateColor({project_id: project_id, color: selectedColor}))
    })
    .catch(error=>{
      alert("khong thanh cong")
      console.log(error)
    })
  }

  return (
    <div className="w-full h-16 border-b-2 flex justify-between items-center px-2">
      <div className="flex items-center h-full">
        <button className={`size-10 relative ${colorsArray[color]} rounded-md`} onClick={e=>setIsOpen(!isOpen)}>
          <ColorSelector color={color} setColor={setColor} isOpen={isOpen} setIsOpen={setIsOpen} updateColor={updateColorAPI}/>
        </button>
        <div className="flex flex-col px-4 h-full justify-end">
          <span className="text-xl font-semibold">
            {project ? project.name : ""}
          </span>
          <div className="flex items-center">
            <NavLink
              to={`/${workspace_id}/${project_id}/overview`}
              className="mr-8"
              
            >
              {({ isActive }) => (
                <div
                  className={`flex items-center ${
                    isActive ? "text-black font-semibold" : "text-gray-500"
                  }`}
                >
                  <MdMargin></MdMargin>Chung
                </div>
              )}
            </NavLink>

            <NavLink
              to={`/${workspace_id}/${project_id}/list`}
              className="mr-8"
            >
              {({ isActive }) => (
                <div
                  className={`flex items-center ${
                    isActive ? "text-black font-semibold" : "text-gray-500"
                  }`}
                >
                  <MdListAlt></MdListAlt>Danh sách
                </div>
              )}
            </NavLink>

            <NavLink
              to={`/${workspace_id}/${project_id}/kanban`}
              className="mr-8"
            >
              {({ isActive }) => (
                <div
                  className={`flex items-center ${
                    isActive ? "text-black font-semibold" : "text-gray-500"
                  }`}
                >
                  <MdTableChart></MdTableChart>Bảng
                </div>
              )}
            </NavLink>

            <NavLink
              to={`/${workspace_id}/${project_id}/timeline`}
              className="mr-8"
            >
              {({ isActive }) => (
                <div
                  className={`flex items-center ${
                    isActive ? "text-black font-semibold" : "text-gray-500"
                  }`}
                >
                  <MdOutlineViewTimeline></MdOutlineViewTimeline>Timeline
                </div>
              )}
            </NavLink>

            <NavLink
              to={`/${workspace_id}/${project_id}/calendar`}
              className="mr-8"
            >
              {({ isActive }) => (
                <div
                  className={`flex items-center ${
                    isActive ? "text-black font-semibold" : "text-gray-500"
                  }`}
                >
                  <MdCalendarMonth></MdCalendarMonth>Lịch
                </div>
              )}
            </NavLink>

            <NavLink
              to={`/${workspace_id}/${project_id}/report`}
              className="mr-8"
            >
              {({ isActive }) => (
                <div
                  className={`flex items-center ${
                    isActive ? "text-black font-semibold" : "text-gray-500"
                  }`}
                >
                  <LuLineChart></LuLineChart>Thống kê
                </div>
              )}
            </NavLink>

            <NavLink
              to={`/${workspace_id}/${project_id}/file`}
              className="mr-8"
            >
              {({ isActive }) => (
                <div
                  className={`flex items-center ${
                    isActive ? "text-black font-semibold" : "text-gray-500"
                  }`}
                >
                  <MdAttachFile></MdAttachFile>Tài liệu
                </div>
              )}
            </NavLink>
          </div>
        </div>
      </div>
      <div className="flex mr-20 items-center">
        <button onClick={e=>setAddMemberOpen(true)} className="size-8 shadow-sm box-border border-2 border-gray-300 border-dashed rounded-full text-gray-300 mr-1">
          +
        </button>
        {members.map((value) => {
          return (
            <Avatar
            key={value.user_id}
              size="size-8"
              color={value.color}
              firstName={value.firstname}
              lastName={value.lastname}
            />
          );
        })}
      </div>
    </div>
  );
}
