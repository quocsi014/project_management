<?php 

namespace Controller;

use Entity\Task;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Service\TaskService;
use Exception;
use DateTime;

class TaskController{
  private TaskService $service;
  public function __construct(TaskService $service)
  {
    $this->service = $service;
  }
  public function updateStatus(Request $req, Response $res)
{
    try {
         
        $requestBody = $req->getBody()->getContents();
        $requestBody = json_decode($requestBody, true);
        if (!isset($requestBody['board_id'])) {
            throw new Exception("Board ID is required", 400);
        }
        $boardID = $requestBody['board_id'];
        $taskID = $req->getAttribute('task_id'); 
        $projectID = $req->getAttribute('project_id'); 

        $task = new Task($taskID, null, $projectID, null, $boardID, null);
        $this->service->updateStatus($boardID);
        
        $res = $res->withStatus(200);
        $res->getBody()->write(json_encode(array("Status updated successfully",
         "boardID" => $boardID
        )
      ));
        return $res;
    } catch(Exception $e){
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
