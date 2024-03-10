<?php

require_once "./storage/IProjectStorage.php";

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



}
