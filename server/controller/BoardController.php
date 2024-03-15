<?php

namespace Controller;

use Entity\Board;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Service\BoardService;
use Exception;
use Ramsey\Uuid\Nonstandard\Uuid;

class BoardController{
  private BoardService $service;
  public function __construct(BoardService $service)
  {
    $this->service = $service;
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

  public function deleteBoard(Request $req, Response $res){
    try{
      $this->service->deleteBoard($req->getAttribute('board_id'));
      $res = $res->withStatus(200);
      $res->getBody()->write(json_encode(
        array("message" => "delete successfully")
      ));
    }catch(Exception $e){
      if ($e->getCode() == 404){
        $res = $res->withStatus(404);
        $res->getBody()->write($e->getMessage());
      }else{
        $res = $res->withStatus(500);
        $res->getBody()->write($e->getMessage());
      }
    }
    return $res;
  }

  public function addBoards(Request $req, Response $res)
  {
    try{
      $body = $req->getBody()->getContents();
      $data = json_decode($body);

      if (!isset($data->board_name)) {
        throw new Exception("Board name is required", 400);
      }

      if (!isset($data->previous_board_id)) {
        throw new Exception("Previous board is required", 400);
      }

      $boardId = Uuid::uuid4();
      $projectID = $req->getAttribute('project_id');
      $boards = new Board($boardId, $data->board_name, $projectID, $data->previous_board_id);

      $this->service->addBoards($boards);
      $res = $res->withStatus(200);
      $res->getBody()->write(json_encode(
        array("message" => "create successfully")
      ));
    } catch(Exception $e) {
      if ($e->getCode() == 404){
        $res = $res->withStatus(404);
        $res->getBody()->write($e->getMessage());
      }else{
        $res = $res->withStatus(500);
        $res->getBody()->write($e->getMessage());
      }
    }
  }
}