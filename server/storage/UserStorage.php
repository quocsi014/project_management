<?php

namespace Storage;
use Entity\UserInformation;
use Entity\UserAccount;

class UserStorage implements IUserStorage{

  public function insertUser(UserInformation $userInformation):void{

  }

  public function getAnUser(int $userID):void{

  }

  public function getAllUsers():array{
    return [];
  }

  public function updateUserInformation(UserInformation $userInformation):void{

  }

  public function updateUserAccount(UserAccount $userAccount):void{

  }

}