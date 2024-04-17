import { useEffect, useState } from "react";
import {
  addBoardToProject,
  changeBoardOdering,
  deleteBoard,
  getBoardsOfProject,
  updateBoard,
} from "../../../service/boardService";
import { useParams } from "react-router-dom";
import Board from "./Board";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addBoardRedux, addNotification, deleteBoardRedux, setBoards, updateBoardNameRedux } from "../../../redux/store";
import { DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { getTaskOfProject, updateStatusOfTask } from "../../../service/taskService";

export default function () {
  const boards = useSelector(state=>state.board.boards);
  const { workspace_id, project_id } = useParams();
  const [newBoardName, setNewBoardName] = useState("");
  const dispatch = useDispatch();


  const reGetBoardsOfProject = ()=>{
    getBoardsOfProject(workspace_id, project_id)
    .then((result) => {
      const boardsArray = result.data.map((board) => {
        return { ...board, tasks: [] };
      });
      const boardsID = result.data.map((board) => board.board_id);
      getTaskOfProject(workspace_id, project_id)
        .then((result) => {
          console.log(result);
          result.data.forEach((task, index) => {
            boardsArray[boardsID.indexOf(task.board_id)]?.tasks.push(task);
          });
          dispatch(setBoards({boards: boardsArray}))
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  const handleAddBoard = (e) => {
    if (e.keyCode != 13) {
      return;
    }
    e.preventDefault();
    const board = {
      board_name: newBoardName,
      previous_board_id: boards[boards.length - 1]?.board_id,
      next_board_id: null,
    };
    addBoardToProject(workspace_id, project_id, board)
      .then((result) => {
        dispatch(addBoardRedux({board: {...result.data.board, tasks:[]}}))
        setNewBoardName("");
        dispatch(
          addNotification({
            content: "Thêm thành công",
            id: uuidv4(),
            type: "success",
          })
        );
      })
      .catch((error) => {
        dispatch(
          addNotification({
            content: "Thêm không thành công",
            id: uuidv4(),
            type: "fail",
          })
        );
        console.log(error);
      });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id == over.id) {
      return;
    }

    const oldIndex = boards.findIndex((board) => board.board_id == active.id);

    const newIndex = boards.findIndex((board) => board.board_id == over.id);

    changeBoardOdering(
      workspace_id,
      project_id,
      oldIndex > newIndex
        ? boards[newIndex].previous_board_id
        : boards[newIndex].board_id,
      active.id,
      boards[oldIndex].previous_board_id
    )
      .then((result) => {
        reGetBoardsOfProject()
        dispatch(
          addNotification({
            content: "Cập nhật thành công",
            id: uuidv4(),
            type: "success",
          })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          addNotification({
            content: "Cập nhật không thành công",
            id: uuidv4(),
            type: "fail",
          })
        );
      });
  };

  const handleDeleteBoard = (board_id) => {
    deleteBoard(workspace_id, project_id, board_id)
      .then((result) => {
        dispatch(
          addNotification({
            content: "Xóa thành công",
            id: uuidv4(),
            type: "success",
          })
        );
        dispatch(deleteBoardRedux({board_id: board_id}))
      })
      .catch((error) => {
        dispatch(
          addNotification({
            content: "Xóa không thành công",
            id: uuidv4(),
            type: "fail",
          })
        );
        console.log(error);
      });
  };

  

  const handleUpdateBoard = (board_id, new_board_name) => {
    updateBoard(workspace_id, project_id, board_id, new_board_name)
      .then((result) => {
        dispatch(
          addNotification({
            content: "Cập nhật thành công",
            id: uuidv4(),
            type: "success",
          })
        );
        
        dispatch(updateBoardNameRedux({board_id: board_id, name: new_board_name}))
      })
      .catch((error) => {
        dispatch(
          addNotification({
            content: "Cập nhật không thành công",
            id: uuidv4(),
            type: "success",
          })
        );
      });
  };




  return (
    <div className="w-full p-4 flex h-full bg-gray-100 overflow-x-auto box-border">
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext
          items={boards.map((board) => board.board_id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex h-full">
            {boards.map((board) => {
              return (
                <>
                  <Board
                    key={board.board_id}
                    board={board}
                    handleDeleteBoard={handleDeleteBoard}
                    handleUpdateBoard={handleUpdateBoard}
                  />
                  <div className="h-full w-1 bg-gray-100"></div>
                </>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
      <div className="h-full w-72 mr-4 bg-white shrink-0 bg-transparent rounded-lg py-2 px-4 hover:border-gray-100 border-transparent border-2 box-border ">
        <div className="flex justify-between">
          <input
            type="text"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            onKeyDown={(e) => handleAddBoard(e)}
            placeholder="+ Thêm bảng"
            className="bg-transparent w-full pl-2 focus:border-gray-400 outline-none border-2 border-transparent rounded-md"
          />
        </div>
        <div className={`w-full bg-gray-100 h-full rounded-xl mt-2 `}></div>
      </div>
    </div>
  );
}
