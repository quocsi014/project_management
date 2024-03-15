<?php

namespace Service;

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

  public function  updatePreviuosBoard(String $newpreviousBoardID, String $boardID){
    $this->store->updatePreviuosBoard($newpreviousBoardID, $boardID);
  }
}