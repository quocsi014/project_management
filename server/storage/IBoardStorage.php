<?php

namespace Storage;

use Entity\Board;

interface IBoardStorage{
  public function insertBoard(Board $board):void;
  public function updateBoard(Board $board):void;
  public function updatePreviuosBoard(String $boardID, String $newpreviousBoardID):void;
  public function getBoardsOfProject(int $projectID):array;
  public function deleteBoard(int $projectID):void;
}