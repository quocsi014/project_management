<?php

namespace Service;

use Storage\ITaskStorage;

class TaskService{
  private ITaskStorage $store;

  public function __construct(ITaskStorage $store)
  {
    $this->store = $store;
  }
}