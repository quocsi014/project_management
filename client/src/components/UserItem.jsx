import Avatar from "./Avatar";

export default function(props){
  const { firstname, lastname, avatarUrl, email, color } = props;
  return(

    <div className="flex">

        <Avatar
          firstName={firstname}
          lastName={lastname}
          avatarUrl={avatarUrl}
          size="size-10"
          color={color}
        />

        <div className="ml-2">
          <div className="">
            {firstname} {lastname}
          </div>
          <div className="text-xs">{email}</div>
        </div>
        
      </div>
  )
}