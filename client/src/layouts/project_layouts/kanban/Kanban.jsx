import KanbanContainer from "./KanbanContainer";
import KanbanHeader from "./KanbanHeader";


export default function(){
  return(
    <div className="w-full h-full overflow-hidden">
      <KanbanHeader/>
      <KanbanContainer/>
    </div>
  )
}