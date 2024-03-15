<?php

namespace Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Service\UserService;

class UserController{
  private UserService $service;

  public function __construct(UserService $service)
  {
    $this->service = $service;
  }
}