<?php

namespace Storage;
use Entity\Board;
use Exception;
use PDO;
use PDOException;

class BoardStorage implements IBoardStorage{
  private PDOManager $db;

  public function __construct(PDOManager $db = null){

    if(isset($db)){
      $this->db = $db;
    }else{
      $this->db = new PDOManager(null);
    }

  }

  public function insertBoard(Board $board):void{
    try{
      $query = 'INSERT INTO boards (board_id ,board_name, product_id, previous_board_id) VALUES (?, ?, ?, ?);';
      $stmt = $this->db->getConn()->prepare($query);
      $stmt->bindValue(1, $board->getBoardId(), PDO::PARAM_STR);
      $stmt->bindValue(2, $board->getName(), PDO::PARAM_STR);
      $stmt->bindValue(3, $board->getProjectId(), PDO::PARAM_INT);
      $stmt->bindValue(4, $board->getPreviousBoardId(), PDO::PARAM_INT);
      $stmt->execute();
      $this->db->getConn()->commit();
    }catch(PDOException $e){
      $this->db->getConn()->rollBack();
      throw new Exception($e->getMessage(), 500);
    }
  }

  public function updateBoard(Board $board):void{

  }

  public function updatePreviuosBoard(String $previousBoardID):void{

  }

  public function getBoardsOfProject(int $projectID):array{
    try{
      $query = 'select * from boards where project_id = ?';
      $stmt = $this->db->getConn()->prepare($query);
      $stmt->execute([$projectID]);
  
      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

      if(count($result) == 0){
        throw new Exception("Project is not exist", 400);
      }
      $boards = array();
  
      foreach($result as $row){
        $board = new Board($row['board_id'], $row['board_name'], $projectID, $row['previous_board_id']);
        $boards[] = $board;
      }
  
      return $boards;

    }catch(PDOException $e){
      throw new Exception($e->getMessage(), 500);
    }
  }

  public function deleteBoard(String $boardID):void{
    try{
      $this->db->getConn()->beginTransaction();

      $queryGetPreviousID = "select previous_board_id from boards where board_id = ?";
      $stmtGetPre = $this->db->getConn()->prepare($queryGetPreviousID);
      $stmtGetPre->execute([$boardID]);
      $previousBoardID = $stmtGetPre->fetch(PDO::FETCH_ASSOC)['previous_board_id'];

      $query1 = "UPDATE `boards` SET `previous_board_id`= ? WHERE previous_board_id = ?;";
      $stmt1 = $this->db->getConn()->prepare($query1);
      $stmt1->execute([$previousBoardID, $boardID]);

      $query2 = "DELETE FROM boards WHERE board_id = ?";
      $stmt2 = $this->db->getConn()->prepare($query2);
      $stmt2 ->execute([$boardID]);

      if($stmt2->rowCount()==0){ //không có dòng nào được xóa, không tìm thấy bảng
        throw new Exception("Board not found", 404);
      }
      $this->db->getConn()->commit();
     
    }catch(Exception $e){ 
      if ($e->getCode() == 404){
        throw new Exception($e->getMessage(), 404);
      }else{
        $this->db->getConn()->rollBack();
        throw new Exception($e->getMessage(), 500);
      }
    }
  }
}