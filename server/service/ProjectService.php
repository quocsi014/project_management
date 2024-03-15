<?php

namespace Service;

use Storage\IProjectStorage;
use Entity\Project;
use Exception;

class ProjectService{
  private IProjectStorage $store;

  public function __construct(IProjectStorage $store)
  {
    $this->store = $store;
  }

  public function CreateAproject(Project $project):void{

    if($project->getOwnerID() == ""){
      throw new Exception("OwnerID cannot be blank", 400);
    }

    if($project->getName() == ""){
      throw new Exception("Project name cannot be blank", 400);
    }

    $this->store->insertAProject($project);

  }

  public function getAllListProject(int $limit, int $offset){
    return $this->store->getAllProject($limit, $offset);
  }

  public function getOneProject(String $projectID){
    return $this->store->getAProject($projectID);
  }

  public function updateAProject(Project $project){
    if($project->getName() == ""){
      throw new Exception("Project name cannot be blank", 400);
    }
    
    return $this->store->updateAProject($project);
  }
  public function deleteAProject(Project $project){
    return $this->store->deleteAProject($project);
  }
  
}
