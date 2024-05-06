import Avatar from "./Avatar";

export default function(props){
  const { firstname, lastname, avatarUrl, email, color } = props;
  return(

    <div className="flex items-center">

        <Avatar
          firstName={firstname}
          lastName={lastname}
          avatarUrl={avatarUrl}
          size="size-10"
          color={color}
        />

        <div className="ml-2">
          <div className="truncate w-32">
            {firstname} {lastname}
          </div>
          <div className="text-xs truncate max-32">{email}</div>
        </div>
        
      </div>
  )
}