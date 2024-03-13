<?php

namespace Storage;

use PDOException;
use Exception;

class MailSenderStorage implements IMailSenderStorage{
  private PDOManager $db;
  public function __construct(PDOManager $db = null){

    if(isset($db)){
      $this->db = $db;
    }else{
      $this->db = new PDOManager(null);
    }

  }
  public function insertOTP(int $otp, string $email): void
  {
    try{
      $query = "insert into otp (email, otp) values (?, ?)";
      $stmt = $this->db->getConn()->prepare($query);
      $stmt->execute([$email, $otp]);
    }catch(PDOException $e){
      throw new Exception($e->getMessage(), 500);
    }
  }
}