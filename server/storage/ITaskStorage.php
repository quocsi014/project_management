<?php 
namespace Storage;

use Entity\Task;


interface ItaskStorage{
  public function inserTask(Task $task):void;
  public function updateTask(Task $task):void;
  public function updateStatus(String $boardID, String $status): void;
  public function updateAssignedUSer(String $userID):void;
  public function getTasksOfProjec(String $projectID):array;
  public function deleteTask(String $taskID):void;
}