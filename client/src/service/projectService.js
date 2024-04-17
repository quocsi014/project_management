import axios from "axios";

export const getProjectOfUser = (workspace_id, user_id) => {
  return axios.get(
    `http://localhost:8080/v1/users/${user_id}/workspaces/${workspace_id}/projects`
  );
};

export const getAProject = (workspace_id, project_id) => {
  return axios.get(
    `http://localhost:8080/v1/workspaces/${workspace_id}/projects/${project_id}`
  );
}


export const getUserOfProject = (workspace_id, project_id) => {
  return axios.get(
    `http://localhost:8080/v1/workspaces/${workspace_id}/projects/${project_id}/members`
  );
}

export const updateProject = (name, description, color, projectStatus, dueDate, workspace_id, project_id)=>{
  const data = {
    "name": name,
    "description": description,
    "color": color,
    "status": projectStatus,
    "due_date": dueDate
  }
  console.log(dueDate)
  return axios.put(`http://localhost:8080/v1/workspaces/${workspace_id}/projects/${project_id}`, data)
}

export const getActivitiesOfProject = (workspace_id, project_id) => {
  return axios.get(`http://localhost:8080/v1/workspaces/${workspace_id}/projects/${project_id}/activities`)
}

export const addMemberToProject = (workspace_id, project_id, user_id, role)=>{
  const body = {
    user_id, role
  }
  return axios.post(`http://localhost:8080/v1/workspaces/${workspace_id}/projects/${project_id}/members`, body)
}

export const removeMember = (workspace_id, project_id, user_id) =>{
  return axios.delete(`http://localhost:8080/v1/workspaces/${workspace_id}/projects/${project_id}/members/${user_id}`)
}

