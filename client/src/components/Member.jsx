
import UserItem from "./UserItem";

export default function (props) {
  const { firstname, lastname, avatarUrl, email, role, color } = props;
  return (
    <div className="flex items-center justify-between mt-2 border-t-2 pt-2">
      <UserItem firstname={firstname} lastname={lastname} avatarUrl={avatarUrl} email={email} color={color} />
      <select name="role" id="role" className="bg-white border-2 border-gray-200 py-1 px-2 rounded-md focus:border-blue-700 outline-none">
        <option value="leader">Leader</option>
        <option value="member">Thành viên</option>
      </select>

    </div>
  );
}
