import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeNotification } from "../redux/store";


export default function(props){
  const {notification} = props;
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    // Đặt isVisible thành true sau 0.5 giây
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Đặt isVisible thành false sau 3 giây
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    const removeTimer = setTimeout(() => {
      dispatch(removeNotification({id: notification.id}))
      console.log("removed noti")
    }, 4000);

    // Hủy bỏ các timer khi component bị unmount
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer)
    };
  }, [dispatch]);
  return(
    <div className={`py-4 px-2 w-fit rounded-e-xl border-2 border-l-0 border-r-6 ${notification.type == "success"? "border-r-emerald-600":notification.type == "fail"? "border-r-red-600":"border-r-blue-600"} font-semibold text-md ${isVisible?"translate-x-0":"-translate-x-full"} mb-2 transition-transform duration-700`}>
      {notification.content}
    </div>
  )
}