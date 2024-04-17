import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BiArrowToRight,
  BiCheckCircle,
  BiLink,
  BiExpandAlt,
  BiTrash,
  BiCalendar,
  BiUser,
} from "react-icons/bi";
import { MdAttachFile } from "react-icons/md";
import { setOpened } from "../redux/store";
import Avatar from "./Avatar";

export default function (props) {
  const isOpen = useSelector((state) => state.detailtask.isOpen);
  const task = useSelector((state) => state.detailtask.task);
  const [newTaskName, setNewTaskName] = useState(task?.task_name || "");
  const dispatch = useDispatch();
  console.log(task);
  const rowTableCss = "w-fit min-w-32  pl-2 pb-8";

  function formatDate(date) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  useEffect(() => {
    setNewTaskName(task?.task_name);
  }, [task]);

  return (
    <div
      className={`h-full flex flex-col box-border items-start bg-white border-l-2 transition-all duration-300 ${
        isOpen ? "w-200" : "w-0 overflow-hidden"
      }`}
    >
      <div className="w-full flex justify-between text-gray-300 px-4 py-1.5 overflow-hidden">
        <button
          className={`text-nowrap flex items-center border-2 px-2 rounded-md text-sm ${
            task?.status == 1 ? "text-green-500 border-green-500" : ""
          }`}
        >
          <BiCheckCircle size={20} className="mr-2" />
          hoàn thành
        </button>
        <div className="flex items-center">
          <button className="hover:text-gray-400 mr-4 rounded-lg border-gray-100">
            <MdAttachFile size={25} />
          </button>
          <button className="hover:text-gray-400 mr-4 rounded-lg border-gray-100">
            <BiExpandAlt size={25} />
          </button>
          <button className="hover:text-gray-400 mr-4 rounded-lg border-gray-100">
            <BiLink size={25} />
          </button>
          <button className="hover:text-red-500 text-red-200 mr-4  rounded-lg border-gray-100">
            <BiTrash size={25} />
          </button>

          <button
            className="text-gray-500"
            onClick={(e) => dispatch(setOpened({ isOpen: false }))}
          >
            <BiArrowToRight size={30} />
          </button>
        </div>
      </div>

      <div className="w-full h-1px bg-gray-200"></div>

      {task ? (
        <div className="p-4 w-full">
          <input
            type="text"
            className="text-2xl outline-none border-2 focus:border-gray-200 border-transparent w-full px-2 py-2 rounded-lg"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
          <table className="mt-4 text-sm">
            <tr>
              <td className={rowTableCss}>Assignee</td>
              <td className={rowTableCss}>
                <button className="flex items-center hover:bg-gray-300 text-gray-300 hover:text-white rounded-md p-1">
                  {task.assigned_user.user_id ? (
                    <>
                      <Avatar
                        firstName={task.assigned_user.firstname}
                        size={"size-6"}
                        className="mr-2"
                        lastName={task.assigned_user.lastname}
                        color={task.assigned_user.color}
                        avatarUrl={task.assigned_user.avatar_url}
                      />
                      {task.assigned_user.user_account.email}
                    </>
                  ) : (
                    <>
                      <BiUser className="mr-2 border-2 rounded-full border-gray-300 border-dashed size-8 p-0.5" />
                      phân công
                    </>
                  )}
                </button>
              </td>
            </tr>
            <tr>
              <td className={rowTableCss}>Ngày kết thúc</td>
              <td className={rowTableCss}>
                <button className="flex items-center hover:bg-gray-300 text-gray-300 hover:text-white rounded-md p-1">
                  <BiCalendar className="mr-2 border-2 rounded-full border-dashed size-8 p-0.5 border-gray-300"></BiCalendar>{" "}
                  {task.end_date
                    ? <span className={`${new Date(task.end_date) > new Date()?"text-black":"text-red-500"}`}>{formatDate(new Date(task.end_date))}</span>
                    : "chọn ngày"}
                </button>
              </td>
            </tr>
            <tr>
              <td className={rowTableCss}>Bảng</td>
              <td className={rowTableCss}></td>
            </tr>
          </table>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
