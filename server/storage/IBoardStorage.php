<?php

namespace Storage;

use Entity\Board;

interface IBoardStorage{
  public function insertBoard(Board $board):void;
  public function updateBoard(Board $board):void;
  public function updatePreviuosBoard(String $boardID, ?String $preID, ?String $newpreviousBoardID):void;
  public function getBoardsOfProject(String $projectID):array;
  public function deleteBoard(int $projectID):void;
}