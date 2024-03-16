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

  public function updateStatus(string $taskId, ?string $boardId, ?string $newStatus): void
{
  try {
    $query = "UPDATE tasks SET board_id = ? WHERE task_id = ?"; 
      $stmt = $this->db->getConn()->prepare($query);
      $stmt->execute([$newStatus, $boardId]);
      if($stmt->rowCount()==0){
        throw new Exception("No Board Found", 404);
      }
      $this->db->getConn()->commit();
   } catch(PDOException $e){
    throw new Exception($e->getMessage(), 500);
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