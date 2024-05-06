import{
  NavLink
} from "react-router-dom";
export default function ({workspace_id}) {
  return (
    <div className="w-full flex py-3">
      <NavLink
        to={`/workspace/${workspace_id}/overview`}
        className="mr-8 focus:border-b-2 focus:border-black"
      >
        {({ isActive }) => (
          <div
            className={`flex items-center ${isActive ? "text-black font-semibold" : "text-gray-500"
              }`}
          >
            Chung
          </div>
        )}
      </NavLink>

      <NavLink
        to={`/workspace/${workspace_id}/members`}
        className="mr-8 focus:border-b-2 focus:border-black"
      >
        {({ isActive }) => (
          <div
            className={`flex items-center ${isActive ? "text-black font-semibold" : "text-gray-500"
              }`}
          >
            Thành viên
          </div>
        )}
      </NavLink>

      <NavLink
        to={`/workspace/${workspace_id}/admin`}
        className="mr-8 focus:border-b-2 focus:border-black"
      >
        {({ isActive }) => (
          <div
            className={`flex items-center ${isActive ? "text-black font-semibold" : "text-gray-500"
              }`}
          >
            Quản trị
          </div>
        )}
      </NavLink>
    </div>
  );
}