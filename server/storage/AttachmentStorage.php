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
       $query = 'INSERT INTO attachments (attachment_id, attachment_url, title, project_id) VALUES (?,?,?,?);';
       $stmt = $this->db->getConn()->prepare($query);
       $stmt->bindValue(1, $attachment->getAttachmentId(), PDO::PARAM_STR);
       $stmt->bindValue(2, $attachment->getAttachmentUrl(), PDO::PARAM_STR);
       $stmt->bindValue(3, $attachment->getTitle(), PDO::PARAM_STR);
       $stmt->bindValue(4, $attachment->getProjectId(), PDO::PARAM_STR);
       $stmt->execute();

    }catch(Exception $e){
       throw new Exception($e->getMessage(), 500);

    }
<<<<<<< HEAD
  }
  public function GetAttachmentATask(String $attachment_id){
    try {
        $query = 'select* from attachments where attachment_id = ?';
        $stmt = $this->db->getConn()->prepare($query);
        $stmt->execute([$attachment_id]);
  
        $attachmentData = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$attachmentData) {
          
          throw new Exception("Attachment not found", 404);
      }
      $attachment = new Attachment($attachmentData['attachment_id'],$attachmentData['attachment_url'],$attachmentData['title'],$attachmentData['project_id']);
      return $attachment;
    } catch(PDOException $e){
      throw new Exception($e->getMessage(), 500);
    }
=======
>>>>>>> 0d75e7f412b4caefa49e35f2a87cb79d5c90af8d
  }
  public function updateAttachment(String $attachmentId ,String $title): void{
    try{
        $query = 'UPDATE attachments SET title = ? WHERE attachment_id = ?';
        $stmt = $this->db->getConn()->prepare($query);
        $stmt->execute([ $title, $attachmentId]);
        $result = $stmt->rowCount();
        if ($result ==0)
        {
          throw new Exception ("No attachment Found",404);
        }

    }catch(PDOException $e){
        throw new Exception($e->getMessage(), 500);
    }
  }
public function deleteAttachment(String $attachmentId){
  try{
    $query = 'DELETE FROM attachments WHERE attachment_id = ?;';

    $stmt = $this->db->getConn()->prepare($query);
    $stmt->bindValue(1, $attachmentId, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->rowCount();
    if($result == 0){
      throw new Exception("not found", 404);
    }
  }catch(PDOException $e){
    throw new Exception($e->getMessage(), 500);
  }
}
}