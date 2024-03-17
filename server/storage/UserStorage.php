<?php

namespace Storage;
use Entity\UserInformation;
use Entity\UserAccount;
use PDOException;
use PDO;
use Exception;

class UserStorage implements IUserStorage{

  private PDOManager $db;
  public function __construct(PDOManager $db)
  {
    $this->db = $db;
  } 

  public function insertUser(UserInformation $userInformation):void{

  }

  public function getAnUser(int $userID):void{

  }

  public function getAllUsers():array{
    return [];
  }

  public function updateUserInformation(UserInformation $userInformation):void{

  }


  

}