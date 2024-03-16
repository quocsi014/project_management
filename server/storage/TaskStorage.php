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

  public function updateStatus(int $taskId, ?int $boardId, ?string $newStatus = null): void
  {
      try {
          $db = $this->db->getConn(); 
  
          $query = "UPDATE tasks SET ";
  
          if ($boardId !== null) {
              $query .= "board_id = ?";
          }
  
          if ($newStatus !== null) {
              $query .= ($boardId == null) ? '' : ', '; 
              $query .= "status = ?"; // Update status if provided
          }
  
          $query .= " WHERE task_id = ?"; // Always update based on task_id
  
          $stmt = $db->prepare($query);
  
          $paramCount = 0;
          if ($boardId !== null) {
              $stmt->bindValue(++$paramCount, $boardId, PDO::PARAM_INT);
          }
  
          if ($newStatus !== null) {
              $stmt->bindValue(++$paramCount, $newStatus, PDO::PARAM_STR);
          }
  
          $stmt->bindValue(++$paramCount, $taskId, PDO::PARAM_INT); // Always bind task_id
  
          $stmt->execute();
  
          if ($stmt->rowCount() === 0) {
              throw new Exception("No Task Found", 404);
          }
  
          $db->commit();
      } catch (PDOException $e) {
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