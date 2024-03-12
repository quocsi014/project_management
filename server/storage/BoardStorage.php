<?php

namespace Storage;
use Entity\Board;

class BoardStorage implements IBoardStorage{

  public function insertBoard(Board $board):void{

  }

  public function updateBoard(Board $board):void{

  }

  public function updatePreviuosBoard(String $previousBoardID):void{

  }

  public function getBoardsOfProject(int $projectID):array{
    return [];
  }

  public function deleteBoard(int $projectID):void{

  }

}