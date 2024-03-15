<?php

namespace Service;

use Entity\Board;
use Storage\IBoardStorage;

class BoardService{
  private IBoardStorage $store;

  public function __construct(IBoardStorage $store)
  {
    $this->store = $store;
  }

  public function GetBoardsOfProject(String $projectID){
    return $this->store->getBoardsOfProject($projectID);
  }

  public function deleteBoard(String $projectID){
    $this->store->deleteBoard($projectID);
  }

  public function addBoards(Board $board){
    $this->store->insertBoard($board);
  }
}