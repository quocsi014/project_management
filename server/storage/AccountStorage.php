<?php

namespace Storage;
use Entity\UserAccount;
use PDO;
use PDOException;
use Exception;


class AccountStorage implements IAccountStorage{

  private PDOManager $db;

  public function __construct($db)
  {
    $this->db = $db;
  }

  public function insertAnAccount(UserAccount $user_account):void{

  }
  public function getAnAccount(String $user_id):UserAccount{
    try{
      $query = "select * from user_accounts where user_id = ?";
      $stmt = $this->db->getConn()->prepare($query);
      $stmt->execute([$user_id]);

      $result = $stmt->fetch(PDO::FETCH_ASSOC);
      if($result){
        return new UserAccount($result['user_id'], $result['email'], $result['password']);
      }else{
        throw new Exception("No User Found", 404);
      }
    }catch (PDOException $e){
      throw new Exception($e->getMessage(), 500);
    }
  } 
  public function updatePassword(UserAccount $user_account):void{

  }
}