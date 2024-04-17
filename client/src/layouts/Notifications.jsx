import { useSelector } from "react-redux";
import Notification from "../components/Notification";

export default function (props) {
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  return (
    <div className="absolute bottom-0 left-0 py-4 w-60 h-auto z-50 transition-all duration-500">
      {
        notifications.map(noti=>{
          return <Notification notification = {noti} />
        })
      }
    </div>
  );
}
