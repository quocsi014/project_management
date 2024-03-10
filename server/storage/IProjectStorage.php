<?php

interface IProjectStorage{
  public function insertAProject(Project $project);
  public function updateAProject(Project $project);
  public function deleteAProject(String $project);
  public function getAProject(String $projectID):Project;
  public function getAllProject(Int $limit, int $offset);
}