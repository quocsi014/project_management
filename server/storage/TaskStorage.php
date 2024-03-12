<?php

use Storage\ItaskStorage;
use Entity\Task;

class TaskStorage implements ItaskStorage{

  public function inserTask(Task $task):void{

  }

  public function updateTask(Task $task):void{

  }

  public function updateStatus(String $boardID):void{

  }

  public function updateAssignedUSer(String $userID):void{

  }

  public function getTasksOfProjec(String $projectID):array{
    return [];
  }

  public function deleteTask(String $taskID):void{

  }

}