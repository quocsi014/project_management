<?php
namespace Storage;
use Entity\Board;
use PDO;
use PDOException;
use Exception;

use Storage\ITaskStorage;
use Entity\Task;

class TaskStorage implements ITaskStorage{
  private PDOManager $db;

  public function __construct(PDOManager $db = null){

    if(isset($db)){
      $this->db = $db;
    }else{
      $this->db = new PDOManager(null);
    }

  }

  public function inserTask(Task $task):void{

  }

  public function updateTask(Task $task):void{
    try{
      $query = 'UPDATE tasks SET task_name = ?, description = ? WHERE task_id = ?;';
      $stmt = $this->db->getConn()->prepare($query);
      $stmt->bindValue(1, $task->getName(), PDO::PARAM_STR);
      $stmt->bindValue(2, $task->getDescription(), PDO::PARAM_STR);
      $stmt->bindValue(3, $task->getTaskID(), PDO::PARAM_INT);
      $stmt->execute();
      $result = $stmt->rowCount();
      if ($result ==0)
      {
        throw new Exception ("No Task Found",404);
      }
    }catch(PDOException $e){
      throw new Exception($e->getMessage(), 500);
    }
  }

  public function updateStatus(String $boardID,String $taskID):void{
   try {
     
      $query = 'UPDATE tasks SET board_id = ? WHERE task_id = ?;'; 
      $stmt = $this->db->getConn()->prepare($query);
      
      $stmt->execute([$boardID,$taskID]);
      $result = $stmt->rowCount();
      if ($result ==0)
      {
        throw new Exception ("No Task Found",404);
      }
   }catch(PDOException $e){ 
    throw new Exception($e->getMessage(),500);
  }
}

  public function updateAssignedUSer(String $assignedUserID,String $taskID):void{
    try {
     
      $query = 'UPDATE tasks SET assigned_user_id = ? WHERE task_id = ?;'; 
      $stmt = $this->db->getConn()->prepare($query);
      
      $stmt->execute([$assignedUserID,$taskID]);
      $result = $stmt->rowCount();
      if ($result ==0)
      {
        throw new Exception ("No Task Found",404);
      }
   }catch(PDOException $e){ 
    throw new Exception($e->getMessage(),500);
  }
}

  public function getTasksOfProjec(String $projectID):array{
    return [];
  }

  public function deleteTask(String $taskID):void{

  }

}