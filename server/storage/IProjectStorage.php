<?php

use Psr\Http\Message\ServerRequestInterface as Request;

interface IProjectStorage{
  public function insertAProject(Project $project);
  public function updateAProject(Project $project);
  public function deleteAProject(String $project);
  public function getAProject(String $projectID):Project;
  public function getAllProject():array;
  public function getBoardsOfProject(String $projectID):array;
}