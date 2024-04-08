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

export const updateProject = (name, description, color, workspace_id, project_id)=>{
  const data = {
    "name": name,
    "description": description,
    "color": color
  }
  return axios.put(`http://localhost:8080/v1/workspaces/${workspace_id}/projects/${project_id}`, data)
}