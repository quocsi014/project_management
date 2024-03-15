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

  }

  public function updateBoard(Board $board):void{

  }
  // public function updatePreviuosBoard(String $previousBoardID):void{

  // }
  public function updatePreviuosBoard( String $boardID, String $newpreviousBoardID):void{
    try{
      $query1 = "SELECT board_id FROM `boards` WHERE previous_board_id = ?";
      $stmt1 = $this->db->getConn()->prepare($query1);
      $stmt1->execute([$newpreviousBoardID]);

      $result1 = $stmt1->fetchAll(PDO::FETCH_ASSOC);

      
      $parent = array();
      foreach($result1 as $row){
        // Khởi tạo mảng $row1 trong vòng lặp foreach
        $row1 = array();
        // Ghi nhận giá trị của $row['board_id'] vào mảng $row1
        $row1['board_id'] = $row['board_id'];
        $row1['previous_board_id'] = $newpreviousBoardID;
        $parent[] = $row1;
      }
      throw new Exception($parent[0]["board_id"], 400);
    }catch(Exception $e){
      throw new Exception($e->getMessage(), 400);
      
    }
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

  public function deleteBoard(int $projectID):void{

  }

}