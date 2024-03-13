<?php

namespace Service;

use Storage\IUserStorage;

class UserService{
  private IUserStorage $store;

  public function __construct(IUserStorage $store)
  {
    $this->store = $store;
  }
}