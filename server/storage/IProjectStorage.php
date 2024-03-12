<?php
namespace Storage;

use Psr\Http\Message\ServerRequestInterface as Request;
use Entity\Project;


interface IProjectStorage{
  public function insertAProject(Project $project);
  public function updateAProject(Project $project);
  public function deleteAProject(String $project);
  public function getAProject(String $projectID):Project;
  public function getAllProject(Int $limit, int $offset):array;
  public function getBoardsOfProject(String $projectID):array;
}