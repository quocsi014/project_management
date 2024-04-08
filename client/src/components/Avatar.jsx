import { colorsArray } from "../resource/color";

export default function (props) {
  let { size, color, imgUrl, firstName, lastName } = props
  if(color<0 || color >131){
    color = 0
  }
  return (
    <div className={`${size} ${colorsArray[color]} text-white  rounded-full overflow-hidden text-sm text-center flex justify-center items-center border-2 border-gray-200 shadow-sm`}>
      {firstName && lastName ? firstName[0] + lastName[0] : ""}
      {imgUrl ? (
        <img src={imgUrl} className={`${size} object-cover`} alt="" />
      ) : (
        <></>
      )}
    </div>
  );
}
