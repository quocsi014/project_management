<?php

namespace Storage;

use Entity\Board;
use Stringable;

interface IBoardStorage{
  public function insertBoard(Board $board):void;
  public function updateBoard(Board $board):void;
  public function updatePreviuosBoard(String $boardID, ?String $preID, ?String $newpreviousBoardID):void;
  public function getBoardsOfProject(String $projectID):array;
  public function deleteBoard(int $projectID):void;
  public function updatePreviuosBoard(String $previousBoardID):void;
  public function getBoardsOfProject(int $projectID):array;
  public function deleteBoard(String $boardID):void;
}