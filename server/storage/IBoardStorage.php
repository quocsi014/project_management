<?php

namespace Storage;

use Entity\Board;

interface IBoardStorage{
  public function insertBoard(Board $board):void;
  public function updateBoard(Board $board):void;
  public function updatePreviuosBoard(String $previousBoardID, String $boardID):void;
  public function getBoardsOfProject(int $projectID):array;
  public function deleteBoard(int $projectID):void;
}