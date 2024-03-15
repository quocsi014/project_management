<?php

namespace Storage;

use Entity\Board;
use Stringable;

interface IBoardStorage{
  public function insertBoard(Board $board):void;
  public function updateBoard(Board $board):void;
  public function updatePreviuosBoard(String $previousBoardID):void;
  public function getBoardsOfProject(int $projectID):array;
  public function deleteBoard(String $boardID):void;
}