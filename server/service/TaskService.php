<?php

namespace Service;
use Exception;

use Storage\ITaskStorage;

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
}
