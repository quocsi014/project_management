<?php

namespace Storage;
use Entity\UserInformation;
use Entity\UserAccount;

interface IAccountStorage{
  public function insertAnAccount(UserInformation $user_information):void;
  public function getAnAccount(String $email):UserAccount;

  public function getAnAccountbyID(String $ID):UserAccount;
  public function updatePassword(String $userid, String $newpassword):void;
}