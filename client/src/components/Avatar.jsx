import { colorsArray } from "../resource/color";

export default function (props) {
  let { size, color, imgUrl, firstName, lastName, className } = props
  size = null ? "size-10": size
  if(color<0 || color >131){
    color = 0
  }
  return (
    <div className={`${size} ${colorsArray[color]} text-white  rounded-full overflow-hidden text-center flex justify-center items-center border-2 border-gray-200 shadow-sm ${className}`} style={{ fontSize: `${size?.split("-")[1]/8}rem` }}>
      {firstName && lastName ? firstName[0] + lastName[0] : ""}
      {imgUrl ? (
        <img src={imgUrl} className={`${size} object-cover`} alt="" />
      ) : (
        <></>
      )}
    </div>
  );
}
