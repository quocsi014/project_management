<?php 
namespace Storage;

interface IMailSenderStorage{
  public function insertOTP(int $otp, String $email):void;
}