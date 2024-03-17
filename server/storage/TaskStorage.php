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

  }

  public function updateStatus(String $boardID,String $taskID):void{
   try {
      $this->db->getConn()->beginTransaction();
      $query = 'UPDATE tasks SET board_id = ? WHERE task_id = ?;'; 
      $stmt = $this->db->getConn()->prepare($query);
      $stmt->bindParam(1, $boardID, PDO::PARAM_STR);
      $stmt->bindParam(2, $taskID, PDO::PARAM_STR);
      $stmt->execute([$taskID,$boardID]);
      $this->db->getConn()->commit();
   }catch(Exception $e){ 
    $this->db->getConn()->rollBack();
    throw new Exception($e->getMessage(), ($e->getCode() == 400) ? 400 : 500);
  }
}

  public function updateAssignedUSer(String $userID):void{

  }

  public function getTasksOfProjec(String $projectID):array{
    return [];
  }

  public function deleteTask(String $taskID):void{

  }

}