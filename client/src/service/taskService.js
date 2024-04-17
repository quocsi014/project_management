import axios from "axios";

// export const getTaskOfProject = (workspace_id, project_id) => {
//   return axios.get(
//     `http://localhost:8080/v1/workspaces/${workspace_id}/projects/${project_id}/tasks`
//   );
// };

export const addTask = (workspace_id, project_id, board_id, task_name) => {
  return axios.post(
    `http://localhost:8080/v1/workspaces/${workspace_id}/projects/${project_id}/tasks`,
    { board_id, task_name }
  );
};

export const updateStatusOfTask = (
  workspace_id,
  project_id,
  task_id,
  status
) => {
  return axios.put(
    `http://localhost:8080/v1/workspaces/${workspace_id}/projects/${project_id}/tasks/${task_id}/status`,
    { status: status }
  );
};


export const getTaskOfProject = (workspace_id, project_id, status, start_date, end_date, assignee_id) => {
  return axios.get(`http://localhost:8080/v1/workspaces/${workspace_id}/projects/${project_id}/tasks`, {
    params: {
      staus: status,
      start_date: start_date,
      end_date: end_date,
      assignee_id: assignee_id
    }
  });
};

export const updateTask = (workspace_id, project_id, task_id, task_name, start_date, end_date, status) => {
  const taskData = {
    "task_id": task_id,
    "task_name": task_name,
    "description": null,
    "project_id": project_id,
    "assigned_user": null,
    "board_id": null,
    "start_date": start_date,
    "end_date": end_date,
    "status": status
  }
  return axios.put(`http://localhost:8080/v1/workspaces/${workspace_id}/projects/${project_id}/tasks/${task_id}`, taskData);
};

//cập nhật một trạng thái của task
export const updateTaskStatus = (workspace_id, project_id, task_id, status) => {
  const taskData = {
    "task_id": task_id,
    "task_name": null,
    "description": null,
    "project_id": null,
    "assigned_user": null,
    "board_id": null,
    "start_date": null,
    "end_date": null,
    "status": status // Đặt giá trị status bằng đối số được truyền vào
  };

  return axios.put(`http://localhost:8080/v1/workspaces/${workspace_id}/projects/${project_id}/tasks/${task_id}`, taskData);
};

//cập nhật tên mới của 1 task
export const updateTaskName = (workspace_id, project_id, task_id, task_name) => {
  const taskData = {
    "task_id": task_id,
    "task_name": task_name,
    "description": null,
    "project_id": null,
    "assigned_user": null,
    "board_id": null,
    "start_date": null,
    "end_date": null,
    "status": null
  }
  return axios.put(`http://localhost:8080/v1/workspaces/${workspace_id}/projects/${project_id}/tasks/${task_id}`, taskData);
};

//cập nhật thời gian của 1 task
export const updateTaskDate = (workspace_id, project_id, task_id, start_date, end_date) => {
  const taskData = {
    "task_id": task_id,
    "task_name": null,
    "description": null,
    "project_id": null,
    "assigned_user": null,
    "board_id": null,
    "start_date": start_date,
    "end_date": end_date,
    "status": null
  }
  return axios.put(`http://localhost:8080/v1/workspaces/${workspace_id}/projects/${project_id}/tasks/${task_id}`, taskData);
};