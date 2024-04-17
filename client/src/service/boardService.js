import axios from "axios"

export const getBoardsOfProject = (workspace_id, project_id) => {
  return axios.get(`http://localhost:8080/v1/workspaces/${workspace_id}/projects/${project_id}/boards`)
}

export const addBoardToProject = (workspace_id, project_id, board) => {
  return axios.post(`http://localhost:8080/v1/workspaces/${workspace_id}/projects/${project_id}/boards`, board)
}

export const deleteBoard = (workspace_id, project_id, board_id)=>{
  return axios.delete(`http://localhost:8080/v1/workspaces/${workspace_id}/projects/${project_id}/boards/${board_id}`)
}

export const updateBoard = (workspace_id, project_id, board_id,board_name)=>{
  return axios.put(`http://localhost:8080/v1/workspaces/${workspace_id}/projects/${project_id}/boards/${board_id}`, {board_name: board_name})
}

export const changeBoardOdering = (workspace_id, project_id, new_previous_id, board_id, previous_board_id)=>{
  const data = {
    "new_previous_id": new_previous_id,
    "board_id": board_id,
    "previous_board_id": previous_board_id
  }
  console.log(data)
  return axios.put(`http://localhost:8080/v1/workspaces/${workspace_id}/projects/${project_id}/boards/${board_id}/workflow`, data)
}

