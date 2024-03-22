<?php
namespace Storage;
use Entity\Board;
use PDO;
use PDOException;
use Exception;
use DateTime;

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
    try{
      $this->db->getConn()->beginTransaction();

      //Tạo một công viêc;
      $query = "INSERT INTO tasks (task_id,task_name,project_id,assigned_user_id,board_id,create_at) VALUES (?, ?, ?, ?, ?, ?)";
      $stmt = $this->db->getConn()->prepare($query);
      $stmt->execute($task->toArray());

      $this->db->getConn()->commit();
    }catch (PDOException $e){
      $this->db->getConn()->rollBack();
      
      if($e->errorInfo[1] == 1062){
        throw new Exception($e->getMessage(), 409);
      }else{
        throw new Exception($e->getMessage(), 500);
      }
    }
  }

  public function updateTask(Task $task):void{

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