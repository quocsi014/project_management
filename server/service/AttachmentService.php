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


}