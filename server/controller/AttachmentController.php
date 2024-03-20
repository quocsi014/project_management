<?php

namespace Controller;

use Entity\Attachment;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use service\AttachmentService;
use Exception;
use Ramsey\Uuid\Nonstandard\Uuid;

class AttachmentController{
  private AttachmentService $service;
  public function __construct(AttachmentService $service)
  {
    $this->service = $service;
  }

  public function InsertAttachment(Request $req, Response $res){
    $body = $req->getBody()->getContents();
      $data = json_decode($body);
      if(!isset($data->title)) {
        $data->title = null;
      }
      if(!isset($data->attachment_url)) {
        $data->attachment_url = null;
      }
      if(!isset($data->project_id)) {
        $data->project_id = null;
      }
      if (!isset($data->attachment_id)) {
        $res = $res->withStatus(404);
        $res->getBody()->write("Attachment id is required");
        return $res;
      }
      
      $attachment = new Attachment($data->attachment_id, $data->attachment_url, $data->title, $data->project_id);
      try{
        $this->service->InsertAttachment($attachment);
        $res = $res->withStatus(200);
        $res->getBody()->write(json_encode(
        array("message" => "create successfully",
        "attachment" => $attachment
        )
      ));
      return $res;
    } catch(Exception $e){
      if($e->getCode() == 404){
        $res = $res->withStatus(404);
        $res->getBody()->write($e->getMessage());
      }else{
        $res = $res->withStatus(500);
        $res->getBody()->write($e->getMessage());
      }
      return $res;
    }
  }
}
?>