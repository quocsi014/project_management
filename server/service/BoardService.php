<?php

namespace Service;

use Entity\Board;
use Storage\IBoardStorage;
use Exception;

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

  public function addBoards(Board $board): void{
   
    if($board->getBoardId() == ""){
      throw new Exception("Board id cannot be blank", 400);
    }
    if($board->getName() == ""){
      throw new Exception("Board name cannot be blank", 400);
    }
    if($board->getProjectId() == ""){
    throw new Exception("Project id cannot be blank", 400);
    }

    $this->store->insertBoard($board);
  }
}