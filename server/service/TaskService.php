<?php

namespace Service;
use Exception;

use Storage\ITaskStorage;
use Entity\Task;


class TaskService{
  private ITaskStorage $store;

  public function __construct(ITaskStorage $store)
  {
    $this->store = $store;
  }
  public function updateStatus(String $boardID, String $taskID):void{
    
    $this->store->updateStatus($boardID,$taskID);
  }
  public function updateAssignedUSer(String $assignedUserID, String $taskID):void{
    $this->store->updateAssignedUSer($assignedUserID,$taskID);
  }
  public function updateTask(Task $task):void{
    if($task->getName() == ""){
      throw new Exception("Task name cannot be blank", 400);
    }
    $this->store->updateTask($task);
  }

}
