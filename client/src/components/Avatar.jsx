export default function (props) {
  let { size, color, imgUrl, firstName, lastName } = props;

  return (
    <div className={`${size} ${color} rounded-full overflow-hidden`}>
      {firstName && lastName ? firstName[0] + lastName[0] : ""}
      <img src={imgUrl} className={`${size} object-cover`} alt="" />
    </div>
  );
}
