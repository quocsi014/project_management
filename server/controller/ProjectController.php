<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Ramsey\Uuid\Uuid;

require_once "./service/ProjectService.php";
require_once "./entity/Project.php";


class ProjectController{

  private ProjectService $service;

  public function __construct(ProjectService $service)
  {
    $this->service = $service;
  }

  public function CreateProject(Request $req, Response $res){
    $body = $req->getBody()->getContents();
    $data = json_decode($body);

    if(!isset($data->description)){
      $data->description = null;
    }

    if(!isset($data->name)){
      $res = $res->withStatus(400);
      $res->getBody()->write("Name is required");
      return $res;
    }

    if(!isset($data->owner_id)){
      $res = $res->withStatus(400);
      $res->getBody()->write("OwnerID is required");
      return $res;
    }

    if(!isset($data->project_id)){
      $data->project_id = Uuid::uuid4();
    }

    $project = new Project($data->project_id, $data->name, $data->description, $data->owner_id, DateTime::createFromFormat('Y-m-d H:i:s', $data->create_at));

    try{
      $this->service->CreateAproject($project);
      $res = $res->withStatus(200);
      $res->getBody()->write(json_encode(
        array(
          "message" => "Create successfully",
          "project" => $project
        )
      ));
      return $res;
    }catch(Exception $e){
      if($e->getCode() == 409){
        $res = $res->withStatus(409);
      }else{
        $res = $res->withStatus(500);
      }
      $res->getBody()->write($e->getMessage());
      return $res;
    }
  }

  public function getAllProject(Request $req, Response $res){
    $queryParams = $req->getQueryParams();
    $limit = isset($queryParams['limit']) ? (int) $queryParams['limit'] : 10;
    $offset = isset($queryParams['offset']) ? (int) $queryParams['offset'] : 0;
    
    try {
      $result = $this->service->getAllListProject($limit, $offset);
      // error_log("Contents of \$result array: " . print_r($result, true));

      $res = $res->withStatus(200);
      $res->getBody()->write(json_encode(
        array(
          "limit" => $limit,
          "page" => (int)($offset / $limit) + 1,
          "projects" => $result
        )
      ));
      return $res;
    }catch(Exception $e){
      $res = $res->withStatus(500);
      return $res;
    }
  }
  public function GetBoads(Request $req, Response $res){
    try{
      $boards = $this->service->GetBoardsOfProject($req->getAttribute('project_id'));
      $res = $res->withStatus(200);
      $res->getBody()->write(json_encode($boards));
      return $res;
    }catch(Exception $e){
      if($e->getCode() == 400){
        $res = $res->withStatus(400);
        $res->getBody()->write($e->getMessage());
      }else{
        $res = $res->withStatus(500);
        $res->getBody()->write($e->getMessage());
      }
      return $res;
    }
  }

  public function updateProject(Request $req, Response $res)
  {
    try{
      $requestBody = $req->getBody()->getContents();
      $requestBody = json_decode($requestBody, true);

      if (!isset($requestBody['projectName'])) {
        throw new Exception("Name is required", 400);
      }

      if (!isset($requestBody['description'])) {
        throw new Exception("Description is required", 400);
      }
      
      $projectName = $requestBody['projectName'];
      $description = $requestBody['description'];
      $projectID = $req->getAttribute('project_id');

      $project = new Project($projectID, $projectName, $description,null, null);

      $this->service->updateAProject($project);
      $res = $res->withStatus(200);
      $res->getBody()->write(json_encode("update successfully"));
      return $res;
    }catch(Exception $e){
      if($e->getCode() == 400){
        $res = $res->withStatus(400);
        $res->getBody()->write($e->getMessage());
      }else{
        $res = $res->withStatus(500);
        $res->getBody()->write($e->getMessage());
      }
      return $res;
    }
  }
}