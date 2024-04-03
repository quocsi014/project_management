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

  public function getTasksOfProject(String $projectID):array{
    try {
      $query = 'select * from tasks where project_id = ?';
      $stmt = $this->db->getConn()->prepare($query);
      $stmt->execute([$projectID]);
      if ($stmt->rowCount() == 0) 
      {
        throw new Exception("Tasks of project not found", 404);
      }
      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
      $tasks = array();
      foreach($result as $row){
        $dateTimeObject = ($row['create_at'] !== null) ? DateTime::createFromFormat('Y-m-d H:i:s', $row['create_at']) : null;
        $task = new Task($row['task_id'],$row['task_name'],$row['description'],$row['project_id'],$row['assigned_user_id'],$row['board_id']);
        $tasks[] = $task;
      }
      return $tasks;
    } catch (Exception $e) {
      if ($e->getCode() == 404) 
      {
        throw new Exception($e->getMessage(), 404);
      } 
      else throw new Exception($e->getMessage(), 500);
    }
  }

  public function deleteTask(String $taskID):void{

  }

}