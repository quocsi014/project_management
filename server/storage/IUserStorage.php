<?php

namespace Storage;

use Entity\UserAccount;
use Entity\UserInformation;

interface IUserStorage{
  public function insertUser(UserInformation $userInformation):void;
  public function getAnUser(int $userID):UserInformation;
  public function getAllUsers():array;
  public function updateUserInformation(UserInformation $userInformation):void;
}