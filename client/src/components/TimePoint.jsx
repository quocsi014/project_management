import { IoIosCreate, IoIosDisc } from "react-icons/io";
import { MdGroup } from "react-icons/md";
import { GoProject } from "react-icons/go";
import Avatar from "./Avatar";
export default function (props) {
  const { activity, line } = props;
  const getRelativeTime = (created_at) => {
    const currentDate = new Date();
    const createdAtDate = new Date(created_at);

    // Tính số lượng miliseconds giữa hai thời điểm
    const difference = currentDate - createdAtDate;

    // Tính số lượng miliseconds tương ứng với một ngày
    const oneDay = 24 * 60 * 60 * 1000;

    // Xác định khoảng thời gian
    if (difference < oneDay) {
      return "hôm nay";
    } else if (difference < 2 * oneDay) {
      return "1 ngày trước";
    } else if (difference < 30 * oneDay) {
      const daysAgo = Math.floor(difference / oneDay);
      return `${daysAgo} ngày trước`;
    } else if (difference < 365 * oneDay) {
      const monthsAgo = Math.floor(difference / (30 * oneDay));
      return `${monthsAgo} tháng trước`;
    } else {
      const day = createdAtDate.getDate();
      const month = createdAtDate.getMonth() + 1;
      const year = createdAtDate.getFullYear();
      return `${day}/${month}/${year}`;
    }
  };

  const activityCss = "ml-4";

  return (
    <div className="flex items-start flex-row ">
      {activity.type == "create" ? (
        <>
          <div className="flex flex-col items-center">
            <GoProject className="text-gray-500 size-6" />
            {
              line?
              <div className="w-1px h-14 bg-gray-500"></div>
              :
              <></>
            }
          </div>
          <div className="flex items-start flex-col ml-2 ">
            <div>Project created</div>
            <div className="text-md text-gray-500">{getRelativeTime(activity.create_at)}</div>
          </div>
        </>
      ) : activity.type == "join" ? (
        <>
          <div className="flex flex-col items-center">
            <Avatar lastName = {activity.user.lastname} firstName = {activity.user.firstname} color={activity.user.color} imgUrl = {activity.user.avatar_url} size="size-6" />
            {
              line?
              <div className="w-1px h-14 bg-gray-500"></div>
              :
              <></>
            }
          </div>
          <div className="flex items-start flex-col ml-2 ">
            <div>{activity.user.user_account.email} joined</div>
            <div className="text-md text-gray-500">{getRelativeTime(activity.create_at)}</div>
          </div>
        </>
      ) : activity.type == "leave" ? (
        <>
          <div className="flex flex-col items-center">
            <Avatar lastName = {activity.user.lastname} firstName = {activity.user.firstname} color={activity.user.color} imgUrl = {activity.user.avatar_url} size="size-6" />
            {
              line?
              <div className="w-1px h-14 bg-gray-500"></div>
              :
              <></>
            }
          </div>
          <div className="flex items-start flex-col ml-2 ">
            <div>{activity.user.user_account.email} removed</div>
            <div className="text-md text-gray-500">{getRelativeTime(activity.create_at)}</div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <IoIosDisc className="text-gray-500 size-6" />
            {
              line?
              <div className="w-1px h-14 bg-gray-500"></div>
              :
              <></>
            }
          </div>
          <div className="flex items-start flex-col ml-2 ">
            
            <div>Status update-{activity.status}</div>
            <div className="text-md text-gray-500">{getRelativeTime(activity.create_at)}</div>
          </div>
        </>
      )}
    </div>
  );
}
