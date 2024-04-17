import { BiCheckCircle, BiUser, BiCalendar } from "react-icons/bi";
import Avatar from "../../../components/Avatar";
import { useDispatch } from "react-redux";
import { setDetailTask, updateTaskRedux } from "../../../redux/store";
import { updateStatusOfTask } from "../../../service/taskService";
import { useParams } from "react-router-dom";

export default function (props) {
  const { task } = props;
  const dispatch = useDispatch();
  const { workspace_id, project_id } = useParams();
  const handleShowDetailTask = () => {
    dispatch(setDetailTask({ isOpen: true, task: task }));
  };
  const handleUpdateStatus = (e) => {
    updateStatusOfTask(
      workspace_id,
      project_id,
      task.task_id,
      task.status == 0 ? 1 : 0
    )
      .then((result) => {
        dispatch(
          updateTaskRedux({
            task: { task_id: task.task_id, status: task.status == 0 ? 1 : 0 },
            board_id: task.board_id,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      })
      e.stopPropagation()
  };

  return (
    <div
      className={`w-full bg-white hover:bg-gray-50 py-2 px-4 rounded-lg mb-3 border-2 ${
        task.status == 1 ? "opacity-30" : ""
      }`}
      onClick={(e) => handleShowDetailTask()}
    >
      <div className="flex items-center mb-2 ">
        {" "}
        <button
          className={`${
            task.status == 0
              ? "text-gray-200 hover:text-gray-400"
              : "text-green-500"
          }`}
          onClick={(e) => handleUpdateStatus(e)}
        >
          <BiCheckCircle className="mr-2" size={22} />
        </button>{" "}
        {task.task_name}
      </div>
      <div className="flex items-center">
        {" "}
        <button
          className={`mr-2 rounded-full ${
            !task.assigned_user?.user_id
              ? "border-2 border-dashed p-0.5 hover:text-gray-400 hover:border-gray-400 text-gray-200 border-gray-200"
              : ""
          }`}
        >
          {task.assigned_user?.user_id ? (
            <Avatar
              firstName={task.assigned_user.firstname}
              size={"size-6"}
              lastName={task.assigned_user.lastname}
              color={task.assigned_user.color}
              avatarUrl={task.assigned_user.avatar_url}
            />
          ) : (
            <BiUser size={18} />
          )}
        </button>{" "}
        <button
          className={`${
            !task.end_date
              ? "border-2 border-dashed hover:text-gray-400 hover:border-gray-400 text-gray-200 border-gray-200 rounded-full p-0.5"
              : "hover:bg-gray-100 px-2 rounded-lg"
          }`}
        >
          {task.end_date ? task.end_date : <BiCalendar size={18} />}
        </button>
      </div>
    </div>
  );
}
