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

  public function  updatePreviuosBoard(String $boardID, ?String $preID, ?String $newpreviousBoardID){
    $this->store->updatePreviuosBoard($boardID, $preID, $newpreviousBoardID);
  }
  public function deleteBoard(String $projectID){
    $this->store->deleteBoard($projectID);
  }
}