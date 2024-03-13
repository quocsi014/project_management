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

  public function deleteBoard(int $projectID):void{

  }

}