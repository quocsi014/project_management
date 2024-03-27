<?php

namespace Storage;
use Entity\Attachment;
use Exception;
use PDO;
use PDOException;

class AttachmentStorage implements IAttachmentStorage{
  private PDOManager $db;

  public function __construct(PDOManager $db = null){

    if(isset($db)){
      $this->db = $db;
    }else{
      $this->db = new PDOManager(null);
    }

  }
  public function InsertAttachment(Attachment $attachment): void{
    try {
       $query = 'INSERT INTO attachments (attachment_id, attachment_url, title, project_id, task_id) VALUES (?,?,?,?,?);';
       $stmt = $this->db->getConn()->prepare($query);
       $stmt->bindValue(1, $attachment->getAttachmentId(), PDO::PARAM_STR);
       $stmt->bindValue(2, $attachment->getAttachmentUrl(), PDO::PARAM_STR);
       $stmt->bindValue(3, $attachment->getTitle(), PDO::PARAM_STR);
       $stmt->bindValue(4, $attachment->getProjectId(), PDO::PARAM_STR);
       $stmt->bindValue(5, $attachment->getTaskId(), PDO::PARAM_STR);
       $stmt->execute();
    }catch(Exception $e){
      throw new Exception($e->getMessage(), 500);
    }
  }
  public function GetAttachmentATask(String $task_id):array{
    $result=[];
    try {
        $query = 'select* from attachments where task_id = ?';
        $stmt = $this->db->getConn()->prepare($query);
        $stmt->execute([$task_id]);
  
        $attachments = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($attachments as $attachment){
          $attachmentData = new Attachment($attachment['attachment_id'],$attachment['attachment_url'],$attachment['title'],$attachment['project_id'], $attachment['task_id']);
          $result[]= $attachment;
        }
      //   if (!$attachmentData) {
          
      //     throw new Exception("Attachment not found", 404);
      // }

    } catch(PDOException $e){
      throw new Exception($e->getMessage(), 500);
    }
    return $result;
  }

}