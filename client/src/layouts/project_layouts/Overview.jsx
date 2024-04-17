import { useState, useEffect } from "react";
import {
  getAProject,
  getActivitiesOfProject,
  getUserOfProject,
  updateProject,
} from "../../service/projectService";
import { useParams } from "react-router-dom";
import { BiPlus, BiCalendar } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import Member from "../../components/Member";
import { useDispatch } from "react-redux";
import { updateInfo } from "../../redux/store";
import TimePoint from "../../components/TimePoint";
import { DayPicker } from "react-day-picker";
import "react-day-picker/src/style.css";
import { addNotification } from "../../redux/store";
import {v4 as uuidv4} from 'uuid';
export default function (props) {
  const { setAddMemberOpen, members, project, setMembers } = props;

  const { project_id, workspace_id } = useParams();

  const [name, setName] = useState(project.name);
  const [activities, setActivities] = useState([]);
  const [description, setDescription] = useState(project.description);
  const [dueDate, setDueDate] = useState(new Date(project.due_date));
  const [showCalendar, setShowCalendar] = useState(false);

  const dispatch = useDispatch();
  

  const inputCss = "border-2 p-4 rounded-xl mb-4";
  const labelCss = "font-semibold text-xl mb-2";
  useEffect(() => {
    getActivitiesOfProject(workspace_id, project_id)
      .then((result) => {
        setActivities(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [members]);

  const getMember = (id) => {
    members.forEach((value) => {
      if (value.user_id == id) {
        return value;
      }
    });
  };

  const handleSaveProject = () => {
    updateProject(
      name,
      description,
      project.color,
      project.status,
      project.due_date,
      workspace_id,
      project_id
    )
      .then((result) => {
        dispatch(addNotification({content:"Cập nhật thành công", id: uuidv4(), type: "success"}))
        dispatch(
          updateInfo({
            project_id: project_id,
            name: name,
            description: description,
          })
        );
      })
      .catch((error) => {
        dispatch(addNotification({content:"Cập nhật không thành công", id: uuidv4(), type: "fail"}))

        console.log(error);
      });
  };

  const handleUpdateDueDate = (date) => {
    if (date.toLocaleDateString() == dueDate.toLocaleDateString()) {
      return;
    }
    updateProject(
      name,
      description,
      project.color,
      project.status,
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      workspace_id,
      project_id
    )
    .then((result) => {
      setShowCalendar(false);
      setDueDate(date);
      dispatch(addNotification({content:"Cập nhật thành công", id: uuidv4(), type: "success"}))
      
    })
    .catch(error=>{
      console.log(error)
      dispatch(addNotification({content:"Cập nhật không thành công", id: uuidv4(), type: "fail"}))

    })
  };

  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className="w-full h-full overflow-y-auto">
        <div className="px-40 pt-20 w-full flex flex-col box-border">
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
            <button
              onClick={(e) => setAddMemberOpen(true)}
              className="border-2 border-dashed size-fit p-2 rounded-full border-gray-400 text-gray-400 hover:border-black hover:text-black"
            >
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
                    user_id={value.user_id}
                    members={members}
                    setMembers = {setMembers}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>


      </div>
      <div className="w-120 border-l-2 py-3 px-4">
        <h3 className="text-xl font-semibold">Hoạt động</h3>

        <div className="mt-10 h-120  overflow-auto">
          <div className="flex">
            <div className="flex flex-col items-center">
              <div className="">
                <BiCalendar className="text-gray-500 size-6" />
              </div>
              <div className="w-1px h-14 bg-gray-500"></div>
            </div>
            <div className={`flex items-start flex-col ml-2 `}>
              <span>Ngày kết thúc</span>
              <div
                onClick={() => {
                  setShowCalendar(!showCalendar);
                }}
                className={`flex items-end border-2 px-2 rounded-md cursor-pointer ${
                  dueDate < new Date() ? "text-red-500 border-red-500" : ""
                }`}
              >
                <span>{dueDate.toLocaleDateString()}</span>{" "}
                <MdKeyboardArrowDown className="size-6 ml-2" />
              </div>
              <div className="relative">
                <DayPicker
                  mode="single"
                  selected={dueDate}
                  onSelect={(date) => handleUpdateDueDate(date)}
                  className={`border-2 border-gray-600 rounded-lg  top-0, left-0 z-50 bg-white m-0 mt-2 absolute ${
                    showCalendar ? "" : "hidden"
                  }`}
                />
              </div>
            </div>
          </div>
          {activities.map((value) => {
            return <TimePoint activity={value} line={true}></TimePoint>;
          })}
          <TimePoint
            activity={{ type: "create", create_at: project.create_at }}
          />
        </div>
        
      </div>
    </div>
  );
}
