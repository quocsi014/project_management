<?php 

namespace Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Service\TaskService;

class TaskController{
  private TaskService $service;
  public function __construct(TaskService $service)
  {
    $this->service = $service;
  }
}