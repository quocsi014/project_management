import { useEffect, useState, useRef } from "react";
import { BiPlus, BiTrash } from "react-icons/bi";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { MdDragIndicator } from "react-icons/md";
import { deleteBoard } from "../../../service/boardService";
import Task from "./Task";
import { add } from "date-fns";
import { addTask } from "../../../service/taskService";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNotification } from "../../../redux/store";
import {v4 as uuidv4} from 'uuid'

  export default function (props) {
    const { board, handleDeleteBoard, handleUpdateBoard, setBoards } = props;
    const [tasks, setTasks] = useState([]);
    const [boardName, setBoardName] = useState(board.name);
    const [newTaskName, setNewTaskName] = useState("")
    const [addTaskOpened, setAddTaskOpened] = useState(false)
    const addTaskRef = useRef(null)
    const {workspace_id, project_id} = useParams()
    const dispatch = useDispatch()

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: board.board_id,
      });
    const style = {
      transform: CSS.Translate.toString(transform),
      transition,
    };

    useEffect(()=>{
      setTasks(board.tasks)
    }, [board])
  

    const handleInputEnter = (e) => {
      if (e.keyCode != 13) {
        return;
      }
      handleUpdateBoard(board.board_id, boardName);
    };

    const handleAddTask = (e)=>{
      if(e.keyCode != 13){
        return
      }

      if(newTaskName == ""){
        return
      }

      addTask(workspace_id, project_id, board.board_id, newTaskName)
      .then(result=>{
        setTasks([...tasks, result.data.Task])
        dispatch(
          addNotification({
            content: "Thêm thành công",
            id: uuidv4(),
            type: "success",
          })
        );
      })
      .catch(error=>{
        console.log(error)
        dispatch(
          addNotification({
            content: "Thêm không thành công",
            id: uuidv4(),
            type: "fail",
          })
        );
      })
      .finally(()=>{
        setNewTaskName("")
      })
    }

    useEffect(() => {
      if (addTaskOpened && addTaskRef.current) {
        addTaskRef.current.focus();
      }
    }, [addTaskOpened]);

    const handleOpenAddTask = ()=>{
      setAddTaskOpened(!addTaskOpened)
      setNewTaskName("")
    }

    


    return (
      <div
        className="h-full w-72 bg-gray-50 shrink-0 bg-transparent rounded-lg py-2 px-4  border-transparent border-2 box-border"
        ref={setNodeRef}
        style={style}
        {...attributes}
      >
        <div className="flex justify-between items-center w-full" title="move">
          <div {...listeners} className="w-fit">
            <MdDragIndicator />
          </div>
          <input
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            onKeyDown={(e) => handleInputEnter(e)}
            className="bg-transparent w-full box-border pl-2 border-transparent truncate focus:border-gray-400 outline-none border-2 rounded-md"
          />
          <div className="w-fit flex">
            <button className="mr-2" title="Thêm công việc" onClick={e=>handleOpenAddTask(e)}>
              <BiPlus />
            </button>
            <button
            onClick={() => {
              handleDeleteBoard(board.board_id);
            }}
            >
              <BiTrash />
            </button>
          </div>
        </div>


        <div
          className={`w-full ${tasks.length>0? "bg-transparent":"bg-gray-100"} h-full rounded-xl mt-2 ${
            tasks.length ? "" : "p-2"
          }`}
        >
          {
            tasks.map(task=>{
              return <Task task={task} setBoards = {setBoards}/>
            })
          }
          <div className={addTaskOpened?"block":"hidden"} id = 'add_task_section'>
            <input ref={addTaskRef} type="text" className="w-full bg-white py-2 px-4 rounded-lg mb-3 border-2 outline-none" value={newTaskName} onChange={e=>setNewTaskName(e.target.value)} placeholder="Task name" onBlur={e=>{setAddTaskOpened(false); setNewTaskName("")}} onKeyDown={e=>handleAddTask(e)} />
          </div>
          <button className="flex items-center w-full justify-center py-2 text-gray-500 rounded-md hover:bg-gray-200" onClick={(e)=>handleOpenAddTask()}>
            <BiPlus />
            Thêm công việc
          </button>
        </div>
      </div>
    );
  }
