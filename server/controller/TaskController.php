<?php 

namespace Controller;

use Entity\Board;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Service\TaskService;
use Exception;

class TaskController{
  private TaskService $service;
  public function __construct(TaskService $service)
  {
    $this->service = $service;
  }
  public function updateStatus(Request $req, Response $res): Response
{
    try {  
        $requestBody = $req->getBody()->getContents();
        $requestBody = json_decode($requestBody, true);
        $requestBody = $req->getParsedBody(); 
        if (!isset($requestBody['board_id'])) {
            throw new Exception("Board ID is required", 400);
        }
        $boardId = $requestBody['board_id'];
        $taskId = $req->getAttribute('task_id'); 
        $projectId = $req->getAttribute('project_id'); 

        // Create potential Board object (if needed)
        // $board = new Board($projectId, $taskId, $boardId);
        // logic using $boardId, $taskId, and $projectId)

        $this->service->updateStatus($boardId);

        $res = $res->withStatus(200);
        $res->getBody()->write(json_encode("Status updated successfully"));
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
