<?php

namespace Service;

use Entity\Attachment;
use Storage\IAttachmentStorage;
use Exception;

class AttachmentService{
  private IAttachmentStorage $store;

  public function __construct(IAttachmentStorage $store)
  {
    $this->store = $store;
  }
  public function InsertAttachment(Attachment $attachment){
    if($attachment->getAttachmentId() == ""){
        throw new Exception("Attachment id cannot be blank", 400);
      }
    $this->store->InsertAttachment($attachment);

  }
<<<<<<< HEAD
  public function GetAttachmentATask(String $attachment_id){
    if($attachment->getAttachmentId() == ""){
      throw new Exception("Attachment id cannot be blank", 400);
    }
    return $this->store->GetAttachmentATask($attachment_id);
  }


=======
  public function updateAttachment(String $attachmentId ,String $title):void{
    $this->store->updateAttachment($attachmentId,$title);
  }
  public function deleteAttachment(String $attachmentId){
    $this->store->deleteAttachment($attachmentId);
  }
>>>>>>> 0d75e7f412b4caefa49e35f2a87cb79d5c90af8d
}