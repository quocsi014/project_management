<?php

namespace Storage;
use Entity\UserAccount;

interface IAccountStorage{
  public function insertAnAccount(UserAccount $user_account):void;
  public function getAnAccount(String $user_id):UserAccount;
  public function updatePassword(UserAccount $user_account):void;
}