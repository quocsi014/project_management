import UserItem from "../../components/UserItem";
import Avatar from "../../components/Avatar.jsx";
import { getUserOfWorkspace } from '../../service/workspaceService.js';
import { getProjectOfWorkspace, getUserOfProject } from '../../service/projectService.js';

import { GrAdd, GrList } from "react-icons/gr";
import { colorsArray } from "../../resource/color";

import { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";

export default function () {

  const { workspace_id } = useParams();

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [usersByProject, setUsersByProject] = useState({});


  useEffect(() => {
    loadUsers();
    loadProjects();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUserOfWorkspace(workspace_id);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const loadProjects = async () => {
    try {
      const response = await getProjectOfWorkspace(workspace_id);
      console.log(response.data);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }


  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = {};
      for (const projectData of Object.values(projects)) {
        for (const project of projectData) {
          const response = await getUsers(project.project_id);
          console.log("id", project.project_id, "data", response)
          usersData[project.project_id] = response;
        }
      }
      setUsersByProject(usersData);
    };

    fetchUsers();
  }, [projects]);


  const getUsers = async (project_id) => {
    try {
      const response = await getUserOfProject(workspace_id, project_id);
      return response.data
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }


  const color1 = Math.floor(Math.random() * colorsArray.length);


  return (
    <div className="w-full h-full">
      <div className="w-4/6 p-5 border-2 rounded-2xl">
        <div className="mb-8 font-medium text-xl">Danh Sách Thành Viên</div>
        <div className="flex flex-wrap gap-10">
          <div className="flex items-center w-44">
            <div className={`size-10 rounded-full overflow-hidden text-center flex justify-center items-center border-2 shadow-sm`}>
              <div className="flex items-center justify-center w-10 h-10  rounded-full text-gray-500">
                <GrAdd size={20} />
              </div>
            </div>
            <div className="ml-2">Thêm Thành Viên</div>
          </div>

          {Object.values(users).map((userObject, index) => (
            userObject.map((userData, innerIndex) => {
              const user = userData.user;
              return (
                <UserItem
                  key={innerIndex}
                  firstname={user.firstname}
                  lastname={user.lastname}
                  avatarUrl={user.avatarUrl}
                  email={user.email}
                  color={user.color}
                />
              );
            })
          ))}

        </div>
      </div>

      <div className="w-4/6 p-5 my-5 border-2 rounded-2xl mb-5">
        <div className="mb-8 font-medium text-xl">Danh Sách Dự Án</div>
        <div className="flex flex-wrap gap-3">

          <div className="flex items-center w-full">
            <div className={`rounded-xl text-center flex justify-center items-center border-2 `}>
              <div className="flex items-center justify-center w-10 h-10 rounded-xl text-gray-500">
                <GrAdd size={20} />
              </div>
            </div>
            <div className="ml-2">Dự án mới</div>
          </div>

          {/* load project */}
          {Object.values(projects).map((projectData, index) => (
            projectData.map((project, innerIndex) => {
              // console.log(innerIndex)
              console.log("userByProject", usersByProject[1])

              return (
                <div key={`${index}-${innerIndex}`} className="w-full">
                  <div className="flex items-center w-full border-t pt-3" style={{ borderTop: "1px solid gray" }}>
                    <div className={`${colorsArray[project.color]} rounded-xl text-center flex justify-center items-center border-2 `}>
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl text-zinc-50">
                        <GrList size={20} />
                      </div>
                    </div>

                    <div className="ml-2 truncate w-full">
                      {project.name} {project.project_id}
                    </div>

                  {/* load user cho mỗi project */}
                    {usersByProject[project.project_id] ? (
                      Object.values(usersByProject[project.project_id]).map((userData, index) => {
                        return userData.map((user, indexUser) => {
                          console.log("user", user.firstname)
                          return (
                            <div key={`${project.project_id}-${indexUser}`} className="ml-auto flex flex-wrap">
                              <Avatar
                                firstName={user.firstname}
                                lastName={user.lastname}
                                avatarUrl={user.avatarUrl}
                                size="size-7"
                                color={user.color}
                              />
                            </div>
                          )
                        })

                      })
                    ) : (
                      <div></div>
                    )}

                  </div>
                </div>
              );
            })
          ))}
        </div>
      </div>
    </div >
  );
}