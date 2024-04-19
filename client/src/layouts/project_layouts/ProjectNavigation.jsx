import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  getAProject,
  getUserOfProject,
  updateProject,
} from "../../service/projectService";
import {
  MdMargin,
  MdCalendarMonth,
  MdListAlt,
  MdOutlineViewTimeline,
  MdTableChart,
  MdAttachFile,
  MdBrightness1,
} from "react-icons/md";
import { LuLineChart } from "react-icons/lu";
import Avatar from "../../components/Avatar";
import ColorSelector from "../../components/ColorSelector";
import { colorsArray } from "../../resource/color";
import { useDispatch } from "react-redux";
import { addNotification, updateColor } from "../../redux/store";
import Selection from "../../components/SingleSelector/Selection";
import { Item } from "../../components/SingleSelector/Item";
import { updateStatus } from "../../redux/store";
import { v4 as uuidv4 } from "uuid";

export default function (props) {
  // const { setAddMemberOpen, members, project } = props;
  const { setAddMemberOpen, members} = props;
  const { project_id, workspace_id } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState(project.color);
  const [status, setStatus] = useState(project.status);

  const dispatch = useDispatch();

  useEffect(() => {
    setColor(project.color);
  }, [project]);

  console.log(project)
  const updateColorAPI = (selectedColor) => {
    updateProject(
      project.name,
      project.description,
      selectedColor,
      project.status,
      project.due_date,
      workspace_id,
      project_id
    )
      .then((result) => {
        dispatch(updateColor({ project_id: project_id, color: selectedColor }));
        dispatch(
          addNotification({
            content: "Cập nhật thành công",
            type: "success",
            id: uuidv4,
          })
        );
      })
      .catch((error) => {
        dispatch(
          addNotification({
            content: "Cập nhật không thành công",
            type: "fail",
            id: uuidv4,
          })
        );

        console.log(error);
      });
  };

  const handleUpdateStatus = (status) => {
    updateProject(
      project.name,
      project.description,
      project.color,
      status,
      project.due_date,
      workspace_id,
      project_id
    )
      .then((result) => {
        dispatch(
          addNotification({
            content: "Cập nhật thành công",
            type: "success",
            id: uuidv4,
          })
        );
        dispatch(updateStatus({ project_id: project_id, status: status }));
      })
      .catch((error) => {
        dispatch(
          addNotification({
            content: "Cập nhật không thành công",
            type: "fail",
            id: uuidv4,
          })
        );
        console.log(error);
      });
  };

  return (
    <div className="w-full h-16 border-b-2 flex justify-between items-center px-2">
      <div className="flex items-center h-full">
        <button
          className={`size-10 relative ${colorsArray[color]} rounded-md`}
          onClick={(e) => setIsOpen(!isOpen)}
        >
          <ColorSelector
            color={color}
            setColor={setColor}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            updateColor={updateColorAPI}
          />
        </button>
        <div className="flex flex-col px-4 h-full justify-end">
          <span className="text-xl font-semibold flex items-center">
            {project ? project.name : ""}
            <Selection
              className="text-sm font-normal px-2 py-1"
              value={project.status}
              handleChange={(data) => handleUpdateStatus(data)}
              title="Trạng thái"
            >
              <Item data="on track" className="flex items-center">
                <MdBrightness1 className="mr-2 text-blue-500" />
                On track
              </Item>
              <Item data="at risk" className="flex items-center">
                <MdBrightness1 className="mr-2 text-red-500" />
                At risk{" "}
              </Item>
              <Item data="on hold" className="flex items-center">
                <MdBrightness1 className="mr-2 text-yellow-500" />
                On hold
              </Item>
              <Item data="completed" className="flex items-center">
                <MdBrightness1 className="mr-2 text-green-500" />
                Completed
              </Item>
            </Selection>
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
        <button
          onClick={(e) => setAddMemberOpen(true)}
          className="size-8 shadow-sm box-border border-2 border-gray-300 border-dashed rounded-full text-gray-300 mr-1"
        >
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
